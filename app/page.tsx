'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, CircleAlert, Download, FolderOpen, LoaderCircle, LockKeyhole, Play, RotateCcw, ShieldCheck } from 'lucide-react'
import { formatCnpj, isValidCnpj, normalizeCnpj } from '@/lib/cnpj'
import { DocumentItem, initialDocuments, statusLabels, statusTone } from '@/lib/documents'

const toneClasses: Record<string, string> = { neutral: 'status-neutral', blue: 'status-blue', amber: 'status-amber', green: 'status-green', red: 'status-red' }

export default function Page() {
  const [cnpj, setCnpj] = useState('')
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState('')
  const completed = documents.filter((item) => ['obtained', 'regular'].includes(item.status)).length
  const progress = hasSearched ? Math.round((documents.filter((item) => item.status !== 'pending').length / documents.length) * 100) : 0
  const cnpjDigits = useMemo(() => normalizeCnpj(cnpj), [cnpj])

  function startSearch() {
    if (!isValidCnpj(cnpj)) {
      setError('Confira o CNPJ: são necessários 14 dígitos válidos.')
      return
    }
    setError('')
    setHasSearched(true)
    setDocuments(initialDocuments.map((item, index) => ({ ...item, status: index === 0 ? 'consulting' : 'pending', detail: index === 0 ? 'Adaptador simulado em execução' : 'Na fila de consulta' })))
    window.setTimeout(() => {
      setDocuments((current) => current.map((item, index) => index === 0 ? { ...item, status: 'regular', detail: 'Documento simulado pronto para revisão', validUntil: '30/09/2026' } : item))
    }, 900)
  }

  function simulateDocument(id: string) {
    setDocuments((current) => current.map((item) => item.id === id ? { ...item, status: 'consulting', detail: 'Abrindo portal oficial em modo assistido' } : item))
    window.setTimeout(() => setDocuments((current) => current.map((item) => item.id === id ? { ...item, status: id === 'tst' ? 'waiting' : 'regular', detail: id === 'tst' ? 'Resolva o CAPTCHA no navegador visível e continue' : 'Documento simulado pronto para revisão', validUntil: id === 'tst' ? undefined : '30/09/2026' } : item)), 800)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="brand-mark"><ShieldCheck size={19} strokeWidth={2.5} /></div>
            <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Certidões</p><p className="font-semibold tracking-tight">Local</p></div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="online-dot" /> Ambiente local <span className="hidden rounded-full border border-border px-3 py-1.5 sm:inline-flex">Sprint 0 · simulador</span></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-10 lg:py-10">
        <section>
          <div className="mb-8 max-w-2xl"><div className="eyebrow"><span /> CONSULTA EMPRESARIAL</div><h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Seis documentos.<br /><span className="text-muted-foreground">Uma consulta organizada.</span></h1><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Informe o CNPJ uma única vez e acompanhe cada certidão com clareza. Os portais oficiais permanecem sob seu controle.</p></div>
          <div className="query-panel mb-8">
            <div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Novo agrupamento</p><h2 className="mt-1 text-lg font-semibold">Consultar por CNPJ</h2></div><div className="secure-chip"><LockKeyhole size={13} /> local e seguro</div></div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"><label className="block flex-1"><span className="mb-2 block text-xs font-medium text-muted-foreground">CNPJ da empresa</span><input aria-label="CNPJ da empresa" value={cnpj} onChange={(event) => setCnpj(formatCnpj(event.target.value))} placeholder="00.000.000/0000-00" className="cnpj-input" inputMode="numeric" maxLength={18} /></label><button className="primary-button" onClick={startSearch}><Play size={16} fill="currentColor" /> Buscar documentos</button></div>
            <div className="mt-3 flex items-center justify-between gap-3"><p className={`text-xs ${error ? 'text-destructive' : 'text-muted-foreground'}`}>{error || (cnpjDigits.length === 14 ? (isValidCnpj(cnpj) ? 'CNPJ válido para consulta' : 'CNPJ com dígitos verificadores inválidos') : 'A validação acontece antes de abrir qualquer portal.')}</p><span className="font-mono text-[11px] text-muted-foreground">{cnpjDigits.length}/14</span></div>
          </div>

          <div className="mb-4 flex items-end justify-between"><div><div className="eyebrow"><span /> DOCUMENTOS</div><h2 className="mt-2 text-xl font-semibold tracking-tight">Painel de regularidade</h2></div><div className="text-right"><p className="font-mono text-2xl font-semibold">{completed}<span className="text-muted-foreground">/06</span></p><p className="text-xs text-muted-foreground">prontos</p></div></div>
          <div className="space-y-3">{documents.map((document, index) => <DocumentCard key={document.id} document={document} index={index} onAction={() => simulateDocument(document.id)} />)}</div>
        </section>

        <aside className="space-y-4 lg:pt-[92px]">
          <div className="summary-card"><div className="flex items-center justify-between"><span className="eyebrow"><span /> PROGRESSO</span><span className="font-mono text-sm font-semibold">{progress}%</span></div><div className="progress-track mt-5"><div style={{ width: `${progress}%` }} /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{hasSearched ? 'O simulador mantém cada portal independente. Uma falha não interrompe os demais.' : 'Comece uma consulta para acompanhar os documentos individualmente.'}</p></div>
          <div className="side-card"><div className="flex items-center gap-2"><FolderOpen size={16} className="text-primary" /><p className="font-semibold">Pasta da consulta</p></div><p className="mt-2 break-all font-mono text-[11px] leading-5 text-muted-foreground">documentos/{cnpjDigits || 'CNPJ'}/AAAA-MM-DD_HH-mm-ss/</p><button className="secondary-button mt-5 w-full"><FolderOpen size={15} /> Abrir pasta</button></div>
          <div className="side-card"><p className="font-semibold">Ao concluir</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Gere um ZIP com os documentos originais e o manifest de auditoria.</p><button className="secondary-button mt-5 w-full"><Download size={15} /> Gerar arquivo ZIP</button></div>
          <div className="notice-card"><CircleAlert size={17} /><p><strong>Intervenção manual</strong><br />CAPTCHA e etapas adicionais sempre acontecem em navegador visível.</p></div>
        </aside>
      </div>
      <footer className="border-t border-border/70"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><span>Dados processados localmente · sem envio para terceiros</span><span className="font-mono">v0.1.0 / simulador</span></div></footer>
    </main>
  )
}

