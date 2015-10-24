---
layout: post
title: === 和 == 有什么区别？
category: PHP
tag: PHP
latest: 2015年10月24日 19:38:01
---

PHP 在 === 和 == 的使用时有什么需要注意的？

先简单下个结论：`==` 表示值相等，`===` 表示不仅值相等而且数据类型相等。

	What is the difference between == and === in PHP?

	When comparing values in PHP for equality you can use either the == operator or the === operator. What’s the difference between the 2? Well, it’s quite simple. The == operator just checks to see if the left and right values are equal. But, the === operator (note the extra “=”) actually checks to see if the left and right values are equal, and also checks to see if they are of the same variable type (like whether they are both booleans, ints, etc.).
	
	An example of when you need to use the === operator in PHP.
	
	It’s good to know the difference between the 2 types of operators that check for equality. But, it’s even better to understand when and why you would need to use the === operator versus the == operator. So, we want to give you an example of when you must use the === operator: When developing in PHP, you may find a time when you will need to use the strpos function – you should read more about this function here in order to understand our example (don’t worry it’s a very quick read).
	
	When using the strpos function, it may return 0 to mean that the string you are searching for is at the 0th index (or the very first position) of the other string that you are searching. Suppose, for whatever reason, we want to make sure that an input string does not contain the string “xyz”. Then we would have this PHP code:
	
	- bad code:

	```
	if ( strpos( $inputString, 'xyz' ) == false ) {
			
	    // do something
	 }
	```
	
	But, there is a problem with the code above: Because $strpos will return a 0 (as in the 0th index) if the $strpos variable happens to have the ‘xyz’ string at the very beginning of $inputString. But, the problem is that a 0 is also treated as false in PHP, and when the == operator is used to compare 0 and false, PHP will say that the 0 and false are equal. That is a problem because it is not what we wanted to have happen – even though the $inputString variable contains the string ‘xyz’, the equality of 0 and false tells us that $inputString does not contain the ‘xyz’ string. So, there is a problem with the way the return value of strpos is compared to the boolean value of ‘false’. But, what is the solution? Well, as you probably guessed, we can simply use the === operator for comparison. And, as we described earlier, the === operator will say that the 2 things being compared are equal only if both the type and value of the operands are also equal. So, if we compare a 0 to a false, then they will not be considered equal – which is exactly the kind of behavior we want. Here is what the good code will look like:
	
	- good code
	
	```
	if ( strpos( $inputString, 'xyz' ) === false ) {
			
	    // do something
	 }
	```

#### 总结

为了避免数值 0 和布尔判断时的 "假" 混淆，当容易出现歧义的地方，使用 `===` 。
