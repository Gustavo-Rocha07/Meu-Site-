. "$PSScriptRoot\crop-casos.ps1"

# (Mx,My) = centro da linha dos labios na imagem original; Mw = largura da boca.
# K (zoom) e Ty (altura da boca no quadro) sao IGUAIS dentro de cada par --
# e isso que faz o comparador alinhar ao arrastar.

# Caso 1 - reabilitacao com implantes
Export-Caso -Src 'public/img/1antes-semdente.jpeg'  -Dst 'public/img/casos/caso-1-antes.jpg'  -Mx 422  -My 280 -Mw 353  -K 2.00 -Ty 0.55
Export-Caso -Src 'public/img/1depois-comdente.jpeg' -Dst 'public/img/casos/caso-1-depois.jpg' -Mx 303  -My 247 -Mw 273  -K 2.00 -Ty 0.55

# Caso 2 - reabilitacao estetica
Export-Caso -Src 'public/img/antes-f.jpeg'          -Dst 'public/img/casos/caso-2-antes.jpg'  -Mx 460  -My 587 -Mw 367  -K 2.50 -Ty 0.65
Export-Caso -Src 'public/img/depois-f.jpeg'         -Dst 'public/img/casos/caso-2-depois.jpg' -Mx 483  -My 566 -Mw 230  -K 2.50 -Ty 0.65

# Caso 3 - lentes de contato dental
Export-Caso -Src 'public/img/mulher-antes.jpeg'     -Dst 'public/img/casos/caso-3-antes.jpg'  -Mx 1848 -My 722 -Mw 1286 -K 1.55 -Ty 0.31
Export-Caso -Src 'public/img/mulher-depos.jpeg'     -Dst 'public/img/casos/caso-3-depois.jpg' -Mx 779  -My 241 -Mw 833  -K 1.55 -Ty 0.31