function DocumentCard({ document, index, onAction }: { document: DocumentItem; index: number; onAction: () => void }) {
  const tone = toneClasses[statusTone[document.status]]
  const isActive = !['pending', 'consulting'].includes(document.status)
  return <article className={`document-card ${document.status === 'waiting' ? 'waiting-card' : ''}`}><div className="number-cell">0{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold tracking-tight">{document.shortName}</h3><span className={`status-pill ${tone}`}>{document.status === 'consulting' && <LoaderCircle size={12} className="animate-spin" />}{document.status === 'regular' && <Check size={12} />}{statusLabels[document.status]}</span></div><p className="mt-1 truncate text-sm text-muted-foreground">{document.name} · {document.issuer}</p><p className="mt-2 text-xs text-muted-foreground">{document.detail}{document.validUntil && ` · validade ${document.validUntil}`}</p></div><div className="flex shrink-0 items-center gap-2">{document.status === 'waiting' ? <button className="action-button primary-action" onClick={onAction}>Continuar <ChevronRight size={14} /></button> : isActive ? <><button className="icon-button" title="Abrir portal oficial" aria-label="Abrir portal oficial"><ArrowUpRight size={16} /></button><button className="icon-button" title="Consultar novamente" aria-label="Consultar novamente" onClick={onAction}><RotateCcw size={15} /></button></> : <button className="action-button" onClick={onAction}>Consultar <ChevronRight size={14} /></button>}</div></article>
}
