---
layout: post
title: Youth Like Program
category: lamChuanJiang
tags: [青春, 心路旅程, lamChuanJiang]
latest: 2014年09月18日 18:01:44
---

青春的轨迹，完全就像程序。

{% highlight C linenos %}

# include <stdio.h>
# include <stdbool.h>
# include <stdlib.h>

# define FAILURE YOU_ARE_HELL_STEAD_GOES_ON_YOUR_DEATH
# define ED YOU_ARE_IMPROVED
# define ING YOU_ARE_IMPROVING
# define AMABE	ALL_MEN_ARE_BORN_EQUAL

typedef struct your_life
	unsigned long long study ;
	unsigned long long persist ;
	struct your_life * better_next ;
} you_t ;

bool is_find_rediculous( you_t, you_t ) ;
bool is_discrepancy( you_t, you_t, you_t ) ;

int main( void ){
	you_t you_in_yesterday,
	you_t you_in_today,
	you_t you_in_tomorrow ;

	char flag[8] = "" ;
	char start[6] = "AMABE" ;

	you_t you ;
	you.study = 0 ;
	you.persist = 0 ;
	you -> better_next =start ;
	
	if( is_rediculous( you_in_yesterday, you_in_today )  ){
		flag = "ED" ;
	}
	
	if( is_rediculous( you_in_today, you_in_tomorrow ){
		flag = "ING" ;
	}
	
	if( ! is_discrepancy( you_in_yesterday, you_in_today, you_in_tomorrow ){
		flag = "FAILURE" ;
	}

	if( flag == "ED" && flag == "ING" ) {
		you = you -> better_next;
		you.study ++ ;
		you.persist ++ ;
	} else {
		printf( "\nYOU ARE A LIFE LOSER.\n" ) ;
		exit( -1 ) ;
	}
	
	return 0 ;
}

is_find_rediculous( you_t you_pre, you_t you_after ){
	if( you_after.study > you_pre.study && you_after.persist > you_pre.persist ) {
		return true ;
	} else {
		return false ;
	}
}

is_discrepancy( you_t you_pre, you_t you_now, you_t you_after ){
	if( you_pre.study >= you_now.study || you_now.study >= you_after.study || you_pre.study >= you_after.study ) {
		return true ;
	} else if( you_pre.persist >= you_now.persist || you_now.persist >= you_after.persist || you_pre.persist >= you_after.persist ) {
		return true ;
	} else {
		return false ;
	}
}

{% endhighlight %}
