# Report esaustivo: migrazione on-premise su Kubernetes

Documento standalone, nessuna modifica al sito. Consegna: PDF impaginato (con copia .md sorgente) in Files.

## Struttura del report
1. Sintesi esecutiva: obiettivi, vincoli (costo zero, identita "FD", nessun dato salvato), rischi principali
2. Stato attuale: architettura React/Vite statica, funzione contact-submit (hCaptcha, rate limit, MX, Web3Forms), DNS e dominio
3. Architettura target: diagramma ingresso (Cloudflare Tunnel / DNS) -> Ingress -> Nginx statico -> servizio contatti
4. Build e container: Dockerfile multi-stage, immagine non-root, read-only filesystem, scansione immagini (Trivy)
5. Porting della funzione contatti: riscrittura in Go o Node, segreti via Kubernetes Secret / Sealed Secrets, rate limit persistente
6. Manifest Kubernetes e Helm chart: Deployment, Service, Ingress, HPA, probe, risorse, PodDisruptionBudget
7. Networking e TLS: cert-manager + Let's Encrypt, header HTTP (CSP, frame-ancestors, HSTS), esposizione senza aprire porte
8. Hardening: Pod Security Standards restricted, NetworkPolicy default-deny (diagramma egress), RBAC minimo, securityContext
9. CI/CD: GitHub Actions -> registry -> GitOps (Argo CD o Flux)
10. Osservabilita senza tracciamento visitatori: log, metriche, alert
11. Backup, disaster recovery, rollback
12. Piano di migrazione per fasi con checklist e criteri di cutover DNS
13. Percorso didattico: concetti da studiare per ogni fase
14. Rischi, costi (elettricita, hardware) e confronto con l'hosting attuale
15. Appendici: esempi completi di file, glossario, riferimenti

## Dettagli tecnici
- Fonte: il file di analisi caricato + codice attuale del progetto (sola lettura)
- Generazione PDF con reportlab, font DejaVu per gli accenti italiani, diagrammi in blocchi monospazio
- QA: conversione di ogni pagina in immagine e controllo visivo prima della consegna
- Salvataggio: /mnt/documents/report_migrazione_k8s.pdf e .md
