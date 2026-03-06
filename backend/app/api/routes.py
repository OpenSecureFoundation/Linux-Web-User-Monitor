from fastapi import APIRouter
from app.services.system_scanner import system_scanner

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard():
    return system_scanner.get_dashboard_data()

@router.delete("/process/{pid}")
async def kill_process(pid: int):
    """Envoie SIGKILL via syscall os.kill"""
    try:
        import os
        import signal
        os.kill(pid, signal.SIGKILL)
        return {"status": "success", "message": f"PID {pid} terminated"}
    except Exception as e:
        return {"status": "error", "message": str(e)}