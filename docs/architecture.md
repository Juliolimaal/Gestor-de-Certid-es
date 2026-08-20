# Arquitetura

A Sprint 0 mantém o frontend Next.js do workspace como superfície de protótipo e separa o domínio em `lib/`. A próxima etapa migrará para Electron + React/Vite, com processo principal responsável por Playwright e armazenamento local, preload com API mínima e renderer sem acesso direto ao Node.

## Princípios

- Uma consulta por portal por vez.
- Falhas isoladas por documento.
- CAPTCHA sempre exige intervenção visível.
- Arquivos originais e manifest auditável.
- Hostnames oficiais allowlisted.

A alternativa Electron/Vite foi escolhida por atender ao requisito Windows local e permitir armazenamento sem nuvem. A migração do shell fica planejada para a Sprint 1, após a validação do primeiro portal.
