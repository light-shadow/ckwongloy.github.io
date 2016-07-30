---
layout: post
title: C 趣味编程案例
category: C
tag: C
latest: 2015-03-28 17:02:44
---

####      1.1.绘制余弦曲线.c 

``` c
# include <stdio.h> # include <math.h>
int main(void){ double vertical; int horizental,
    radian;
for(vertical = 1; vertical >= -1; vertical -= 0.1){
/* step size: 1.0 */ radian = acos(vertical) * 10; /* graph magnification: 10 */
for(horizental = 1; horizental <= radian; horizental++){ printf(" ");
}
printf("*"); /* print-control of left '*' */ for(; horizental < 62-radian; horizental++){
printf(" "); }
printf("*\n");
return 0; }
/* print-control of right '*' in the same line */
}
/*
routine result: **
** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
**
**
**
Process returned 0 (0x0) */
execution time : 0.672 s
```

#### 1.2.绘制余弦曲线和直线.c

``` c
# include <stdio.h> # include <math.h>
int main(void){ double ordinate; int abscissa,
abscissaInCurve, abscissaInStraightLine, ordinateOfIntersection;
for(ordinateOfIntersection = 0; ordinateOfIntersection <= 20; ordinateOfIntersection++){ ordinate = 0.1 * ordinateOfIntersection;
abscissaInCurve = acos(1 - ordinate) * 10;
abscissaInStraightLine = 45 * (ordinate - 1) + 31;
for(abscissa = 0; abscissa <= 62; abscissa++){
if( (abscissa == abscissaInCurve) && (abscissa == abscissaInStraightLine) ){
printf("+"); }
else if(abscissa == abscissaInStraightLine){ printf("+");
}
else if( (abscissa == abscissaInCurve) || ( abscissa == (62 - abscissaInCurve) ) ){
printf("*"); }
else{ printf(" ");
} }
printf("\n"); }
return 0; }
/*
routine result: **
** ** +**
+** +**
*+* *+* *+* *+* *+* *+* *+* *+
**+ **+
**+ **+
** ** *
Process returned 0 (0x0) execution time : 0.047 s */
```

#### 1.3.绘制圆.c

``` c
# include <stdio.h> # include <math.h>
int main(void){ double ordinate; int abscissa,
abscissaOfCircle;
for(ordinate = 10; ordinate >= -10; ordinate--){
abscissaOfCircle = 2.5 * sqrt(100 - ordinate * ordinate); for(abscissa = 1; abscissa < (30-abscissaOfCircle); abscissa++)
{
printf(" ");
}
printf("*");
for(; abscissa < (30+abscissaOfCircle); abscissa++){
printf(" "); }
printf("*\n"); }
return 0; }
/*
routine result:
**
** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
**
Process returned 0 (0x0) execution time : 0.688 s */
```

#### 1.4.杨辉三角形.c 2015年3月22日  19:39

``` c
# include <stdio.h>
# include <stdbool.h>
int outPutRow(int vertical, int horizental){
int valueExceptBoundary;
if((horizental==1) || (horizental==vertical+1)){
return(1); }
valueExceptBoundary = outPutRow(vertical-1, horizental-1) + outPutRow(vertical-1, horizental);
return(valueExceptBoundary); }
int main(void){
system("mode con cols=100 lines=50"); int rowPrintNumber = 13,
row,
valueOfRow; printf("ROWs>"); while(rowPrintNumber > 12){
scanf("%d", &rowPrintNumber); if(rowPrintNumber > 12){
printf("\nERROR:\tLine number exceed 12 are not suitable for this screen.\n");
exit(false); }
}
for(row=0; row <= rowPrintNumber; row++){
for(valueOfRow=0; valueOfRow < (12-row); valueOfRow++){ printf(" ");
}
for(valueOfRow=1; valueOfRow < (row+2); valueOfRow++){
printf("%5d", outPutRow(row, valueOfRow)); }
printf("\n"); }
return 0; }
/*
routine result: ROWs>12
1 11
121 1331
14641
1 5 10 10 5 1
1 6152015 6 1
1 721353521 7 1
1 82856705628 8 1
1 936841261268436 9 1
1 10 45120210252210120 45 10 1
1 11 55165330462462330165 55 11 1
1 12 66220495792924792495220 66 12 1
Process returned 0 (0x0) execution time : 2.609 s */
```

#### 1.5.数制转换.c 2015年3月22日  19:39

``` c
# include <stdio.h>
void printBinary(int decimal, int binary){ if(binary > 0){
putchar('0' + ( (unsigned)(decimal & (1 << (binary-1))) >> (binary-1) ) );
printBinary(decimal, binary - 1); }
}
int main(void){
int decimal;
printf("decimal>");
scanf("%d", &decimal);
printf("decimal %d 's binary form: ", decimal); printBinary(decimal, sizeof(int)*8); putchar('\n');
return 0;
}
/*
routine result:
decimal>-8
decimal -8 's binary form: 11111111111111111111111111111000
Process returned 0 (0x0) execution time : 8.359 s */
```

#### 11.93.汉诺塔.c 2015年3月22日  19:39

