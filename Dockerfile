
# --- STAGE 1: Build do React ---
    FROM node:20-alpine AS build

    # Diretório de trabalho do frontend
    WORKDIR /frontend
    
    # Copie package.json e package-lock.json do frontend
    COPY frontend/package*.json ./
    
    # Instalar dependências
    RUN npm install
    
    # Copiar o restante dos arquivos do frontend
    COPY frontend/ ./
    
    # Build de produção do React
    RUN npm run build
    
    # --- STAGE 2: Servir com serve ---
    FROM node:20-alpine
    
    # Instalar serve globalmente
    RUN npm install -g serve
    
    # Diretório de trabalho
    WORKDIR /app
    
    # Copiar build do React do stage anterior
    COPY --from=build /frontend/dist /app
    
    # Porta padrão para o Railway/produção
    EXPOSE 8080
    
    # Comando para servir o frontend
    CMD ["serve", "-s", ".", "-l", "3000"]