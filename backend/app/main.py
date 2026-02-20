import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as api_router
from app.services.system_scanner import system_scanner

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestion du cycle de vie (Lifespan). 
    Initialise le SystemScanner et lance la boucle de détection (Diagramme 1, étape 4).
    """
    # Initialiser du scan en arrière-plan
    task = asyncio.create_task(system_scanner.start_monitoring())
    print("[KERNEL INTERFACE] Monitoring loop started.")
    
    yield
    
    # Nettoyage à la fermeture
    system_scanner.stop_monitoring()
    task.cancel()
    print("[KERNEL INTERFACE] Monitoring loop stopped.")

def create_application() -> FastAPI:
    """
    Factory pour l'application FastAPI.
    Configure le middleware, les routes et le cycle de vie.
    """
    application = FastAPI(
        title="Arch Linux Web Monitor API",
        description="Interface de monitoring direct avec le Kernel (utmp & procfs)",
        version="1.0.0",
        lifespan=lifespan
    )

    # Configuration CORS pour Angular
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:4200"],  # URL d'Angular
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Inclusion des routes 
    application.include_router(api_router, prefix="/api/v1")

    return application

app = create_application()