#------------- TOPICO 4 - MANIPULACAO DE DADOS ------------------#

#------------------- Entrada de Dados -----------------------#
#--- Ex.1: Lendo dados de um arquivo com a função "scan".
(dados = scan(file = "dados1.txt"))
# Lendo os dados a partir do Explorer:
(dados = scan(file.choose()))
# Para calcular e imprime os quantis, execute:
quantile(dados)

#--- Ex.2 : lendo dados a partir do teclado com "scan".
x = scan()
#Digite os números inteiros de 1 até 10,
# digitando cada número e apertando a tecla ENTER
# antes de digitar o próximo valor.
# Para finalizar aperte ENTER sem digitar nenhum valor.
show(x)

#--- Ex. 3: lendo dados a partir do teclado com "readline".
# Execute as linhas de comando abaixo:
nome = readline("nome: ")
idade = as.numeric(readline("idade = "))
# Digite qualquer valor.
show(nome)
show(idade)

#--- Ex. 4: Entrada de dados com o "read.table".
dados = read.table("lab.txt", header=T, sep = ",")
show(dados)

#--- Ex. 5: Entrada de dados com o "read.csv".
dados = read.csv("lab.csv", header=T, sep = ";")
show(dados)

#------------------- Saida de Dados -----------------------#
#--- Ex. 1: Saída de Dados - para um Arquivo com "write".
# Cria a matriz x:
(x = matrix(1:24, nrow = 4, ncol = 6, byrow=T))
# Mostra o diretório atual:
getwd()
# Salva a matriz num arquivo txt:
write(t(x), file = "write.txt", ncolumns = 6)
# Muda o diretório:
# setwd("C:/.../Códigos de exercícios no R")

#--- Ex. 2: Saída de Dados - para um Arquivo com "dump".
(x = matrix(rep(1:5, 1:5), nrow = 3, ncol = 5, byrow=T))
# Salvando a matriz "x":
dump("x", file = "dump.txt")
# Apagando a matriz "x" da memória do R:
rm(x)
# Carregando a matriz "x" através do arquivo "dump.txt":
source("dump.txt")
# Mostrando a matriz x:
show(x)

#--- Ex. 2: Saída de Dados - para um Arquivo com "write.table".
# Criando a matriz "x":
(x = matrix(rep(1:5,1:5), nrow = 3, ncol = 5, byrow=T))
# Salvando a matriz "x":
write.table(x, file = "table.txt", sep=" ", row.names = F, col.names = F)
# Apagando a matriz "x" da memória do R:
rm(x)
#  Carregando a matriz "x" em "table.txt" com o "read.table" e mostrando seu tipo:
(x = read.table("table.txt", sep=" ", header = F))
mode(x)
