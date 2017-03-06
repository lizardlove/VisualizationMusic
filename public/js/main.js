/*
* @Author: 10261
* @Date:   2017-02-23 17:22:24
* @Last Modified by:   10261
* @Last Modified time: 2017-03-06 17:14:40
*/

'use strict';
function $(dom) {
	return document.querySelector(dom);
};

function $$(dom) {
	return document.querySelectorAll(dom);
}

var master = {
	list: {
		love: ["xxx","xsdsaf","xsdasaa","sadasfaf"],
		R: ["xxx","xsdsaf","xsdasaa","sadasfaf", "xxx","xsdsaf","xsdasaa","sadasfaf"]

	}
}

var musicVl = ["炫彩音阶", "梦幻气泡"];
var fontFamily = ["微软雅黑", "苹果斜体"];

var pageControl = {
	pageFlag: 0,
	modifyFlag: 0,
	mod: {
		flag: 0,
		det: ["随机播放", "单曲循环", "顺序播放", "列表循环"]
	}
}

function musicListSelect(dom, list) {
	var placeHold = $(dom + " .placeHold");
	for (var key in list) {
		var newLi = document.createElement('li');
		placeHold.innerHTML = key;
		newLi.innerHTML = key;
		$(dom + " ul").appendChild(newLi);
	}
	addList(dom);
	var lis = $$(dom + " li");
	lis.forEach(function (li) {
		li.addEventListener('click', function () {
			placeHold.innerHTML = this.innerHTML;
			addList(dom);
		});
	});
}

function addList(dom) {
	var placeHold = $(dom + " .placeHold");
	if ($(dom +　"Det")) {
	    var listDet = master.list[placeHold.innerHTML];
	    $(dom + "Det").innerHTML = "";
	    for (var i = 0; i < listDet.length; i ++) {
		    var newLi = document.createElement("li");
		    var newSpan = document.createElement("span");
		    newLi.className = "sigMusic";
		    newSpan.innerHTML = listDet[i];
		    newLi.appendChild(newSpan);
		    $(dom + "Det").appendChild(newLi);
	    }
	}
}

function moreSelect(dom, list) {
	var placeHold = $(dom + " .placeHold");
	for(var i = 0; i < list.length; i++) {
		var newLi = document.createElement("li");
		newLi.innerHTML = list[i];
		placeHold.innerHTML = list[i];
		newLi.addEventListener('click', function () {
			placeHold.innerHTML = this.innerHTML;
		});
		$(dom + " ul").appendChild(newLi);
	}
}

function calW(dom) {
	$(dom).addEventListener("click", function () {
		if (pageControl.pageFlag == 0) {
			$(dom + "Box").style.width = "350px";
			$("#music").style.width = "calc(100% - 350px)";
			pageControl.pageFlag ++;
		} else if (pageControl.pageFlag == 1) {
			clearWidth();
			pageControl.pageFlag = 0;
		}
	})
}

function clearWidth () {
	$("#music").style.width = "100%";
	$("#musicListBox").style.width = "0";
	$("#userSettingBox").style.width = "0";
	$("#friendListBox").style.width = "0";
}

function choiceMod () {
	var choice = $("#choiceMod span");
	choice.innerHTML = pageControl.mod.det[pageControl.mod.flag];
	choice.addEventListener('click', function () {
		pageControl.mod.flag++;
		if(pageControl.mod.flag == 4) {
			pageControl.mod.flag = 0;
		}
		choice.innerHTML = pageControl.mod.det[pageControl.mod.flag];
	});
}

function modifyAround (stateOne, stateTwo) {
	$(".lastUserMod").style.display = stateOne;
	var userMod = $$(".userMod");
	userMod.forEach(function (l) {
		l.style.display = stateTwo;
	});
}

function pageChange () {
	
	var modify = $("#modify");
	modify.addEventListener('click', function () {
		if (pageControl.modifyFlag == 0) {
			modifyAround("none", "inline-block");
			pageControl.modifyFlag ++;
		} else {
			modifyAround("block", "none");
			pageControl.modifyFlag = 0;
		}
	});

	calW("#musicList");
	calW("#userSetting");
	calW("#friendList");

	choiceMod();

}

function selectGroup () {
	musicListSelect("#mcList", master.list);
	moreSelect("#musicVisualDet", musicVl);
	moreSelect("#fontFamilyDet", fontFamily);
}


function start() {
    selectGroup();
    pageChange();
}
start();