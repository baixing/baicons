/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'baixing_icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-viewPic': '&#xe600;',
		'icon-viewItem': '&#xe601;',
		'icon-viewTitle': '&#xe602;',
		'icon-pinToTop': '&#xe603;',
		'icon-pencil': '&#xe000;',
		'icon-bullhorn': '&#xe001;',
		'icon-camera': '&#xe002;',
		'icon-image': '&#xe003;',
		'icon-location': '&#xe005;',
		'icon-clock': '&#xe006;',
		'icon-phone': '&#xe007;',
		'icon-mobile': '&#xe008;',
		'icon-user': '&#xe00a;',
		'icon-users': '&#xe00b;',
		'icon-cog': '&#xe00c;',
		'icon-share': '&#xe01a;',
		'icon-loop': '&#xe019;',
		'icon-blocked': '&#xe018;',
		'icon-minus': '&#xe016;',
		'icon-checkmark': '&#xe015;',
		'icon-close': '&#xe014;',
		'icon-checkmark-circle': '&#xe013;',
		'icon-cancel-circle': '&#xe012;',
		'icon-info': '&#xe011;',
		'icon-heart': '&#xe010;',
		'icon-star': '&#xe00f;',
		'icon-eye': '&#xe00e;',
		'icon-remove': '&#xe00d;',
		'icon-envelope': '&#xe01d;',
		'icon-bars': '&#xe01e;',
		'icon-search': '&#xe01f;',
		'icon-user-2': '&#xe020;',
		'icon-arrow-up': '&#xe01c;',
		'icon-apple': '&#xe021;',
		'icon-android': '&#xe022;',
		'icon-windows8': '&#xe023;',
		'icon-cart': '&#xe004;',
		'icon-flag': '&#xe024;',
		'icon-post': '&#xe025;',
		'icon-plus': '&#xe017;',
		'icon-chongwu': '&#xe033;',
		'icon-jianli': '&#xe032;',
		'icon-jiaoyou': '&#xe031;',
		'icon-car': '&#xe030;',
		'icon-fangwu': '&#xe02f;',
		'icon-downTriangle': '&#xe02e;',
		'icon-arrowTop': '&#xe02d;',
		'icon-arrowRight': '&#xe02c;',
		'icon-arrowLeft': '&#xe02b;',
		'icon-arrowDown': '&#xe02a;',
		'icon-question': '&#xe029;',
		'icon-fire': '&#xe604;',
		'icon-entertainment': '&#xe605;',
		'icon-pcCamera': '&#xe03a;',
		'icon-lightning': '&#xe039;',
		'icon-renew': '&#xe027;',
		'icon-ershou': '&#xe038;',
		'icon-quanzhi': '&#xe037;',
		'icon-jianzhi': '&#xe036;',
		'icon-fuwu': '&#xe035;',
		'icon-jiaoyu': '&#xe034;',
		'icon-cashBag': '&#xe026;',
		'icon-mobile-2': '&#xe028;',
		'icon-safety1': '&#xe606;',
		'icon-safety2': '&#xe607;',
		'icon-bubble': '&#xe009;',
		'icon-calendar': '&#xe608;',
		'icon-card': '&#xe609;',
		'icon-taocan': '&#xe60a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