``` c
/*
Annotation:
1.Hanoi tower.
2.The three column here are dynamic, relative, we should find out the basic process of the circulation.
*/
# include <stdio.h> int stepNumber=0;
void aToCViaB(unsigned plateNumber, char fromColumn, char toColumn, char viaColumn) {
if(plateNumber >0){
aToCViaB(plateNumber-1, fromColumn, viaColumn, toColumn); ++stepNumber;
switch(fromColumn){
case 'a':{ switch(toColumn){
case 'b':{
printf("\t[%d]:\t\t%2d ---> %2d\n", stepNumber, plateNumber, plateNumber);
}
break; case 'c':{
printf("\t[%d]:\t\t%2d -----------> %2d\n", stepNumber, plateNumber, plateNumber);
}
break; }
}
break; case 'b':{
switch(toColumn){ case 'a':{
printf("\t[%d]:\t\t%2d <----------- %2d\n", stepNumber, plateNumber, plateNumber);
}
break; case 'c':{
printf("\t[%d]:\t\t%2d ---> %2d\n", stepNumber, plateNumber, plateNumber); }
break; }
}
break; case 'c':{
switch(toColumn){ case 'a':{
printf("\t[%d]:\t\t%2d <----------- %2d\n", stepNumber, plateNumber, plateNumber);
}
break; case 'b':{
printf("\t[%d]:\t\t%2d <--- %2d\n", stepNumber, plateNumber, plateNumber); }
break; }
}
break; }
aToCViaB(plateNumber-1, viaColumn, toColumn, fromColumn); }
}
int main(void){
unsigned plateNumber;
printf("Hanoi Tower!\nPLATEs>");
scanf("%d", &plateNumber);
printf("\n\t%d PLATEs in clumn_A move to clumn_C via clumn_B:\n\n", plateNumber); printf("\t\t\t|___【Column】____| \n 【Step】\t\t|A|\t|B|\t|C|\n"); aToCViaB(plateNumber, 'a', 'c', 'b');
printf(" 【Total】: %d STEPs\n", stepNumber);
return 0;
}
```

#### 12.99.超长正整数的加法.c 2015年3月22日  19:40

``` c
# include <stdio.h>
# define NODESIZE 10000
typedef struct node{ int data;
struct node* next; }NODE;
NODE* partSumSave(NODE* partSum, int sumInLinkedList){ NODE* cacheValue;
cacheValue = (NODE*)malloc(sizeof(NODE)); cacheValue->data = sumInLinkedList;
partSum->next = cacheValue;
return(cacheValue); }
NODE* longAdd(NODE* addend, NODE*augend){ NODE* pointerAddend,
* pointerAugend, * linkedList,
* pendingPointer, * partSum;
int sumBeenAdded, sumInLinkedList, carry;
pointerAddend = addend->next; pointerAugend = augend->next; linkedList = (NODE*)malloc(sizeof(NODE)); linkedList->data = -1;
partSum = linkedList;
carry = 0;
while((pointerAddend->data != -1)&&(pointerAugend->data != -1)){
sumBeenAdded = pointerAddend->data + pointerAugend->data + carry; sumInLinkedList = sumBeenAdded % NODESIZE;
carry = sumBeenAdded / NODESIZE;
partSum = partSumSave(partSum, sumInLinkedList);
pointerAddend = pointerAddend->next;
pointerAugend = pointerAugend->next; }
pendingPointer = (pointerAddend->data != -1) ? pointerAddend : pointerAugend; while(pendingPointer->data != -1){
sumBeenAdded = pendingPointer->data + carry; sumInLinkedList = sumBeenAdded * NODESIZE; carry = sumBeenAdded / NODESIZE;
partSum = partSumSave(partSum, sumInLinkedList); pendingPointer = pendingPointer->next;
} if(carry){
partSum = partSumSave(partSum, 1); }
partSum->next = linkedList;
return(linkedList); }
void printAddx(NODE* integerX){ if(integerX->next->data != -1){
printAddx(integerX->next); if(integerX->next->data == -1){
printf("%d", integerX->next->data); }
else{
int i, k=NODESIZE; for(i=1; i<=4; i++,k/=10){
putchar('0' + integerX->next->data%(k)/(k/10)); }
} }
}
NODE* inputAddx(void){
NODE* pointer, * cachePointer, * temporaryPointer; struct number{
int value;
struct number* nCache; }* cache, * temporary;
int i, j, k;
long sum;
char character;
    
cache = NULL; while((character=getchar()) != '\n'){
if((character>=0)&&(character<=9)){
temporary = (struct number*)malloc(sizeof(struct number)); temporary->value = character - '0';
temporary->nCache = cache;
cache = temporary;
} }
pointer = (NODE*)malloc(sizeof(NODE)); pointer->data = -1;
cachePointer = pointer;
while(cache != NULL){
sum = 0;
i = 0;
k = 1; while((i<4)&&(cache!=NULL)){
sum = sum + k* (cache->value); i++;
cache = cache->nCache;
k = k*10;
}
temporaryPointer = (NODE*)malloc(sizeof(NODE)); temporaryPointer->data = sum; cachePointer->next = temporaryPointer; cachePointer = temporaryPointer;
}
cachePointer->next = pointer; return(pointer);
}
int main(void){ NODE* addend,
* augend,
* sum;
NODE* partSumSave(),
* longAdd(),
* inputAddx(), * printAddx();
printf("ADDEND>");
addend = inputAddx(); printf("AUGEND>");
augend = inputAddx(); printf("\nCompleted!\n\n\tADDEND="); printAddx(addend);
putchar('\n');
printf("\tAUGEND="); printAddx(augend);
putchar('\n');
sum = longAdd(addend, augend); printf("\tSUM= ");
printAddx(sum);
putchar('\n');
return 0;
}
```
