# Certidões Local

Aplicativo local para organizar consultas assistidas de regularidade empresarial por CNPJ. A Sprint 0 inclui a interface operacional, validação de CNPJ, catálogo dos seis portais oficiais e adaptador simulado. Nenhuma consulta real é executada nesta entrega.

## Executar

```bash
pnpm install
pnpm dev
```

## Segurança

A automação planejada usa navegador visível, não resolve CAPTCHA, não usa stealth/proxy e não envia documentos para serviços externos. Consultas reais exigem CNPJ autorizado e validação manual do portal.

## Documentação

- `docs/architecture.md` — decisões técnicas
- `docs/portal-adapters.md` — contrato e portais
- `docs/manual-validation.md` — roteiro de validação
- `docs/security-and-privacy.md` — privacidade
- `docs/roadmap.md` — próximos passos

## Status

Adaptador simulado: implementado. Integrações reais: ainda não validadas.
