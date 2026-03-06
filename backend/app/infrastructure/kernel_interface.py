import struct
import os

class KernelInterface:
    """
    Interface directe avec les fichiers binaires et procfs du Kernel Arch Linux.
    Respecte l'étape 6 du diagramme : ouvrir_lire_donnees_kernel.
    """
    # Structure UTMP (C) : identifiée dans <utmp.h>
    # Format binaire pour Linux x86_64

    UTMP_STRUCT = 'hi32s4s32s256shhiii4i20s'
    UTMP_SIZE = struct.calcsize(UTMP_STRUCT)

    @staticmethod
    def read_utmp():

        sessions = []
        try:
            with open("/var/run/utmp", "rb") as f:
                while True:
                    raw = f.read(KernelInterface.UTMP_SIZE)
                    if not raw: break
                    
                    data = struct.unpack(KernelInterface.UTMP_STRUCT, raw)
                    # Type 7 = USER_PROCESS (Session active)
                    if data[0] == 7:
                        sessions.append({
                            "username": data[4].decode('utf-8').strip('\x00'),
                            "tty": data[2].decode('utf-8').strip('\x00'),
                            "host": data[5].decode('utf-8').strip('\x00'),
                            "pid": data[1],
                            "time": data[10] # timestamp
                        })
        except FileNotFoundError:
            pass
        return sessions

    @staticmethod
    def read_loadavg():
        """Lecture directe de /proc/loadavg"""
        try:
            with open("/proc/loadavg", "r") as f:
                data = f.read().split()
                return [float(x) for x in data[:3]]
        except Exception:
            return [0.0, 0.0, 0.0]

    @staticmethod
    def read_system_stats():
        """Lecture de /proc/meminfo et /proc/stat"""
        stats = {"mem": {}, "uptime": "0", "zombies": 0}
        
        # Uptime
        with open("/proc/uptime", "r") as f:
            stats["uptime"] = float(f.read().split()[0])

        # Memory
        with open("/proc/meminfo", "r") as f:
            lines = f.readlines()
            for line in lines:
                if "MemTotal" in line: stats["mem"]["total"] = int(line.split()[1])
                if "MemFree" in line: stats["mem"]["free"] = int(line.split()[1])
                if "Cached" in line: stats["mem"]["cached"] = int(line.split()[1])
            stats["mem"]["used"] = stats["mem"]["total"] - stats["mem"]["free"]

        return stats

    @staticmethod
    def get_all_processes():
        """Scan  de /proc pour lister les processus"""
        processes = []
        pids = [p for p in os.listdir('/proc') if p.isdigit()]
        for pid in pids:
            try:
                with open(f"/proc/{pid}/status", "r") as f:
                    lines = f.readlines()
                    status_dict = {l.split(':')[0]: l.split(':')[1].strip() for l in lines if ':' in l}
                    
                processes.append({
                    "pid": int(pid),
                    "uid": int(status_dict.get("Uid", "0").split()[0]),
                    "name": status_dict.get("Name", "unknown"),
                    "isZombie": status_dict.get("State", "").startswith("Z"),
                    "mem": int(status_dict.get("VmRSS", "0").split()[0]) if "VmRSS" in status_dict else 0
                })
            except (FileNotFoundError, PermissionError):
                continue
        return processes