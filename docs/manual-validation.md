# Validação manual

1. Inicie a aplicação com `pnpm dev`.
2. Informe um CNPJ autorizado; nenhum CNPJ real deve entrar em fixtures ou commits.
3. Confirme que CNPJ inválido não inicia consulta.
4. Use o adaptador simulado e verifique estados independentes.
5. Para uma integração real, inspecione o portal sem submeter dados, documente CAPTCHA/pop-ups e solicite autorização antes da consulta.
