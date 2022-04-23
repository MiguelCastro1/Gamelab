#------------- TOPICO 5 - VISUALIZACAO DE DADOS ------------------#

#------------------- Introdu��o -----------------------#
#--- Recursos graficos do R:
demo(graphics)

#--- O conjunto de dados do Inventario Florestal, retirado do estande
# da Upper Flat Creek da Floresta Experimental da Universidade de Idaho,
# ser� usado para explorar algumas das capacidades graficas do R.

#- Lendo e mostrando esses dados (ufc) que est�o no pacote "spuRs":
install.packages("spuRs")
library(spuRs)
data(ufc)
head(ufc)
attach(ufc)
#- Resumo de sua estrutura:
str(ufc)
#- Resumo dos dados:
summary(ufc)

#- Desenhando um grafico de dispersao do diametro pela altura, rotulando os eixos:
attach(ufc)
windows()
par(mfrow = c(1,2))
plot(dbh.cm, height.m)
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",main="Gr�fico com r�tulos dos eixos")

#--------------------- Argumentos Graficos----------------------------#
#- "type" determina o tipo de plotagem.
windows()
par(mfrow = c(2,4))
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",main="Sem tipo")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="l",main="Tipo 'l'")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="b",main="Tipo 'b'")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="c",main="Tipo 'c'")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="o",main="Tipo 'o'")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="h",main="Tipo 'h'")
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)",type="n",main="Tipo 'n'")

#- "xlim" e "ylim": determina os limites dos eixos (x,y):
windows()
par(mfrow = c(1,2))
plot(dbh.cm, height.m)
plot(dbh.cm, height.m, xlim = c(0,150), ylim = c(0,60))

#- "xlab", "ylab" e "main": determina os r�tulos dos eixos (x,y)
# e o t�tulo do gr�fico:
windows()
par(mfrow = c(1,2))
plot(dbh.cm, height.m)
plot(dbh.cm, height.m, xlab = "Di�metro (cm)",ylab = "Altura (m)", main = "Gr�fico de Dispers�o de Di�metro por Altura das �rvores")

#- "pch" (forma dos pontos), "lwd" (largura da linha) e "col" (cor para linhas e pontos):
windows()
par(mfrow = c(1,2))
plot(dbh.cm, height.m)
plot(dbh.cm, height.m, pch = 15, lwd = 3, col = "blue")

#- Lista de cores:
colours()
colors()