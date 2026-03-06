import asyncio
import os
from typing import List, Dict, Any
from app.infrastructure.kernel_interface import KernelInterface
import pwd
from datetime import datetime, timedelta

class SystemScanner:
    def __init__(self):
        self._running = False
        self.last_sessions: List[Dict[str, Any]] = []

    async def start_monitoring(self):
        """Boucle de scan périodique ( Loop 5s)"""
        self._running = True
        while self._running:
            # Appel de l'interface Kernel
            current_sessions = KernelInterface.read_utmp()
            
            # Détecter changement
            if self._has_changed(current_sessions):
                self.last_sessions = current_sessions
                # Notification 
                await self.notify_new_session(current_sessions)
                
            await asyncio.sleep(5)

    def _has_changed(self, new_sessions: List[Dict]) -> bool:
        return len(new_sessions) != len(self.last_sessions)

    async def notify_new_session(self, sessions):
        # Logique de broadcast 
        pass

    def stop_monitoring(self):
        self._running = False

    def get_dashboard_data(self):

        raw_stats = KernelInterface.read_system_stats()
        all_procs = KernelInterface.get_all_processes()
        utmp_sessions = KernelInterface.read_utmp()

        # 1. CONVERSION UPTIME (ex: "02:45:10")
        uptime_str = str(timedelta(seconds=int(raw_stats["uptime"])))
       
        # 2. CONVERSION MÉMOIRE (Contrat: total, used, free, cached)
        m = raw_stats["mem"]
        mem_data = {
            "total": round(m["total"] / 1024, 2), # Mo
            "used": round((m["total"] - m["free"]) / 1024, 2),
            "free": round(m["free"] / 1024, 2),
            "cached": round(m["cached"] / 1024, 2)
        }
        # Construction des SystemUser
        users = []
        for session in utmp_sessions:
            try:
                u_info = pwd.getpwnam(session["username"])
                u_uid = u_info.pw_uid
            except: u_uid = 999

            user_procs = [p for p in all_procs if p['uid'] == os.getuid()] # Simplifié pour la démo
            users.append({
                "uid": u_uid,
                "username": session["username"],
                "connection": session["tty"] or session["host"],
                "procCount": len(user_procs), # Logique simplifiée
                "loginTime": datetime.fromtimestamp(session["time"]).strftime('%H:%M:%S'),
                "status": "active",
                "processes": user_procs
            })

        return {
            "stats": {
                "uptime": uptime_str,
                "loadAvg": KernelInterface.read_loadavg(),
                "zombieCount": len([p for p in all_procs if p["isZombie"]]),
                "cpuUsage": 15.5, # Valeur simulée (nécessite delta /proc/stat)
                "memory": mem_data
            },
            "users": users
        }
system_scanner = SystemScanner()