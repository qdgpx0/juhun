eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? '': e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c);
        }
        k = [function(e) {
            return d[e];
        }];
        e = function() {
            return '\\w+';
        };
        c = 1;
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
        }
    }
    return p;
});
var parentTopHeight;
var parentBottomHeight;
var parentTopHeight_left;
var parentBottomHeight_left;
var parentTopHeight_middle;
var parentBottomHeight_middle;
var fixHeight;
var skinName;
var themeColor = "blue";
var broswerFlag;
var broswerVersion;
var fontSize = 12;
var fontFamily = "宋体";
var prePath = "../template/zui/";
var exitVtab = 0;
var vtabIdx = 0;
var hasIframe = 0;
var parentScrollHeight;
var boxWhiteBg = false;
var splitMode = false;
var positionTarget = "";
var box4Custom = false;
var scrollerX = false;
var autoGetSkin = true;
var autoFormat = true;
var autoRender = true;
var boxIe6Flag = 0;
var boxIe7Flag = 0;
var isHeadFixMode = 0;
var headFixExcude = 0;
var headFixExcude2 = 0;
var cResizeTimer = null;
var depth = 500;
var currentMouseX;
var currentMouseY;
$(function() {
    $.ajaxSetup({
        cache: false
    });
    $("body").bind("click",
    function() {
        try {
            top.iframeClickHandler();
        } catch(o) {}
        try {
            parent.iframeClickHandler();
        } catch(o) {}
    });
    var s = navigator.userAgent,
    c = /(msie\s|trident.*rv:)([\w.]+)/,
    r = /(firefox)\/([\w.]+)/,
    t = /(opera).+version\/([\w.]+)/,
    n = /(chrome)\/([\w.]+)/,
    f = /version\/([\w.]+).*(safari)/;
    var m;
    var q;
    var b = s.toLowerCase();
    function l(o) {
        var e = c.exec(o);
        if (e != null) {
            return {
                browser: "IE",
                version: e[2] || "0"
            };
        }
        var e = r.exec(o);
        if (e != null) {
            return {
                browser: e[1] || "",
                version: e[2] || "0"
            };
        }
        var e = t.exec(o);
        if (e != null) {
            return {
                browser: e[1] || "",
                version: e[2] || "0"
            };
        }
        var e = n.exec(o);
        if (e != null) {
            return {
                browser: e[1] || "",
                version: e[2] || "0"
            };
        }
        var e = f.exec(o);
        if (e != null) {
            return {
                browser: e[2] || "",
                version: e[1] || "0"
            };
        }
        if (e != null) {
            return {
                browser: "",
                version: "0"
            };
        }
    }
    var i = l(s.toLowerCase());
    if (i.browser && getTypeFlag2()) {
        m = i.browser;
        q = i.version;
    }
    if (m == "IE") {
        if (q == "6.0") {
            broswerFlag = "IE6";
        } else {
            if (q == "7.0") {
                broswerFlag = "IE7";
            } else {
                if (q == "8.0") {
                    broswerFlag = "IE8";
                } else {
                    if (q == "9.0") {
                        broswerFlag = "IE9";
                    } else {
                        if (q == "10.0") {
                            broswerFlag = "IE10";
                        } else {
                            if (q == "11.0") {
                                broswerFlag = "IE11";
                            }
                        }
                    }
                }
            }
        }
    } else {
        broswerFlag = m;
    }
    broswerVersion = Number(q.split(".")[0]);
    var a;
    if ($("#skin").attr("prePath") != null) {
        prePath = $("#skin").attr("prePath");
    }
    if ($("#skin").attr("splitMode") == true || $("#skin").attr("splitMode") == "true") {
        splitMode = true;
    } else {
        try {
            var d = top.document.getElementById("theme");
        } catch(p) {
            if ($("body").attr("leftFrame") != "true") {
                alert(uncompile(quiLanguage.jsError.splitModeMessage));
            }
            return
        }
        var h = $(window.top.document.getElementById("theme"));
        var g = $(window.top.document.getElementById("skin"));
        if (h.attr("autoGetSkin") == false || h.attr("autoGetSkin") == "false") {
            autoGetSkin = false;
        }
        if (h.attr("autoFormat") == false || h.attr("autoFormat") == "false") {
            autoFormat = false
        }
        if (h.attr("autoRender") == false || h.attr("autoRender") == "false") {
            autoRender = false;
        }
        if ($("#skin").attr("autoRender") == false || $("#skin").attr("autoRender") == "false") {
            autoRender = false;
        }
        if (h.attr("box1WhiteBg") == true || h.attr("box1WhiteBg") == "true") {
            boxWhiteBg = true;
        }
        if (h.attr("box4Custom") == true || h.attr("box4Custom") == "true") {
            box4Custom = true;
        }
        if (h.attr("scrollerX") == true || h.attr("scrollerX") == "true") {
            scrollerX = true;
        }
        if (h.attr("positionTarget") != null) {
            positionTarget = h.attr("positionTarget");
        }
        if (h.attr("href") == null) {
            skinName = "system/layout/skin/";
            themeColor = "blue";
        } else {
            skinName = g.attr("skinPath");
            themeColor = h.attr("themeColor");
        }
    }
    if (autoGetSkin == true && splitMode == false) {
        if (h.attr("debug") == "true" || h.attr("debug") == true) {
            if (broswerFlag == "IE6" || broswerFlag == "IE7") {
                if (h.attr("href") == "") {} else {
                    $.ajax({
                        url: prePath + "libs/skins/" + themeColor + "/style.css",
                        error: function() {
                            if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                alert(uncompile(quiLanguage.jsError.pathMessage0) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2));
                            } else {
                                alert(uncompile(quiLanguage.jsError.pathMessage1) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2));
                            }
                        },
                        success: function() {
                            if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                alert(uncompile(quiLanguage.jsError.pathMessage3));
                            } else {
                                alert(uncompile(quiLanguage.jsError.pathMessage4));
                            }
                            $.ajax({
                                url: prePath + skinName + "style.css",
                                error: function() {
                                    if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                        alert(uncompile(quiLanguage.jsError.pathMessage0) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5));
                                    } else {
                                        alert(uncompile(quiLanguage.jsError.pathMessage1) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5));
                                    }
                                },
                                success: function() {
                                    if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                        alert(uncompile(quiLanguage.jsError.pathMessage6));
                                    } else {
                                        alert(uncompile(quiLanguage.jsError.pathMessage6));
                                    }
                                }
                            });
                        }
                    });
                }
            } else {
                if (h.attr("href") == null) {} else {
                    $.ajax({
                        url: prePath + "libs/skins/" + themeColor + "/style.css",
                        error: function() {
                            if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                alert(uncompile(quiLanguage.jsError.pathMessage0) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2));
                            } else {
                                alert(uncompile(quiLanguage.jsError.pathMessage1) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2));
                            }
                        },
                        success: function() {
                            if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                alert(uncompile(quiLanguage.jsError.pathMessage3));
                            } else {
                                alert(uncompile(quiLanguage.jsError.pathMessage4));
                            }
                            $.ajax({
                                url: prePath + skinName + "style.css",
                                error: function() {
                                    if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                        alert(uncompile(quiLanguage.jsError.pathMessage0) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5));
                                    } else {
                                        alert(uncompile(quiLanguage.jsError.pathMessage1) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5));
                                    }
                                },
                                success: function() {
                                    if ($("body").attr("leftFrame") == "true" || $("body").attr("leftFrame") == true) {
                                        alert(uncompile(quiLanguage.jsError.pathMessage6));
                                    } else {
                                        alert(uncompile(quiLanguage.jsError.pathMessage6));
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
        $("#skin").attr("href", prePath + "libs/skins/" + themeColor + "/style.css");
        //alert(skinName + "style.css")
        $("#customSkin").attr("href",  "/lpms/template/zui/libs/skins/blue/style.css");
    }
    enableTooltips();
    try {
        if (splitMode == false) {
            fontSize = top.getFontSize();
            fontFamily = top.getFontFamily();
        }
    } catch(p) {}
    if (fontSize != 12) {
        $("body").css({
            fontSize: fontSize + "px"
        });
        if ($("table:[class=tableStyle]").length > 0) {
            $("table:[class=tableStyle]").css({
                fontSize: fontSize + "px"
            });
        }
        if ($("pre").length > 0) {
            $("pre").css({
                fontSize: fontSize + "px"
            });
        }
    }
    if (fontFamily != "宋体") {
        $("body").css({
            fontFamily: fontFamily
        });
    }
    if (autoRender == true) {
        $("div").each(function() {
            if ($(this).hasClass("box1") || $(this).attr("boxType") == "box1") {
                $(this).box1Render();
            } else {
                if ($(this).hasClass("box2") || $(this).attr("boxType") == "box2") {
                    $(this).box2Render();
                } else {
                    if ($(this).hasClass("box4")) {
                        $(this).box4Render();
                    }
                }
            }
        });
    }
    if ($("body").attr("leftFrame") == "true") {
        $("body").addClass("contentStyleLeft");
    } else {
        $("body").addClass("contentStyle");
    }
    if (scrollerX == true) {
        if ($("#skin").attr("scrollerX") == "false" || $("#skin").attr("scrollerX") == false) {
            scrollerX = false;
        }
    } else {
        if ($("#skin").attr("scrollerX") == "true" || $("#skin").attr("scrollerX") == true) {
            scrollerX = true;
        }
    }
    if (broswerFlag == "IE6") {
        $("html").css({
            width: "100%"
        });
    }
    if (scrollerX == false) {
        if (broswerFlag == "IE7") {
            $("body").css({
                overflowX: "hidden"
            });
        } else {
            $("html").css({
                overflowX: "hidden"
            });
        }
    }
    if ($("#skin").attr("scrollerY") == "false" || $("#skin").attr("scrollerY") == false) {
        $("html").css({
            overflowY: "hidden"
        });
    }
    triggerCustomHeightSet();
    if (cResizeTimer) {
        clearTimeout(cResizeTimer);
    }
    cResizeTimer = setTimeout("triggerCustomHeightSet()", 500);
    window.onresize = function() {
        if (cResizeTimer) {
            clearTimeout(cResizeTimer);
        }
        cResizeTimer = setTimeout("triggerCustomHeightSet()", 100);
    };
    if (autoRender == true) {
        $("div,input,textarea,button,select,form,table,a,img,span").each(function() {
            if ($(this).hasClass("box1") || $(this).hasClass("box2") || $(this).hasClass("box3") || $(this).hasClass("box4") || $(this).attr("boxType") == "box1" || $(this).attr("boxType") == "box2" || $(this).attr("keepDefaultStyle") == "true" || $(this).attr("keepDefaultStyle") == true || $(this).attr("fillType")) {
                if ($(this).hasClass("imgPreview")) {
                    $(this).render();
                }
            } else {
                $(this).render();
                if ($(this).attr("title")) {
                    if ($(this).parents(".selectbox-tree").length > 0 || $(this).parents(".dbSelectionMode").length > 0) {} else {
                        addTooltip($(this)[0]);
                    }
                }
            }
        });
        $(".spliter").each(function() {
            try {
                if ($(this).is("td")) {
                    $(this).spliterRender();
                }
            } catch(o) {
                alert(uncompile(quiLanguage.jsError.spliter));
            }
        });
    }
    closeProgress();
    if (!splitMode) {
        if (parent.positionType) {
            if (parent.positionType != "none" && parent.positionContent != "") {
                if (positionTarget == "") {
                    if (parent.positionType == "normal") {
                        createPosition(parent.positionContent, "normal")
                    } else {
                        createPosition(parent.positionContent, "simple")
                    }
                } else {
                    top.createPosition(positionTarget, parent.positionContent)
                }
            }
        }
    }
    _initComplete()
});
function cusTreeTableLoadLater(b, a) {
    $.ajax({
        url: a,
        error: function() {
            try {
                top.Dialog.alert("数据加载失败，请检查dataPath是否正确")
            } catch(c) {
                alert("数据加载失败，请检查dataPath是否正确")
            }
        },
        success: function(d) {
            var c = b.parents("tr").next().find("table").parents("td");
            c.html("");
            var e = $(d);
            e.appendTo(c);
            e.tableRender();
            b.removeClass("img_loading");
            b.addClass("img_remove2");
            b.attr("title", "点击收缩");
            b.parents("tr").next().show()
        }
    })
}
function triggerCustomHeightSet() {
    var b = document.documentElement.clientHeight;
    var a = document.documentElement.clientWidth;
    _customHeightSet(b, a)
}
function _customHeightSet(c, a) {
    try {
        customHeightSet(c, a)
    } catch(b) {}
}
function changeFont(a) {
    $("body").css({
        fontSize: a + "px"
    });
    if ($("table:[class=tableStyle]").length > 0) {
        $("table:[class=tableStyle]").css({
            fontSize: a + "px"
        })
    }
    if ($("pre").length > 0) {
        $("pre").css({
            fontSize: a + "px"
        })
    }
    if ($("iframe").length > 0) {
        for (var b = 0; b < $("iframe").length; b++) {
            document.getElementsByTagName("iframe")[b].contentWindow.changeFont(a)
        }
    }
    fontSize = a
}
function changeFontFamily(b) {
    $("body").css({
        fontFamily: b
    });
    if ($("iframe").length > 0) {
        for (var a = 0; a < $("iframe").length; a++) {
            document.getElementsByTagName("iframe")[a].contentWindow.changeFontFamily(b)
        }
    }
    fontFamily = b
} (function(a) {
    a.fn.render = function() {
        if (a(this).hasClass("spliter")) {
            try {
                a(this).spliterRender()
            } catch(b) {
                alert(uncompile(quiLanguage.jsError.spliter))
            }
        }
        if (a(this).is("input")) {
            if (a(this).attr("type") == "text") {
                if (a(this).hasClass("color")) {
                    a(this).textInputStyleRender();
                    try {
                        a(this).attr("trueType", "color");
                        a(this).colorRender()
                    } catch(b) {
                        alert(uncompile(quiLanguage.jsError.color))
                    }
                } else {
                    if (a(this).hasClass("date")) {
                        a(this).attr("trueType", "date");
                        a(this).dateRender()
                    } else {
                        if (a(this).hasClass("dateIcon")) {
                            a(this).attr("trueType", "date");
                            a(this).textInputStyleRender()
                        } else {
                            if (a(this).hasClass("keypad")) {
                                a(this).textInputStyleRender();
                                try {
                                    a(this).attr("trueType", "keypad");
                                    a(this).keypadRender()
                                } catch(b) {
                                    alert(uncompile(quiLanguage.jsError.keypad))
                                }
                            } else {
                                if (a(this).hasClass("stepper")) {
                                    a(this).textInputStyleRender();
                                    try {
                                        a(this).attr("trueType", "stepper");
                                        a(this).stepperRender()
                                    } catch(b) {
                                        alert(uncompile(quiLanguage.jsError.stepper))
                                    }
                                } else {
                                    a(this).attr("trueType", "textinput");
                                    a(this).textinputRender()
                                }
                            }
                        }
                    }
                }
            } else {
                if (a(this).attr("type") == "button" || a(this).attr("type") == "submit" || a(this).attr("type") == "reset") {
                    a(this).buttonInputRender()
                } else {
                    if (a(this).attr("type") == "file") {
                        a(this).attr("trueType", "file");
                        a(this).fileRender()
                    } else {
                        if (a(this).attr("type") == "password") {
                            a(this).attr("trueType", "password");
                            a(this).passInputRender();
                            if (a(this).hasClass("keypad")) {
                                a(this).textInputStyleRender();
                                try {
                                    a(this).attr("trueType", "keypad");
                                    a(this).keypadRender()
                                } catch(b) {
                                    alert(uncompile(quiLanguage.jsError.keypad))
                                }
                            }
                        } else {
                            if (a(this).attr("type") == "radio") {
                                a(this).attr("trueType", "radio")
                            } else {
                                if (a(this).attr("type") == "checkbox") {
                                    a(this).attr("trueType", "checkbox")
                                } else {
                                    if (a(this).attr("type") == "hidden") {
                                        a(this).attr("trueType", "hidden")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (a(this).is("button")) {
                a(this).buttonRender()
            } else {
                if (a(this).is("textarea")) {
                    a(this).attr("trueType", "textarea");
                    a(this).textareaRender()
                } else {
                    if (a(this).is("select")) {
                        a(this).attr("trueType", "select");
                        a(this).prev(".mainCon").attr("trueType", "q_select");
                        a(this).selectRender()
                    } else {
                        if (a(this).is("table")) {
                            if (a(this).hasClass("tableStyle")) {
                                a(this).tableRender()
                            } else {
                                if (a(this).hasClass("treeTable")) {
                                    try {
                                        a(this).treeTableRender()
                                    } catch(b) {
                                        alert(uncompile(quiLanguage.jsError.treeTable))
                                    }
                                } else {
                                    if (a(this).hasClass("detailTable")) {
                                        try {
                                            a(this).addClass("tableStyle");
                                            a(this).tableRender();
                                            a(this).detailTableRender()
                                        } catch(b) {
                                            alert(uncompile(quiLanguage.jsError.detailTable))
                                        }
                                    }
                                }
                            }
                        } else {
                            if (a(this).is("a")) {
                                if (a(this).hasClass("imgPreview")) {
                                    try {
                                        a(this).imagePreviewRender()
                                    } catch(b) {
                                        alert(uncompile(quiLanguage.jsError.imgPreview))
                                    }
                                } else {
                                    if (a(this).hasClass("imgZoom")) {
                                        try {
                                            a(this).imgZoomRender()
                                        } catch(b) {
                                            alert(uncompile(quiLanguage.jsError.imgZoom))
                                        }
                                    }
                                }
                            } else {
                                if (a(this).is("img")) {
                                    if (a(this).hasClass("imgFrame")) {
                                        try {
                                            a(this).imgFrameRender()
                                        } catch(b) {
                                            alert(uncompile(quiLanguage.jsError.imgFrame))
                                        }
                                    } else {
                                        if (a(this).hasClass("imgFade")) {
                                            try {
                                                a(this).imgFadeRender()
                                            } catch(b) {
                                                alert(uncompile(quiLanguage.jsError.imgFade))
                                            }
                                        }
                                    }
                                } else {
                                    if (a(this).is("div")) {
                                        if (a(this).hasClass("box1") || a(this).attr("boxType") == "box1") {
                                            a(this).box1Render()
                                        } else {
                                            if (a(this).hasClass("box2") || a(this).attr("boxType") == "box2") {
                                                a(this).box2Render()
                                            } else {
                                                if (a(this).hasClass("box4")) {
                                                    a(this).box4Render()
                                                } else {
                                                    if (a(this).hasClass("floatPanel")) {
                                                        try {
                                                            a(this).floatPanelRender()
                                                        } catch(b) {
                                                            alert(uncompile(quiLanguage.jsError.floatPanel))
                                                        }
                                                    } else {
                                                        if (a(this).hasClass("selectTree")) {
                                                            try {
                                                                a(this).attr("trueType", "selectTree");
                                                                a(this).selectTreeRender()
                                                            } catch(b) {
                                                                alert(uncompile(quiLanguage.jsError.selectTree))
                                                            }
                                                        } else {
                                                            if (a(this).hasClass("selectCustom")) {
                                                                try {
                                                                    a(this).attr("trueType", "selectCustom");
                                                                    a(this).selectCustomRender()
                                                                } catch(b) {
                                                                    alert(uncompile(quiLanguage.jsError.selectCustom))
                                                                }
                                                            } else {
                                                                if (a(this).hasClass("suggestion")) {
                                                                    try {
                                                                        a(this).attr("trueType", "suggestion");
                                                                        a(this).suggestionRender()
                                                                    } catch(b) {
                                                                        alert(uncompile(quiLanguage.jsError.suggestion))
                                                                    }
                                                                } else {
                                                                    if (a(this).hasClass("filter")) {
                                                                        try {
                                                                            a(this).attr("trueType", "filter");
                                                                            a(this).filterRender()
                                                                        } catch(b) {
                                                                            alert(uncompile(quiLanguage.jsError.filter))
                                                                        }
                                                                    } else {
                                                                        if (a(this).hasClass("lister")) {
                                                                            try {
                                                                                a(this).attr("trueType", "lister");
                                                                                a(this).listerRender()
                                                                            } catch(b) {
                                                                                alert(uncompile(quiLanguage.jsError.lister))
                                                                            }
                                                                        } else {
                                                                            if (a(this).hasClass("listerTree")) {
                                                                                try {
                                                                                    a(this).attr("trueType", "listerTree");
                                                                                    a(this).listerTreeRender()
                                                                                } catch(b) {
                                                                                    alert(uncompile(quiLanguage.jsError.listerTree))
                                                                                }
                                                                            } else {
                                                                                if (a(this).hasClass("rating")) {
                                                                                    try {
                                                                                        a(this).attr("trueType", "rating");
                                                                                        a(this).ratingRender()
                                                                                    } catch(b) {
                                                                                        alert(uncompile(quiLanguage.jsError.rating))
                                                                                    }
                                                                                } else {
                                                                                    if (a(this).hasClass("popupMenu")) {
                                                                                        a(this).popupMenuRender()
                                                                                    } else {
                                                                                        if (a(this).hasClass("basicTab")) {
                                                                                            try {
                                                                                                a(this).basicTabRender()
                                                                                            } catch(b) {
                                                                                                alert(uncompile(quiLanguage.jsError.basicTab))
                                                                                            }
                                                                                        } else {
                                                                                            if (a(this).hasClass("basicTabModern")) {
                                                                                                a(this).basicTabModernRender()
                                                                                            } else {
                                                                                                if (a(this).hasClass("basicTabProcess")) {
                                                                                                    try {
                                                                                                        a(this).basicTabProcessRender()
                                                                                                    } catch(b) {
                                                                                                        alert(uncompile(quiLanguage.jsError.basicTabProcess))
                                                                                                    }
                                                                                                } else {
                                                                                                    if (a(this).hasClass("verticalTab")) {
                                                                                                        try {
                                                                                                            a(this).verticalTabRender()
                                                                                                        } catch(b) {
                                                                                                            alert(uncompile(quiLanguage.jsError.verticalTab))
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (a(this).hasClass("singleNav")) {
                                                                                                            a(this).singleNavRender()
                                                                                                        } else {
                                                                                                            if (a(this).hasClass("singleNavMin")) {
                                                                                                                a(this).singleNavMinRender()
                                                                                                            } else {
                                                                                                                if (a(this).hasClass("accordition")) {
                                                                                                                    try {
                                                                                                                        a(this).accorditionRender()
                                                                                                                    } catch(b) {
                                                                                                                        alert(uncompile(quiLanguage.jsError.accordion))
                                                                                                                    }
                                                                                                                } else {
                                                                                                                    if (a(this).hasClass("navIcon")) {
                                                                                                                        a(this).hover(function() {
                                                                                                                            a(this).addClass("navIcon_hover")
                                                                                                                        },
                                                                                                                        function() {
                                                                                                                            a(this).removeClass("navIcon_hover")
                                                                                                                        })
                                                                                                                    } else {
                                                                                                                        if (a(this).hasClass("navIconSmall")) {
                                                                                                                            a(this).hover(function() {
                                                                                                                                a(this).addClass("navIconSmall_hover")
                                                                                                                            },
                                                                                                                            function() {
                                                                                                                                a(this).removeClass("navIconSmall_hover")
                                                                                                                            })
                                                                                                                        } else {
                                                                                                                            if (a(this).hasClass("pageNumber")) {
                                                                                                                                try {
                                                                                                                                    a(this).pageNumberRender()
                                                                                                                                } catch(b) {
                                                                                                                                    alert(uncompile(quiLanguage.jsError.pageNumber))
                                                                                                                                }
                                                                                                                            } else {
                                                                                                                                if (a(this).hasClass("pageArrow")) {
                                                                                                                                    try {
                                                                                                                                        a(this).pageArrowRender()
                                                                                                                                    } catch(b) {
                                                                                                                                        alert(uncompile(quiLanguage.jsError.pageArrow))
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (a(this).is("span")) {
                                            if (a(this).hasClass("img_light")) {
                                                a(this).addClass("hand");
                                                a(this).hover(function() {
                                                    a(this).removeClass("img_light");
                                                    a(this).addClass("img_lightOn")
                                                },
                                                function() {
                                                    a(this).addClass("img_light");
                                                    a(this).removeClass("img_lightOn")
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    a.fn.setValue = function(c, d) {
        var b = a(this);
        if (b.attr("trueType") == "select") {
            b.attr("selectedValue", c);
            b.render()
        } else {
            if (b.attr("trueType") == "selectTree") {
                b.attr("selectedValue", c);
                b.render()
            } else {
                if (b.attr("trueType") == "selectCustom") {
                    b.selectCustomSetValue(c, d)
                } else {
                    if (b.attr("trueType") == "suggestion") {
                        b.suggestionSetValue(c, d)
                    } else {
                        if (b.attr("trueType") == "lister") {
                            b.listerSetValue(c)
                        } else {
                            if (b.attr("trueType") == "listerTree") {
                                b.listerTreeSetValue(c)
                            } else {
                                if (b.attr("trueType") == "filter") {
                                    b.attr("selectedValue", c);
                                    b.render()
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    a.fn.resetValue = function() {
        var b = a(this);
        if (b.attr("trueType") == "select") {
            b.render()
        } else {
            if (b.attr("trueType") == "selectTree") {
                b.render()
            } else {
                if (b.attr("trueType") == "lister") {
                    b.render()
                } else {
                    if (b.attr("trueType") == "listerTree") {
                        b.render()
                    } else {
                        if (b.attr("trueType") == "filter") {
                            b.render()
                        }
                    }
                }
            }
        }
    };
    a.fn.addItem = function(c) {
        var b = a(this);
        if (b.attr("trueType") == "select") {
            b.selectAddItem(c)
        } else {
            if (b.attr("trueType") == "selectTree") {
                b.selectTreeAddItem(c)
            } else {
                if (b.attr("trueType") == "lister") {
                    b.listerAddItem(c)
                } else {
                    if (b.attr("trueType") == "listerTree") {
                        b.listerTreeAddItem(c)
                    }
                }
            }
        }
    };
    a.fn.removeItem = function(c) {
        var b = a(this);
        if (b.attr("trueType") == "select") {
            b.selectRemoveItem(c)
        } else {
            if (b.attr("trueType") == "selectTree") {
                b.selectTreeRemoveItem(c)
            } else {
                if (b.attr("trueType") == "lister") {
                    b.listerRemoveItem(c)
                } else {
                    if (b.attr("trueType") == "listerTree") {
                        b.listerTreeRemoveItem(c)
                    }
                }
            }
        }
    };
    a.fn.selectValue = function(c) {
        var b = a(this);
        if (b.attr("trueType") == "lister") {
            b.listerSelectValue(c)
        } else {
            if (b.attr("trueType") == "listerTree") {
                b.listerTreeSelectValue(c)
            }
        }
    };
    a.fn.unSelectValue = function(c) {
        var b = a(this);
        if (b.attr("trueType") == "lister") {
            b.listerUnSelectValue(c)
        } else {
            if (b.attr("trueType") == "listerTree") {
                b.listerTreeUnSelectValue(c)
            }
        }
    };
    a.fn.box1Render = function() {
        var b;
        if (a(this).find(".boxContent").length > 0) {} else {
            b = a(this).html();
            a(this).empty();
            if (a(this).attr("whiteBg") == "true" || a(this).attr("whiteBg") == true || boxWhiteBg == true) {
                if (a(this).hasClass("box1")) {
                    a(this).addClass("box1_white")
                }
            }
            a("<div class='box_topcenter'><div class='box_topleft'><div class='box_topright'></div></div></div>").appendTo(a(this));
            a("<div class='box_middlecenter'><div class='box_middleleft'><div class='box_middleright'><div class='boxContent'></div></div></div></div>").appendTo(a(this));
            a("<div class='box_bottomcenter'><div class='box_bottomleft'><div class='box_bottomright'></div></div></div>").appendTo(a(this));
            a(this).find(".boxContent").html(b)
        }
        a(this).box1Build()
    };
    a.fn.box1Build = function() {
        if (a(this).attr("panelWidth") != null) {
            var d = a(this).attr("panelWidth");
            var c = d.substr(d.length - 1, 1);
            if (c == "%") {
                a(this).width(d)
            } else {
                var e = Number(a(this).attr("panelWidth"));
                a(this).width(e)
            }
        }
        if (a(this).attr("panelHeight") != null) {
            var b;
            if (a(this).attr("whiteBg") == "true" || a(this).attr("whiteBg") == true) {
                b = Number(a(this).attr("panelHeight")) - a(this).find(".box1_topcenter2").outerHeight() - a(this).find(".box1_bottomcenter2").outerHeight()
            } else {
                b = Number(a(this).attr("panelHeight")) - a(this).find(".box1_topcenter").outerHeight() - a(this).find(".box1_bottomcenter").outerHeight()
            }
            a(this).find(".boxContent").height(b)
        }
        if (a(this).attr("overflow") == "true" || a(this).attr("overflow") == true) {
            a(this).find(".boxContent").css({
                overflow: "auto"
            })
        } else {
            if (a(this).attr("overflow") == "false" || a(this).attr("overflow") == false) {
                a(this).find(".boxContent").css({
                    overflow: "hidden"
                })
            } else {
                a(this).find(".boxContent").css({
                    overflow: "visible"
                })
            }
        }
        if (a(this).attr("position") == "center") {
            a(this).addClass("center")
        } else {
            a(this).removeClass("center")
        }
    };
    a.fn.box2Close = function() {
        var b = a(this).box2GetState();
        if (!b) {
            return
        }
        a(this).find(".ss").click()
    };
    a.fn.box2Open = function() {
        var b = a(this).box2GetState();
        if (b) {
            return
        }
        a(this).find(".ss").click()
    };
    a.fn.box2ChangeState = function() {
        a(this).find(".ss").click()
    };
    a.fn.box2GetState = function() {
        var b;
        if (a(this).find(".boxContent")[0].style.display == "none") {
            b = false
        } else {
            b = true
        }
        return b
    };
    a.fn.box2Render = function() {
        var b;
        if (a(this).find(".boxContent").length > 0) {} else {
            b = a(this).html();
            a(this).empty();
            a("<div class='box_topcenter' id='box_topcenter'><div class='box_topleft'><div class='box_topright'><div class='title'><span></span></div><div class='boxSubTitle'></div><div class='status'><span class='ss'><a></a></span></div><div class='clear'></div></div></div></div>").appendTo(a(this));
            a("<div class='box_middlecenter'><div class='box_middleleft'><div class='box_middleright'><div class='boxContent'></div></div></div></div>").appendTo(a(this));
            a("<div class='box_bottomcenter' id='box_bottomcenter'><div class='box_bottomleft'><div class='box_bottomright'></div></div></div>").appendTo(a(this));
            a(this).find(".boxContent").html(b)
        }
        a(this).box2Build()
    };
    a.fn.box2Build = function() {
        var f = a(this);
        var r = f.find(".title");
        var o = r.find("span");
        if (f.attr("boxType") == null) {
            f.attr("boxType", "box2")
        }
        if (f.attr("panelTitle") != null) {
            o.text(f.attr("panelTitle"))
        }
        if (f.attr("iconClass") != null) {
            o.addClass(f.attr("iconClass"));
            o.css({
                backgroundPosition: "0 50%"
            });
            o.parent().addClass("title_icon")
        } else {
            if (f.attr("iconSrc") != null) {
                o.css({
                    backgroundImage: "url(" + a(this).attr("iconSrc") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 50%",
                    display: "block"
                });
                o.parent().addClass("title_icon")
            }
        }
        if (f.attr("panelSubTitle") != null) {
            a(this).find(".boxSubTitle").text(f.attr("panelSubTitle"))
        }
        if (f.attr("panelSubTitleColor") != null) {
            a(this).find(".boxSubTitle").css({
                color: f.attr("panelSubTitleColor")
            })
        }
        if (a(this).attr("panelWidth") != null) {
            var c = a(this).attr("panelWidth");
            var n = c.substr(c.length - 1, 1);
            if (n == "%") {
                a(this).width(c)
            } else {
                var b = Number(a(this).attr("panelWidth"));
                a(this).width(b)
            }
        }
        if (a(this).attr("panelHeight") != null) {
            var p = Number(a(this).attr("panelHeight")) - a(this).find("#box2_topcenter").outerHeight() - a(this).find("#box2_bottomcenter").outerHeight();
            a(this).find(".boxContent").height(p)
        }
        if (a(this).attr("overflow") == "true" || a(this).attr("overflow") == true) {
            a(this).find(".boxContent").css({
                overflow: "auto"
            })
        } else {
            if (a(this).attr("overflow") == "false" || a(this).attr("overflow") == false) {
                a(this).find(".boxContent").css({
                    overflow: "hidden"
                })
            } else {
                a(this).find(".boxContent").css({
                    overflow: "visible"
                })
            }
        }
        var e = "true";
        if (a(this).attr("showStatus") != null) {
            e = a(this).attr("showStatus")
        }
        var m = "javascript:;";
        if (a(this).attr("panelUrl") != null) {
            m = a(this).attr("panelUrl")
        }
        var l = "_self";
        if (a(this).attr("panelTarget") != null) {
            l = a(this).attr("panelTarget")
        }
        var d = uncompile(quiLanguage.box2.collapseText);
        if (a(this).attr("statusText") != null) {
            d = a(this).attr("statusText")
        }
        var s = uncompile(quiLanguage.box2.expendText);
        if (a(this).attr("afterStatusText") != null) {
            s = a(this).attr("afterStatusText")
        }
        var h = a(this).find(".ss");
        h.unbind("click");
        var q;
        var t = "visibleChange";
        if (a(this).attr("statusType") != null) {
            t = a(this).attr("statusType")
        }
        var g = "open";
        if (a(this).attr("startState") != null) {
            g = a(this).attr("startState")
        }
        if (t == "visibleChange" && e == "true" && g == "open") {
            h.text(d);
            h.toggle(function() {
                var u = a(this).parents('div[boxType="box2"]').find(".boxContent");
                q = u.height();
                if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                    u.fadeOut(300,
                    function() {
                        f.trigger("stateChange", "hide")
                    })
                } else {
                    u.hide(300,
                    function() {
                        f.trigger("stateChange", "hide")
                    })
                }
                a(this).text(s)
            },
            function() {
                var u = a(this).parents('div[boxType="box2"]').find(".boxContent");
                u.height(q);
                if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                    u.fadeIn(300,
                    function() {
                        f.trigger("stateChange", "show")
                    })
                } else {
                    u.show(300,
                    function() {
                        f.trigger("stateChange", "show")
                    })
                }
                if (a(this).parents('div[boxType="box2"]').attr("panelHeight") == null) {
                    setTimeout(function() {
                        u.css({
                            height: "auto"
                        })
                    },
                    500)
                }
                a(this).text(d)
            })
        } else {
            if (t == "visibleChange" && e == "true" && g == "close") {
                h.text(d);
                var i = a(this).find(".boxContent");
                q = i.height();
                i.hide();
                h.toggle(function() {
                    var u = a(this).parents('div[boxType="box2"]').find(".boxContent");
                    u.height(q);
                    if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                        u.fadeIn(300,
                        function() {
                            f.trigger("stateChange", "show")
                        })
                    } else {
                        u.show(300,
                        function() {
                            f.trigger("stateChange", "show")
                        })
                    }
                    if (a(this).parents('div[boxType="box2"]').attr("panelHeight") == null) {
                        setTimeout(function() {
                            u.css({
                                height: "auto"
                            })
                        },
                        500)
                    }
                    a(this).text(s)
                },
                function() {
                    if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                        i.fadeOut(300,
                        function() {
                            f.trigger("stateChange", "hide")
                        })
                    } else {
                        i.hide(300,
                        function() {
                            f.trigger("stateChange", "hide")
                        })
                    }
                    a(this).text(d)
                })
            } else {
                if (t == "link" && e == "true" && a(this).attr("statusText") != null) {
                    h.find("a").attr("href", m);
                    h.find("a").attr("target", l);
                    h.find("a").text(d)
                } else {
                    if (e == "true" && a(this).attr("statusText") != null) {
                        h.text(d);
                        h.css({
                            cursor: "auto"
                        })
                    } else {
                        h.hide()
                    }
                }
            }
        }
    };
    a.fn.box4Render = function() {
        var b;
        if (a(this).find(".boxContent").length > 0) {} else {
            b = a(this).html();
            a(this).empty();
            if (box4Custom) {
                a("<div class='box4_topcenter_notitle2' id='box4_notitle'><div class='box4_topleft_notitle2'><div class='box4_topright_notitle2'></div></div></div>").appendTo(a(this));
                a("<div class='box4_topcenter2' id='box4_hastitle'><div class='box4_topleft2'><div class='box4_topright2'><div class='title'></div></div></div></div>").appendTo(a(this));
                a("<div class='box4_middlecenter2'><div class='box4_middleleft2'><div class='box4_middleright2'><div class='boxContent'></div></div></div></div>").appendTo(a(this));
                a("<div class='box4_bottomcenter2' id='box4_bottomcenter'><div class='box4_bottomleft2'><div class='box4_bottomright2'></div></div></div>").appendTo(a(this))
            } else {
                a("<div class='box4_topcenter_notitle' id='box4_notitle'><div class='box4_topleft_notitle'><div class='box4_topright_notitle'></div></div></div>").appendTo(a(this));
                a("<div class='box4_topcenter' id='box4_hastitle'><div class='box4_topleft'><div class='box4_topright'><div class='title'></div></div></div></div>").appendTo(a(this));
                a("<div class='box4_middlecenter'><div class='box4_middleleft'><div class='box4_middleright'><div class='boxContent'></div></div></div></div>").appendTo(a(this));
                a("<div class='box4_bottomcenter' id='box4_bottomcenter'><div class='box4_bottomleft'><div class='box4_bottomright'></div></div></div>").appendTo(a(this))
            }
            a(this).find(".boxContent").html(b)
        }
        a(this).box4Build()
    };
    a.fn.box4Build = function() {
        if (a(this).attr("panelTitle") != null) {
            a(this).find(".title").text(a(this).attr("panelTitle"))
        }
        var f = a(this).find("#box4_notitle");
        var b = a(this).find("#box4_hastitle");
        f.hide();
        b.hide();
        if (a(this).attr("noTitle") == "true" || a(this).attr("noTitle") == true) {
            f.show()
        } else {
            b.show()
        }
        if (a(this).attr("panelWidth") != null) {
            var g = a(this).attr("panelWidth");
            var d = g.substr(g.length - 1, 1);
            if (d == "%") {
                a(this).width(g)
            } else {
                var h = Number(a(this).attr("panelWidth"));
                a(this).width(h)
            }
        }
        if (a(this).attr("panelHeight") != null) {
            a(this).find(".box4_topcenter").height(27);
            a(this).find(".box4_bottomcenter").height(5);
            var c;
            if (a(this).attr("noTitle") == "true" || a(this).attr("noTitle") == true) {
                c = Number(a(this).attr("panelHeight")) - a(this).find("#box4_notitle").outerHeight() - a(this).find("#box4_bottomcenter").outerHeight()
            } else {
                c = Number(a(this).attr("panelHeight")) - a(this).find("#box4_hastitle").outerHeight() - a(this).find("#box4_bottomcenter").outerHeight()
            }
            a(this).find(".boxContent").height(c)
        }
        if (a(this).attr("overflow") == "true" || a(this).attr("overflow") == true) {
            a(this).find(".boxContent").css({
                overflow: "auto"
            })
        } else {
            if (a(this).attr("overflow") == "false" || a(this).attr("overflow") == false) {
                a(this).find(".boxContent").css({
                    overflow: "hidden"
                })
            } else {
                a(this).find(".boxContent").css({
                    overflow: "visible"
                })
            }
        }
        var e = a(this);
        e.find("li a").unbind("click");
        e.find("li a").each(function(l) {
            a(this).click(function() {
                e.find("li a").removeClass("current");
                a(this).addClass("current")
            })
        })
    };
    a.fn.textinputRender = function() {
        if (a(this).attr("inputMode")) {
            var e = a(this).attr("inputMode");
            if (e == "numberOnly") {
                var d = a(this)[0];
                var c = function() {
                    d.value = d.value.replace(/\D/g, "");
                    if (!validateInput(d.value, "^(0|[1-9][0-9]*)$")) {
                        d.value = d.value.substring(1)
                    }
                };
                a(this)[0].onkeyup = function() {
                    c()
                };
                a(this)[0].onafterpaste = function() {
                    c()
                }
            } else {
                if (e == "positiveDecimal") {
                    var d = a(this)[0];
                    var c = function() {
                        d.value = d.value.replace(/[^0-9\.]/g, "");
                        if (!validateInput(d.value, "^(([1-9]+)|([1-9]+).{1}|([0-9]+.{1}[0-9]+))$")) {
                            d.value = d.value.substring(0, d.value.length - 1)
                        }
                    };
                    a(this)[0].onkeyup = function() {
                        c()
                    };
                    a(this)[0].onafterpaste = function() {
                        c()
                    }
                }
            }
        }
        a(this).bind("keydown",
        function(g) {
            var f = g.keyCode || g.which || g.charCode;
            if (f == 13) {
                a(this).trigger("enter")
            }
        });
        if (a(this).attr("class") == "keypad") {
            return
        }
        a(this).addClass("textinput");
        a(this).css("fontFamily", fontFamily);
        a(this).css("fontSize", fontSize);
        var b = null;
        a(this).hover(function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textinput");
                a(this).addClass("textinput_hover")
            }
        },
        function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textinput_hover");
                a(this).addClass("textinput")
            }
        });
        a(this).focus(function() {
            b = a(this)[0];
            a(this).removeClass("textinput");
            a(this).removeClass("textinput_hover");
            a(this).addClass("textinput_click")
        });
        a(this).blur(function() {
            b = null;
            a(this).removeClass("textinput_click");
            a(this).addClass("textinput")
        });
        if (a(this).attr("clearable") == "true") {
            a(this).clearableTextField()
        }
        if (a(this).attr("maxNum") != null) {
            a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            })
        }
        if (a(this).attr("watermark") != null) {
            a(this).watermark("watermark", a(this).attr("watermark"))
        }
    };
    a.fn.fileRender = function() {
        var i = 184;
        var g = 60;
        var l = 0;
        if (!splitMode) {
            var c = a(window.top.document.getElementById("theme"));
            if (c.attr("defaultFileInputWidth") != null) {
                l = Number(c.attr("defaultFileInputWidth"))
            }
            if (c.attr("fileBtnWidth") != null) {
                g = Number(c.attr("fileBtnWidth"))
            }
        } else {
            if (a(this).attr("fileBtnWidth") != null) {
                g = Number(a(this).attr("fileBtnWidth"))
            }
        }
        if (a(this).attr("fileWidth")) {
            i = Number(a(this).attr("fileWidth"))
        } else {
            if (l != 0) {
                i = l
            }
        }
        a(this).addClass("fileComponent");
        a(this).wrap('<div class="file-container"></div>');
        var f = a('<table cellspacing="0" cellpadding="0" style="border-style:none;position:absolute;z-index:10;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"><input type="text" class="textinput"/></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"><input type="button" class="fileBtn" value="" /></td></tr></table>');
        var h = a(this).parent();
        h.wrap('<div class="file-container-main"></div>');
        var b = h.parent();
        h.prepend(f);
        var d = f.find("input[type=text]");
        var e = f.find(".fileBtn");
        e.width(g);
        d.width(i - g - 2);
        if (a.browser.msie) {
            a(this).width(i)
        }
        h.width(i + 5);
        b.width(i + 5);
        a(this).css({
            position: "absolute",
            "z-index": 20,
            "font-size": "118px",
            opacity: "0",
            left: "0px",
            top: "-30px"
        });
        a(this).change(function() {
            var m = "";
            if (broswerFlag == "IE6" || broswerFlag == "IE7" || broswerFlag == "IE8" || broswerFlag == "IE9") {
                a(this)[0].select();
                m = document.selection.createRange().text
            } else {
                if (broswerFlag == "firefox") {
                    m = a(this).val()
                } else {
                    var n = a(this).val().toString().split("\\");
                    m = n[n.length - 1]
                }
            }
            var p = a(this).parent().find("input[type=text]");
            p.val(m);
            if (a(this).attr("showInfo") != "false") {
                try {
                    a(this).attr("title", m);
                    addTooltip(a(this)[0])
                } catch(o) {}
            } else {
                if (a(this).attr("showTitle") != "false") {
                    try {
                        a(this).attr("title", m)
                    } catch(o) {}
                }
            }
            a(this).css({
                "font-size": "118px"
            });
            a(this).blur()
        })
    };
    a.fn.textInputStyleRender = function() {
        a(this).css("fontFamily", fontFamily);
        a(this).css("fontSize", fontSize);
        var b = null;
        if (a(this).attr("inputMode")) {
            var c = a(this).attr("inputMode");
            if (c == "numberOnly") {
                a(this)[0].onkeyup = function() {
                    a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
                };
                a(this)[0].onafterpaste = function() {
                    a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
                }
            }
        }
        a(this).hover(function() {
            if (b != a(this)[0]) {
                a(this).addClass("date_hover")
            }
        },
        function() {
            if (b != a(this)[0]) {
                a(this).removeClass("date_hover")
            }
        });
        a(this).focus(function() {
            b = a(this)[0];
            a(this).removeClass("date_hover");
            a(this).addClass("date_click")
        });
        a(this).blur(function() {
            b = null;
            a(this).removeClass("date_click")
        })
    };
    a.fn.passInputRender = function() {
        var b = null;
        a(this).addClass("textinput");
        if (a(this).attr("inputMode")) {
            var c = a(this).attr("inputMode");
            if (c == "numberOnly") {
                a(this)[0].onkeyup = function() {
                    a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
                };
                a(this)[0].onafterpaste = function() {
                    a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
                }
            }
        }
        a(this).bind("keydown",
        function(f) {
            var d = f.keyCode || f.which || f.charCode;
            if (d == 13) {
                a(this).trigger("enter")
            }
        });
        a(this).hover(function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textinput");
                a(this).addClass("textinput_hover")
            }
        },
        function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textinput_hover");
                a(this).addClass("textinput")
            }
        });
        a(this).focus(function() {
            b = a(this)[0];
            a(this).removeClass("textinput");
            a(this).removeClass("textinput_hover");
            a(this).addClass("textinput_click")
        });
        a(this).blur(function() {
            b = null;
            a(this).removeClass("textinput_click");
            a(this).addClass("textinput")
        });
        if (a(this).attr("clearable") == "true") {
            a(this).clearableTextField()
        }
        if (a(this).attr("maxNum") != null) {
            a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            })
        }
        if (a(this).attr("checkStrength") == "true") {
            a(this).password_strength()
        }
        if (a(this).attr("checkCaps") !== "false") {
            a(this).caps(function(d) {
                if (d) {
                    a(this).tip({
                        showCloseBtn: true,
                        content: uncompile(quiLanguage.jsError.capslock),
                        width: 160
                    })
                } else {}
            })
        }
    };
    a.fn.textareaRender = function() {
        var b = null;
        a(this).addClass("textarea");
        a(this).css("fontFamily", fontFamily);
        a(this).css("fontSize", fontSize);
        if (a(this).attr("maxNum") != null) {
            a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            })
        }
        if (a(this).attr("resize") == "true") {
            a(this).TextAreaResizer()
        }
        if (a(this).attr("autoHeight") == "true") {
            a(this).css({
                height: "auto"
            });
            a(this).attr("rows", 5);
            a(this).autoGrow()
        }
        if (a(this).attr("watermark") != null) {
            a(this).watermark("watermark", a(this).attr("watermark"))
        }
        a(this).hover(function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textarea");
                a(this).addClass("textarea_hover")
            }
        },
        function() {
            if (b != a(this)[0]) {
                a(this).removeClass("textarea_hover");
                a(this).addClass("textarea")
            }
        });
        a(this).focus(function() {
            b = a(this)[0];
            a(this).removeClass("textarea");
            a(this).removeClass("textarea_hover");
            a(this).addClass("textarea_click")
        });
        a(this).blur(function() {
            b = null;
            a(this).removeClass("textarea_click");
            a(this).addClass("textarea")
        })
    };
    a.fn.buttonInputRender = function() {
        if (!a(this).attr("class")) {
            a(this).addClass("button")
        }
        a(this).css("fontFamily", fontFamily);
        a(this).css("fontSize", fontSize);
        var c = _getStrLength(a(this).val());
        if (a(this).attr("useMinWidth") == "false" || a(this).attr("useMinWidth") == false) {} else {
            if (c < 5) {}
        }
        a(this).hover(function() {
            a(this).addClass("button_hover")
        },
        function() {
            a(this).removeClass("button_hover")
        });
        if (a(this).attr("toggle") == "true" || a(this).attr("toggle") == true) {
            var d = a("<input type='hidden'/>");
            if (a(this).attr("name") != null) {
                d.attr("name", a(this).attr("name"))
            }
            a(this).after(d);
            var b = 0;
            if (a(this).attr("relValue") == "1") {
                b = 1
            }
            a(this).attr("relValue", b);
            d.attr("relValue", b);
            if (b == 0) {
                a(this).toggle(function() {
                    a(this).addClass("toggle");
                    a(this).attr("relValue", 1);
                    d.attr("relValue", 1)
                },
                function() {
                    a(this).removeClass("toggle");
                    a(this).attr("relValue", 0);
                    d.attr("relValue", 0)
                })
            } else {
                a(this).addClass("toggle");
                a(this).toggle(function() {
                    a(this).removeClass("toggle");
                    a(this).attr("relValue", 0);
                    d.attr("relValue", 0)
                },
                function() {
                    a(this).addClass("toggle");
                    a(this).attr("relValue", 1);
                    d.attr("relValue", 1)
                })
            }
        }
    };
    a.fn.buttonRender = function() {
        if (!a(this).attr("class")) {
            a(this).addClass("button")
        }
        if (a(this).attr("useMinWidth") == "false" || a(this).attr("useMinWidth") == false) {} else {
            var c = _getStrLength(a(this).text());
            var b = 0;
            var d = 50;
            b = _getStrLength(a(this).filter(":has(span)").find("span").text());
            if (b != 0) {
                d = 20 + 7 * b + 10
            }
            if (broswerFlag == "firefox" || broswerFlag == "opera" || broswerFlag == "safari") {
                a(this).filter(":has(span)").css({
                    paddingLeft: "5px"
                })
            } else {
                a(this).filter(":has(span)").css({
                    paddingLeft: "5px"
                })
            }
            if (c < 5) {}
        }
        a(this).filter(":has(span)").find("span").css({
            cursor: "default",
            fontFamily: fontFamily,
            fontSize: fontSize
        });
        a(this).hover(function() {
            a(this).addClass("button_hover")
        },
        function() {
            a(this).removeClass("button_hover")
        })
    };
    a.fn.dateRender = function() {
        var d = null;
        a(this).css("fontFamily", fontFamily);
        a(this).css("fontSize", fontSize);
        var c = "yyyy-MM-dd";
        if (a(this).attr("dateFmt") != null) {
            c = a(this).attr("dateFmt")
        }
        var b = false;
        if (a(this).attr("doubleCal") == true || a(this).attr("doubleCal") == "true") {
            b = true
        }
        a(this).hover(function() {
            if (d != a(this)[0]) {
                a(this).addClass("date_hover")
            }
        },
        function() {
            if (d != a(this)[0]) {
                a(this).removeClass("date_hover")
            }
        });
        a(this).focus(function() {
            try {
                WdatePicker({
                    skin: themeColor,
                    isShowClear: true,
                    dateFmt: c,
                    doubleCalendar: b,
                    onpicked: function(e) {
                        a(this).blur()
                    }
                })
            } catch(f) {
                alert(uncompile(quiLanguage.jsError.WdatePicker))
            }
            d = a(this)[0];
            a(this).removeClass("date_hover");
            a(this).addClass("date_click")
        });
        a(this).blur(function() {
            d = null;
            a(this).removeClass("date_click")
        })
    };
    a.fn.popupMenuRender = function() {
        a(this).hover(function() {
            a(this).find(".popupMenu_con").show()
        },
        function() {
            a(this).find(".popupMenu_con").hide()
        })
    };
    a.fn.singleNavRender = function() {
        var b = a(this);
        b.find(">div span").each(function() {
            a(this).click(function() {
                b.find(">div").removeClass("current");
                a(this).parent("div").addClass("current")
            });
            a(this).hover(function() {
                a(this).animate({
                    paddingLeft: "40px"
                },
                "fast")
            },
            function() {
                a(this).animate({
                    paddingLeft: "20px"
                })
            })
        })
    };
    a.fn.singleNavMinRender = function() {
        var b = a(this);
        b.find(">div span").each(function() {
            a(this).click(function() {
                b.find(">div").removeClass("current");
                a(this).parent("div").addClass("current")
            });
            a(this).hover(function() {
                a(this).animate({
                    paddingLeft: "15px"
                },
                "fast")
            },
            function() {
                a(this).animate({
                    paddingLeft: "5px"
                })
            })
        })
    };
    a.fn.tableRender = function() {
        return this.each(function() {
            if (a(this).attr("mode") == "list") {
                if (a(this).attr("thTrueWidth") == "true" || a(this).attr("thTrueWidth") == true) {
                    a("#scrollContent").css({
                        overflowX: "auto"
                    });
                    var b = 0;
                    a(this).find("tr").eq(0).find("th").each(function() {
                        var g = Number(a(this).attr("trueWidth"));
                        b = b + g;
                        a(this).width(g)
                    });
                    a(this).width(b)
                } else {
                    if (a(this).attr("tdTrueWidth") == "true" || a(this).attr("tdTrueWidth") == true) {
                        a("#scrollContent").css({
                            overflowX: "auto"
                        });
                        var e = 0;
                        a(this).find("tr").eq(0).find("td").each(function() {
                            var g = Number(a(this).attr("trueWidth"));
                            e = e + g;
                            a(this).width(g)
                        });
                        a(this).width(e)
                    }
                }
                if (a(this).attr("fixedCellHeight") == "true" || a(this).attr("fixedCellHeight") == true) {} else {
                    a(this).addClass("tableStyleWordWrap")
                }
                if (a(this).find("tr").eq(1).find("td").eq(0).find('input[type="checkbox"]').length == 1) {
                    if (a(this).attr("useCheckBox") != "false") {
                        a(this).attr("useCheckBox", "true")
                    }
                    if (a(this).attr("useMultColor") != "false") {
                        a(this).attr("useMultColor", "true")
                    }
                }
                if (a(this).find("tr").eq(1).find("td").eq(0).find('input[type="radio"]').length == 1) {
                    if (a(this).attr("useRadio") != "false") {
                        a(this).attr("useRadio", "true")
                    }
                }
                if (a(this).attr("useColor") != "false") {
                    a(this).find("tr:even").addClass("odd")
                }
                if (a(this).attr("useHover") != "false") {
                    a(this).find("tr").hover(function() {
                        a(this).addClass("highlight")
                    },
                    function() {
                        a(this).removeClass("highlight")
                    })
                }
                if (a(this).attr("sortMode") == "true") {
                    a(this).find("th").filter(":has(span)").hover(function() {
                        a(this).removeClass("th");
                        a(this).addClass("th_over")
                    },
                    function() {
                        a(this).removeClass("th_over");
                        a(this).addClass("th")
                    });
                    a(this).find("th span").addClass("sort_off");
                    a(this).find("th").click(function() {})
                }
                if (a(this).attr("useClick") != "false") {
                    a(this).attr("useClick", "true")
                }
                if (a(this).attr("useClick") == "true" && a(this).attr("useMultColor") == "true") {
                    a(this).attr("useClick", "false")
                }
                if (a(this).attr("useRadio") != "true") {
                    a(this).attr("useRadio", "false")
                }
                if (a(this).attr("useCheckBox") != "true") {
                    a(this).attr("useCheckBox", "false")
                }
                if (a(this).attr("useClick") != "false") {
                    if (a(this).attr("useRadio") == "false") {
                        a(this).find("tr").click(function() {
                            a(this).siblings().removeClass("selected");
                            a(this).addClass("selected")
                        })
                    } else {
                        a(this).find('input[type="radio"]:checked').parents("tr").addClass("selected");
                        a(this).find("tr").click(function() {
                            a(this).siblings().removeClass("selected");
                            a(this).addClass("selected");
                            a(this).find('input[type="radio"]').attr("checked", "checked")
                        })
                    }
                }
                if (a(this).attr("useMultColor") == "true") {
                    if (a(this).attr("useCheckBox") == "false") {
                        a(this).find("tr").click(function() {
                            a(this).toggleClass("selected")
                        })
                    } else {
                        a(this).find('input[type="checkbox"]:checked').parents("tr").addClass("selected");
                        if (a(this).find("th").length > 0) {
                            var c = a("<img src=" + prePath + 'libs/icons/checkAllOff.gif title="' + uncompile(quiLanguage.table.selectAllBtnText) + '" class="hand"></span>');
                            a(this).find("th").eq(0).addClass("ali02").html("").append(c);
                            if (a(this).attr("headFixMode") == "true") {
                                c.toggle(function() {
                                    a("table:[class=tableStyle]").find("tr").each(function() {
                                        a(this).addClass("selected");
                                        a(this).find('input[type="checkbox"]').attr("checked", "checked")
                                    });
                                    a(this).attr("src", prePath + "libs/icons/checkAllOn.gif");
                                    a(this).attr("title", uncompile(quiLanguage.table.deSelectAllBtnText))
                                },
                                function() {
                                    a("table:[class=tableStyle]").find("tr").each(function() {
                                        if (a(this).hasClass("selected")) {
                                            a(this).removeClass("selected");
                                            a(this).find('input[type="checkbox"]').removeAttr("checked")
                                        }
                                    });
                                    a(this).attr("src", prePath + "libs/icons/checkAllOff.gif");
                                    a(this).attr("title", uncompile(quiLanguage.table.selectAllBtnText))
                                })
                            } else {
                                c.toggle(function() {
                                    a(this).parents("table").find("tr").each(function() {
                                        a(this).addClass("selected");
                                        a(this).find('input[type="checkbox"]').attr("checked", "checked")
                                    });
                                    a(this).attr("src", prePath + "libs/icons/checkAllOn.gif");
                                    a(this).attr("title", uncompile(quiLanguage.table.deSelectAllBtnText))
                                },
                                function() {
                                    a(this).parents("table").find("tr").each(function() {
                                        if (a(this).hasClass("selected")) {
                                            a(this).removeClass("selected");
                                            a(this).find('input[type="checkbox"]').removeAttr("checked")
                                        }
                                    });
                                    a(this).attr("src", prePath + "libs/icons/checkAllOff.gif");
                                    a(this).attr("title", uncompile(quiLanguage.table.selectAllBtnText))
                                })
                            }
                        }
                        if (a(this).attr("selectRowButtonOnly") == false || a(this).attr("selectRowButtonOnly") == "false") {
                            a(this).find("tr:has(td)").each(function() {
                                a(this).find("td").eq(0).addClass("ali02");
                                a(this).unbind("click");
                                a(this).bind("click",
                                function() {
                                    if (a(this).hasClass("selected")) {
                                        a(this).removeClass("selected");
                                        a(this).find("td").eq(0).find('input[type="checkbox"]').attr("checked", false)
                                    } else {
                                        a(this).addClass("selected");
                                        a(this).find("td").eq(0).find('input[type="checkbox"]').attr("checked", true)
                                    }
                                })
                            })
                        } else {
                            a(this).find("tr:has(td)").find('input[type="checkbox"]').each(function() {
                                a(this).parents("td").addClass("ali02");
                                a(this).unbind("click");
                                a(this).bind("click",
                                function() {
                                    if (a(this).parents("tr").hasClass("selected")) {
                                        a(this).parents("tr").removeClass("selected")
                                    } else {
                                        a(this).parents("tr").addClass("selected")
                                    }
                                })
                            })
                        }
                    }
                }
            }
            if (a(this).attr("formMode") == "line") {
                a(this).attr("useColor", "false");
                a(this).attr("useHover", "false");
                a(this).attr("useClick", "false");
                a(this).find("th").css({
                    fontWeight: "bold",
                    "text-align": "center"
                });
                a(this).find("tr").find("td:even").css("text-align", "right");
                if (a(this).attr("footer") != null) {
                    if (a(this).attr("footer") == "left") {
                        a(this).find("tr:last").find("td").css("text-align", "left")
                    } else {
                        if (a(this).attr("footer") == "right") {
                            a(this).find("tr:last").find("td").css("text-align", "right")
                        } else {
                            if (a(this).attr("footer") == "center") {
                                a(this).find("tr:last").find("td").css("text-align", "center")
                            } else {
                                if (a(this).attr("footer") == "normal") {
                                    a(this).find("tr:last").find("td:even").css("text-align", "right")
                                }
                            }
                        }
                    }
                } else {
                    var f = a(this).find("tr:last").find("td").eq(0).attr("colspan");
                    if (f) {
                        if (f.toString() != "1") {
                            a(this).find("tr:last").find("td").css("text-align", "center")
                        }
                    }
                }
                a(this).find("td").css({
                    paddingTop: "3px",
                    paddingBottom: "3px"
                })
            } else {
                if (a(this).attr("formMode") == "transparent") {
                    a(this).attr("useColor", "false");
                    a(this).attr("useHover", "false");
                    a(this).attr("useClick", "false");
                    a(this).find("th").css({
                        fontWeight: "bold",
                        "text-align": "center"
                    });
                    a(this).css({
                        border: "none",
                        backgroundColor: "transparent"
                    });
                    a(this).find("tr").css({
                        border: "none",
                        backgroundColor: "transparent"
                    });
                    a(this).find("tr").find("td:even").css("text-align", "right");
                    if (a(this).attr("footer") != null) {
                        if (a(this).attr("footer") == "left") {
                            a(this).find("tr:last").find("td").css("text-align", "left")
                        } else {
                            if (a(this).attr("footer") == "right") {
                                a(this).find("tr:last").find("td").css("text-align", "right")
                            } else {
                                if (a(this).attr("footer") == "center") {
                                    a(this).find("tr:last").find("td").css("text-align", "center")
                                } else {
                                    if (a(this).attr("footer") == "normal") {
                                        a(this).find("tr:last").find("td:even").css("text-align", "right")
                                    }
                                }
                            }
                        }
                    } else {
                        var d = a(this).find("tr:last").find("td").eq(0).attr("colspan");
                        if (d) {
                            if (d.toString() != "1") {
                                a(this).find("tr:last").find("td").css("text-align", "center")
                            }
                        }
                    }
                    a(this).find("td").css({
                        paddingTop: "3px",
                        paddingBottom: "3px",
                        border: "none"
                    })
                } else {
                    if (a(this).attr("formMode") == "view") {
                        a(this).attr("useColor", "false");
                        a(this).attr("useHover", "false");
                        a(this).attr("useClick", "false");
                        a(this).find("th").css({
                            fontWeight: "bold",
                            "text-align": "center"
                        });
                        a(this).find("tr").find("td:even").addClass("viewModeEven");
                        if (a(this).attr("footer") != null) {
                            if (a(this).attr("footer") == "left") {
                                a(this).find("tr:last").find("td").css({
                                    textAlign: "left",
                                    backgroundColor: "#ffffff"
                                })
                            } else {
                                if (a(this).attr("footer") == "right") {
                                    a(this).find("tr:last").find("td").css({
                                        textAlign: "right",
                                        backgroundColor: "#ffffff"
                                    })
                                } else {
                                    if (a(this).attr("footer") == "center") {
                                        a(this).find("tr:last").find("td").css({
                                            textAlign: "center",
                                            backgroundColor: "#ffffff"
                                        })
                                    } else {
                                        if (a(this).attr("footer") == "normal") {
                                            a(this).find("tr:last").find("td:even").css({
                                                textAlign: "right",
                                                backgroundColor: "#ffffff"
                                            })
                                        }
                                    }
                                }
                            }
                        } else {
                            var f = a(this).find("tr:last").find("td").eq(0).attr("colspan");
                            if (f) {
                                if (f.toString() != "1") {
                                    a(this).find("tr:last").find("td").css({
                                        textAlign: "center",
                                        backgroundColor: "#ffffff"
                                    })
                                }
                            }
                        }
                        a(this).find("td").css({
                            paddingTop: "6px",
                            paddingBottom: "6px"
                        })
                    }
                }
            }
            a(this).find("th").addClass("th")
        })
    }
})(jQuery);
function getPosition(c, d) {
    var a = -1;
    for (var b = 0; b < d.length; b++) {
        if (c == d[b]) {
            a = b;
            break
        }
    }
    return a
}
jQuery.fn.extend({
    selectRender: function() {
        return this.each(function() {
            if ($(this).prev("div").hasClass("mainCon")) {
                $(this).prev("div").remove()
            }
            new jQuery.SelectBox(this)
        })
    },
    selectAddItem: function(a) {
        this.each(function() {
            var c = $(this).data("data");
            var d = "list";
            if ($(this).attr("dataRoot")) {
                d = $(this).attr("dataRoot")
            }
            var b;
            if (c[d]) {
                b = c[d]
            } else {
                b = c
            }
            b.push(a);
            $(this).data("data", c);
            $(this).prev(".mainCon").remove();
            new jQuery.SelectBox(this)
        })
    },
    selectRemoveItem: function(a) {
        this.each(function() {
            var c = $(this).data("data");
            var d = -1;
            var e = "list";
            if ($(this).attr("dataRoot")) {
                e = $(this).attr("dataRoot")
            }
            var b;
            if (c[e]) {
                b = c[e]
            } else {
                b = c
            }
            $.each(b,
            function(f, g) {
                if (g[valueField].toString() == a) {
                    d = f
                }
            });
            if (d != -1) {
                b.splice(d, 1)
            }
            $(this).data("data", c);
            $(this).prev(".mainCon").remove();
            new jQuery.SelectBox(this)
        })
    }
});
if (!window.console) {
    var console = {
        log: function(a) {}
    }
}
var elm_id = 1;
jQuery.SelectBox = function(selectobj) {
    var opt = {};
    opt.inputClass = opt.inputClass || "selectbox";
    opt.containerClass = opt.containerClass || "selectbox-wrapper";
    opt.hoverClass = opt.hoverClass || "current";
    opt.currentClass = opt.selectedClass || "selected";
    opt.debug = opt.debug || false;
    elm_id++;
    var curInputId = "0_input";
    var curButtonId = "0_button";
    var active = 0;
    var inFocus = false;
    var hasfocus = 0;
    var $select = $(selectobj);
    var $container = setupContainer(opt);
    var $mainCon = setupMainCon();
    var $input = setupInput(opt);
    var autoWidth = false;
    var edit = false;
    var colNum = 1;
    var colWidth;
    var selTrueWidth;
    var windowsFlag = 0;
    var containerClick = 0;
    var selInputHeight = 24;
    var selButtonWidth = 24;
    var selItemHeight = 26;
    var defaultSelWidth = 0;
    var defaultSelItemHeight = 0;
    var boxAutoScroll = true;
    var valueField = "value";
    var labelField = "key";
    if ($select.attr("valueField")) {
        valueField = $select.attr("valueField")
    }
    if ($select.attr("labelField")) {
        labelField = $select.attr("labelField")
    }
    if ($select.attr("selItemHeight")) {
        selItemHeight = $select.attr("selItemHeight")
    }
    if ($select.attr("boxAutoScroll") == "false" || $select.attr("boxAutoScroll") == false) {
        boxAutoScroll = false
    }
    if (!splitMode) {
        var $parentThemeDom = $(window.top.document.getElementById("theme"));
        if ($parentThemeDom.attr("selInputHeight") != null) {
            selInputHeight = Number($parentThemeDom.attr("selInputHeight"))
        }
        if ($parentThemeDom.attr("selButtonWidth") != null) {
            selButtonWidth = Number($parentThemeDom.attr("selButtonWidth"))
        }
        if ($parentThemeDom.attr("defaultSelWidth") != null) {
            defaultSelWidth = Number($parentThemeDom.attr("defaultSelWidth"))
        }
        if ($parentThemeDom.attr("defaultSelItemHeight") != null) {
            selItemHeight = Number($parentThemeDom.attr("defaultSelItemHeight"))
        }
    } else {
        if ($select.attr("selInputHeight") != null) {
            selInputHeight = Number($select.attr("selInputHeight"))
        }
        if ($select.attr("selButtonWidth") != null) {
            selButtonWidth = Number($select.attr("selButtonWidth"))
        }
    }
    if (window.navigator.userAgent.indexOf("Windows") > -1) {
        windowsFlag = 1
    }
    selTrueWidth = $select.width();
    if (selTrueWidth == "0") {
        selTrueWidth = 116
    }
    var $selBtn;
    $selBtn = $("<input type='button' value=' ' class='selBtn'/>");
    $selBtn.attr("id", elm_id + "_button");
    var $loader = $("<div class='loader'></div>");
    $loader.text(uncompile(quiLanguage.select.loadingMessage));
    if ($select.attr("colNum") != null) {
        colNum = parseInt($select.attr("colNum"))
    }
    if ($select.attr("colWidth") != null) {
        colWidth = Number($select.attr("colWidth"))
    } else {
        colWidth = 100
    }
    var inputWidth = 97;
    if ($select.attr("selWidth") != null) {
        inputWidth = Number($select.attr("selWidth")) - selButtonWidth
    } else {
        if (defaultSelWidth != 0) {
            inputWidth = defaultSelWidth - selButtonWidth
        }
    }
    $input.width(inputWidth);
    $input.css("fontFamily", fontFamily);
    $input.css("fontSize", fontSize);
    $select.hide().before($mainCon);
    var $table = $('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"></td></tr></table>');
    $table.find("td").eq(0).append($input);
    $table.find("td").eq(1).append($selBtn);
    $mainCon.append($table);
    $mainCon.append($container);
    $mainCon.append($loader);
    $loader.hide();
    if ($select.attr("disabled") == "disabled" || $select.attr("disabled") == "true" || $select.attr("disabled") == true) {
        $selBtn.attr("disabled", true);
        $selBtn.addClass("selBtn_disabled");
        $input.addClass("selectbox_disabled")
    }
    $select.data("scrollY", 0);
    init();
    if ($select.attr("editable") != null) {
        if ($select.attr("editable") == "true") {
            edit = true
        } else {
            edit = false
        }
    }
    if (!edit) {
        $input.css({
            cursor: "pointer"
        });
        $input.click(function(event) {
            curInputId = $(event.target).attr("id");
            setHeight();
            if ($container.attr("hasfocus") == 0) {
                showMe()
            } else {
                hideMe()
            }
        }).keydown(function(event) {
            switch (event.keyCode) {
            case 38:
                event.preventDefault();
                moveSelect( - 1);
                break;
            case 40:
                event.preventDefault();
                moveSelect(1);
                break;
            case 13:
                event.preventDefault();
                $("li." + opt.hoverClass).trigger("click");
                break;
            case 27:
                hideMe();
                break
            }
        })
    } else {
        $input.css({
            cursor:
            "text"
        });
        $input.change(function() {
            $select.attr("editValue", $(this).val())
        })
    }
    $selBtn.click(function(event) {
        curButtonId = $(event.target).attr("id");
        setHeight();
        if ($container.attr("hasfocus") == 0) {
            showMe()
        } else {
            hideMe()
        }
    }).keydown(function(event) {
        switch (event.keyCode) {
        case 38:
            event.preventDefault();
            moveSelect( - 1);
            break;
        case 40:
            event.preventDefault();
            moveSelect(1);
            break;
        case 13:
            event.preventDefault();
            $("li." + opt.hoverClass).trigger("click");
            break;
        case 27:
            hideMe();
            break
        }
    });
    function setHeight() {
        $select.blur();
        var oldHeight;
        var $lis = $container.find("li").length;
        if (colNum == 1) {
            oldHeight = $lis * selItemHeight
        } else {
            if ($lis % colNum == 0) {
                oldHeight = $lis * selItemHeight / colNum
            } else {
                oldHeight = ($lis - $lis % colNum) * selItemHeight / colNum + selItemHeight
            }
        }
        $container.height(oldHeight);
        var usefulHeight = 200;
        usefulHeight = window.document.documentElement.clientHeight - ($mainCon.offset().top - $(window).scrollTop()) - 30;
        var trueWidth;
        if (!$select.attr("boxWidth")) {
            trueWidth = $container.width()
        }
        $container.css({
            overflowY: "auto",
            overflowX: "hidden"
        });
        if (colNum != 1) {
            $container.width((colWidth + 6) * colNum)
        } else {
            if (!$select.attr("boxWidth")) {
                $container.width(trueWidth)
            } else {
                $container.width(Number($select.attr("boxWidth")) + 1)
            }
        }
        var boxHeight = 0;
        if ($select.attr("boxHeight")) {
            boxHeight = Number($select.attr("boxHeight"))
        }
        if (boxHeight != 0) {
            $container.height(boxHeight);
            if ($select.attr("openDirection") == "top") {
                $container.css({
                    top: -boxHeight
                })
            } else {
                if ($select.attr("openDirection") == "bottom") {
                    $container.css({
                        top: selInputHeight
                    })
                } else {
                    if (usefulHeight < boxHeight) {
                        if ($mainCon.offset().top > boxHeight) {
                            $container.css({
                                top: -boxHeight
                            })
                        } else {
                            if (usefulHeight < 100 && $mainCon.offset().top > usefulHeight && $mainCon.offset().top > 100) {
                                $container.css({
                                    top: -boxHeight
                                })
                            } else {
                                $container.css({
                                    top: selInputHeight
                                })
                            }
                        }
                    } else {
                        $container.css({
                            top: selInputHeight
                        })
                    }
                }
            }
            if (boxAutoScroll == true) {
                if ($select.data("scrollY") + selItemHeight > boxHeight) {
                    $container.animate({
                        scrollTop: $select.data("scrollY")
                    },
                    600)
                }
            }
        } else {
            if ($select.attr("openDirection") == "top") {
                if ($mainCon.offset().top > oldHeight) {
                    $container.css({
                        top: -oldHeight
                    })
                } else {
                    $container.height($mainCon.offset().top);
                    $container.css({
                        top: -$mainCon.offset().top
                    })
                }
            } else {
                if ($select.attr("openDirection") == "bottom") {
                    if (usefulHeight < oldHeight) {
                        $container.css({
                            top: selInputHeight
                        });
                        $container.height(usefulHeight)
                    } else {
                        $container.css({
                            top: selInputHeight
                        })
                    }
                } else {
                    if (usefulHeight < oldHeight) {
                        if ($mainCon.offset().top > oldHeight) {
                            $container.css({
                                top: -oldHeight
                            })
                        } else {
                            if (usefulHeight < 100 && $mainCon.offset().top > usefulHeight && $mainCon.offset().top > 100) {
                                $container.height($mainCon.offset().top);
                                $container.css({
                                    top: -$mainCon.offset().top
                                })
                            } else {
                                $container.css({
                                    top: selInputHeight
                                });
                                $container.height(usefulHeight)
                            }
                        }
                    } else {
                        $container.css({
                            top: selInputHeight
                        })
                    }
                }
            }
            if (boxAutoScroll == true) {
                if ($select.data("scrollY") + selItemHeight > $container.height()) {
                    $container.animate({
                        scrollTop: $select.data("scrollY")
                    },
                    600)
                }
            }
        }
        if (!$select.attr("boxWidth")) {
            if ($container.width() < inputWidth + selButtonWidth) {
                $container.width(inputWidth + selButtonWidth)
            }
        }
    }
    function hideMe() {
        $container.attr("hasfocus", 0);
        $container.hide();
        $("body").unbind("mousedown", onBodyDown)
    }
    function showMe() {
        $container.attr("hasfocus", 1);
        depth++;
        $mainCon.css({
            zIndex: depth
        });
        $container.show();
        $("body").bind("mousedown", onBodyDown)
    }
    function onBodyDown(event) {
        if ($(event.target).attr("id") == curInputId || $(event.target).attr("id") == curButtonId || $(event.target).parent().attr("class") == "selectbox-wrapper" || $(event.target).attr("class") == "selectbox-wrapper" || $(event.target).parents(".selectbox-wrapper").length > 0) {} else {
            hideMe()
        }
    }
    function init() {
        $container.append(getSelectOptions($input.attr("id"))).hide();
        var width = $input.css("width")
    }
    function setupMainCon() {
        var $con = $("<div></div>");
        $con.addClass("mainCon");
        if ($select.attr("selAlign") == "right") {
            $con.css("float", "right")
        }
        return $con
    }
    function setupContainer(options) {
        var $container = $("<div></div>");
        $container.attr("id", elm_id + "_container");
        $container.addClass(options.containerClass);
        $container.css({});
        $container.attr("hasfocus", 0);
        return $container
    }
    function setupInput(options) {
        var input = document.createElement("input");
        var $input = $(input);
        $input.attr("id", elm_id + "_input");
        $input.attr("type", "text");
        $input.addClass(options.inputClass);
        if (broswerFlag == "IE8") {
            $input.addClass("selectboxFont")
        }
        $input.attr("autocomplete", "off");
        var seledit = false;
        if ($select.attr("editable") != null) {
            if ($select.attr("editable") == "true") {
                seledit = true
            } else {
                seledit = false
            }
        }
        if (!seledit) {
            if (broswerFlag == "firefox") {
                $input.attr("contenteditable", false)
            } else {
                $input.attr("readonly", "readonly")
            }
        } else {
            $input.attr("readonly", false)
        }
        $input.attr("tabIndex", $select.attr("tabindex"));
        if ($select.attr("disabled") == "disabled" || $select.attr("disabled") == "true" || $select.attr("disabled") == true) {
            $input.attr("disabled", true);
            $input.addClass("inputDisabled")
        }
        return $input
    }
    function moveSelect(step) {
        var lis = $("li", $container);
        if (!lis || lis.length == 0) {
            return false
        }
        active += step;
        if (active < 0) {
            active = lis.size()
        } else {
            if (active > lis.size()) {
                active = 0
            }
        }
        scroll(lis, active);
        lis.removeClass(opt.hoverClass);
        $(lis[active]).addClass(opt.hoverClass)
    }
    function scroll(list, active) {
        var el = $(list[active]).get(0);
        var list = $container.get(0);
        if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight
        } else {
            if (el.offsetTop < list.scrollTop) {
                list.scrollTop = el.offsetTop
            }
        }
    }
    function setCurrent() {
        var li = $("li." + opt.currentClass, $container).get(0);
        var ar = (li.id).split("_");
        var idLength = ar[0].length + ar[1].length + 2;
        var str = li.id;
        var el = str.substr(idLength, str.length);
        $select.val(el);
        $select.attr("relText", $(li).text());
        $select.attr("relValue", el);
        var str = $(li).html().trim();
        $input.val(str);
        if (edit == true) {
            $select.attr("editValue", $input.val())
        }
        $select.focus();
        return true
    }
    function getCurrentSelected() {
        return $select.val()
    }
    function getCurrentValue() {
        return $input.val()
    }
    function getSelectOptions(parentid) {
        var select_options = new Array();
        var ul = document.createElement("ul");
        var otpArr = [];
        var idxFix = 0;
        var rel;
        if ($select.attr("childId") != null) {
            rel = true
        }
        var isEditable;
        if ($select.attr("editable") != null) {
            if ($select.attr("editable") == "true") {
                isEditable = true
            } else {
                isEditable = false
            }
        }
        var ajaxMode = false;
        var urlStr = $select.attr("url");
        var dataStr = $select.attr("data");
        var dataObj3 = $select.data("data");
        if (urlStr != null || dataStr != null || dataObj3 != null || $select.attr("dataType") == "xml" || $select.find("option").length == 0) {
            ajaxMode = true
        }
        if (ajaxMode == true) {
            var dataRoot = "list";
            if ($select.attr("dataRoot")) {
                dataRoot = $select.attr("dataRoot")
            }
            var paramsStr = $select.attr("params");
            var paramsObj;
            if (paramsStr) {
                try {
                    paramsObj = JSON.parse(paramsStr)
                } catch(e) {
                    paramsObj = "";
                    alert(uncompile(quiLanguage.select.paramErrorMessage))
                }
            } else {
                paramsObj = ""
            }
            if (dataObj3) {
                createOptions(dataObj3, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
            } else {
                if (dataStr) {
                    var dataObj2;
                    try {
                        dataObj2 = JSON.parse(dataStr)
                    } catch(e) {
                        dataObj2 = "";
                        alert(uncompile(quiLanguage.select.dataErrorMessage))
                    }
                    $select.data("data", dataObj2);
                    createOptions(dataObj2, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                } else {
                    if (urlStr && $select.attr("dataType") == "xml") {
                        $.ajax({
                            url: $select.attr("url"),
                            data: paramsObj,
                            error: function() {
                                alert(uncompile(quiLanguage.select.urlErrorMessage))
                            },
                            success: function(xml) {
                                createOptions_xml(xml, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                            }
                        })
                    } else {
                        if (urlStr) {
                            var dataType = "json";
                            if ($select.attr("dataType")) {
                                dataType = $select.attr("dataType")
                            }
                            $.ajax({
                                url: $select.attr("url"),
                                dataType: dataType,
                                data: paramsObj,
                                error: function() {
                                    alert(uncompile(quiLanguage.select.urlErrorMessage))
                                },
                                success: function(data) {
                                    var myData;
                                    if (dataType == "text") {
                                        myData = eval("(" + data + ")")
                                    } else {
                                        myData = data
                                    }
                                    $select.data("data", myData);
                                    createOptions(myData, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                                }
                            })
                        } else {
                            if ($select.attr("dataType") == "xml") {
                                createOptions_xml(null, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                            } else {
                                if ($select.find("option").length == 0) {
                                    $select.data("data", {
                                        list: []
                                    });
                                    createOptions(null, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                                }
                            }
                        }
                    }
                }
            }
        } else {
            $select.find("option").each(function(idx) {
                otpArr.push($(this)[0]);
                var li = document.createElement("li");
                li.setAttribute("id", parentid + "_" + $(this).val());
                li.innerHTML = $(this).html();
                if ($(this).is(":selected")) {
                    if (isEditable == true) {
                        $input.val($(this).html());
                        $(li).addClass(opt.currentClass)
                    } else {
                        var str = $(this).html().trim();
                        $input.val(str);
                        $(li).addClass(opt.currentClass)
                    }
                }
                if (colNum != 1) {
                    $(li).addClass("li_left");
                    if (colWidth != null) {
                        $(li).width(colWidth)
                    } else {
                        var selWidth = Number(selTrueWidth);
                        $(li).width(selWidth)
                    }
                }
                ul.appendChild(li);
                $(li).mouseover(function(event) {
                    hasfocus = 1;
                    if (opt.debug) {
                        console.log("over on : " + this.id)
                    }
                    jQuery(event.target, $container).addClass(opt.hoverClass)
                }).mouseout(function(event) {
                    hasfocus = -1;
                    if (opt.debug) {
                        console.log("out on : " + this.id)
                    }
                    jQuery(event.target, $container).removeClass(opt.hoverClass)
                }).click(function(event) {
                    var fl = $("li." + opt.hoverClass, $container).get(0);
                    if (opt.debug) {
                        console.log("click on :" + this.id)
                    }
                    var myId = $(this).attr("id").split("_");
                    $("#" + myId[0] + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    setCurrent();
                    $select.get(0).blur();
                    hideMe();
                    try {
                        $select.trigger("change")
                    } catch(e) {}
                    $input.removeClass("tipColor");
                    $select.data("scrollY", idx * selItemHeight);
                    if (rel) {
                        ajaxLoad($select, $select.val())
                    }
                });
                if ($select.attr("editValue") != null) {
                    $input.val($select.attr("editValue"))
                }
            })
        }
        $select.find("optgroup").each(function() {
            var idx = getPosition($(this).children("option").eq(0)[0], otpArr);
            var groupValue = $(this).attr("label");
            $(ul).find("li").eq(idx + idxFix).before("<li class='group'>" + groupValue + "</li>");
            idxFix++
        });
        return ul
    }
    function createOptions_xml(data, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot, paramsObj) {
        var promptText = uncompile(quiLanguage.select.promptMessage);
        if ($select.attr("prompt") != null) {
            if ($select.attr("prompt") == "") {
                promptText = uncompile(quiLanguage.select.promptMessage)
            } else {
                promptText = $select.attr("prompt")
            }
        }
        var selectedIdx = -1;
        var selectedValue = "";
        if ($select.attr("selectedIdx")) {
            selectedIdx = Number($select.attr("selectedIdx"))
        }
        if ($select.attr("selectedValue")) {
            selectedValue = $select.attr("selectedValue")
        }
        $select.attr("length", 10);
        if ($select.attr("prompt") != null) {
            var li0 = document.createElement("li");
            li0.setAttribute("id", parentid + "_");
            li0.innerHTML = promptText;
            if (selectedIdx == -1 && selectedValue == "") {
                $(li0).addClass(opt.currentClass);
                $input.val(li0.innerHTML)
            }
            ul.appendChild(li0);
            $select[0].options.length = 0;
            $select[0].options[$select[0].options.length] = new Option(promptText, "");
            if (colNum != 1) {
                $(li0).addClass("li_left");
                if (colWidth != null) {
                    $(li0).width(colWidth)
                } else {
                    var selWidth = Number(selTrueWidth);
                    $(li0).width(selWidth)
                }
            }
            $(li0).mouseover(function(event) {
                hasfocus = 1;
                if (opt.debug) {
                    console.log("over on : " + this.id)
                }
                jQuery(event.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(event) {
                hasfocus = -1;
                if (opt.debug) {
                    console.log("out on : " + this.id)
                }
                jQuery(event.target, $container).removeClass(opt.hoverClass)
            }).click(function(event) {
                var fl = $("li." + opt.hoverClass, $container).get(0);
                if (opt.debug) {
                    console.log("click on :" + this.id)
                }
                var myId = $(this).attr("id").split("_");
                $("#" + myId[0] + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                $(this).addClass(opt.currentClass);
                setCurrent();
                $select.get(0).blur();
                hideMe();
                $select.trigger("change");
                $input.removeClass("tipColor");
                $select.data("scrollY", 0);
                if (rel) {
                    ajaxLoad($select, $select.data("selectedNode"))
                }
            })
        }
        if ($select.attr("prompt") == null) {
            if (selectedIdx == -1 && selectedValue == "") {
                selectedIdx = 0
            }
        }
        var findSelectValue = 0;
        $.each($(data).find(dataRoot),
        function(idx, item) {
            var li = document.createElement("li");
            li.setAttribute("id", parentid + "_" + $(item).attr(valueField));
            li.innerHTML = $(item).attr(labelField);
            $(li).data("itemData", item);
            $select[0].options[$select[0].options.length] = new Option($(item).attr(labelField), $(item).attr(valueField));
            if (selectedIdx == idx) {
                if (isEditable == true) {
                    $(li).addClass(opt.currentClass);
                    $input.val(li.innerHTML);
                    $select.val($(item).attr(labelField));
                    $select.attr("relText", $(item).attr(labelField));
                    $select.attr("editValue", $(item).attr(labelField))
                } else {
                    $(li).addClass(opt.currentClass);
                    $input.val(li.innerHTML.trim());
                    $select.val($(item).attr(valueField));
                    $select.attr("relText", $(item).attr(labelField));
                    $select.attr("relValue", $(item).attr(valueField))
                }
                $select.data("selectedNode", item);
                if ($select.attr("prompt") == null) {
                    $select.data("scrollY", idx * selItemHeight)
                } else {
                    $select.data("scrollY", (idx + 1) * selItemHeight)
                }
                if (rel) {
                    ajaxLoad($select, item)
                }
                findSelectValue = 1
            } else {
                if (selectedValue != "") {
                    if (selectedValue == $(item).attr(valueField).toString()) {
                        if (isEditable == true) {
                            $(li).addClass(opt.currentClass);
                            $input.val(li.innerHTML);
                            $select.val($(item).attr(valueField));
                            $select.attr("relText", $(item).attr(labelField));
                            $select.attr("editValue", $(item).attr(labelField))
                        } else {
                            $(li).addClass(opt.currentClass);
                            $input.val(li.innerHTML.trim());
                            $select.val($(item).attr(valueField));
                            $select.attr("relText", $(item).attr(labelField));
                            $select.attr("relValue", $(item).attr(valueField))
                        }
                        $select.data("selectedNode", item);
                        if ($select.attr("prompt") == null) {
                            $select.data("scrollY", idx * selItemHeight)
                        } else {
                            $select.data("scrollY", (idx + 1) * selItemHeight)
                        }
                        if (rel) {
                            ajaxLoad($select, item)
                        }
                        findSelectValue = 1
                    }
                }
            }
            if (colNum != 1) {
                $(li).addClass("li_left");
                if (colWidth != null) {
                    $(li).width(colWidth)
                } else {
                    var selWidth = Number(selTrueWidth);
                    $(li).width(selWidth)
                }
            }
            $(li).mouseover(function(event) {
                hasfocus = 1;
                if (opt.debug) {
                    console.log("over on : " + this.id)
                }
                jQuery(event.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(event) {
                hasfocus = -1;
                if (opt.debug) {
                    console.log("out on : " + this.id)
                }
                jQuery(event.target, $container).removeClass(opt.hoverClass)
            }).click(function(event) {
                var fl = $("li." + opt.hoverClass, $container).get(0);
                if (opt.debug) {
                    console.log("click on :" + this.id)
                }
                var myId = $(this).attr("id").split("_");
                $("#" + myId[0] + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                $(this).addClass(opt.currentClass);
                setCurrent();
                $select.data("selectedNode", $(this).data("itemData"));
                $select.get(0).blur();
                hideMe();
                $select.trigger("change");
                $input.removeClass("tipColor");
                if ($select.attr("prompt") == null) {
                    $select.data("scrollY", idx * selItemHeight)
                } else {
                    $select.data("scrollY", (idx + 1) * selItemHeight)
                }
                if (rel) {
                    ajaxLoad($select, $select.data("selectedNode"))
                }
            });
            ul.appendChild(li);
            if ($select.attr("editValue") != null) {
                $input.val($select.attr("editValue"))
            }
        });
        if (findSelectValue == 0) {
            if ($select.attr("prompt")) {
                $(ul).find("li").eq(0).addClass(opt.currentClass);
                $input.val($select.attr("prompt"))
            }
        }
        $select.attr("finished", "true");
        $select.trigger("ajaxInit")
    }
    function createOptions(data, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot, paramsObj) {
        var promptText = uncompile(quiLanguage.select.promptMessage);
        if ($select.attr("prompt") != null) {
            if ($select.attr("prompt") == "") {
                promptText = uncompile(quiLanguage.select.promptMessage)
            } else {
                promptText = $select.attr("prompt")
            }
        }
        var selectedIdx = -1;
        var selectedValue = "";
        if ($select.attr("selectedIdx")) {
            selectedIdx = Number($select.attr("selectedIdx"))
        }
        if ($select.attr("selectedValue")) {
            selectedValue = $select.attr("selectedValue")
        }
        $select.attr("length", 10);
        if ($select.attr("prompt") != null) {
            var li0 = document.createElement("li");
            li0.setAttribute("id", parentid + "_");
            li0.innerHTML = promptText;
            if (selectedIdx == -1 && selectedValue == "") {
                $(li0).addClass(opt.currentClass);
                $input.val(li0.innerHTML)
            }
            ul.appendChild(li0);
            $select[0].options.length = 0;
            $select[0].options[$select[0].options.length] = new Option(promptText, "");
            if (colNum != 1) {
                $(li0).addClass("li_left");
                if (colWidth != null) {
                    $(li0).width(colWidth)
                } else {
                    var selWidth = Number(selTrueWidth);
                    $(li0).width(selWidth)
                }
            }
            $(li0).mouseover(function(event) {
                hasfocus = 1;
                if (opt.debug) {
                    console.log("over on : " + this.id)
                }
                jQuery(event.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(event) {
                hasfocus = -1;
                if (opt.debug) {
                    console.log("out on : " + this.id)
                }
                jQuery(event.target, $container).removeClass(opt.hoverClass)
            }).click(function(event) {
                var fl = $("li." + opt.hoverClass, $container).get(0);
                if (opt.debug) {
                    console.log("click on :" + this.id)
                }
                var myId = $(this).attr("id").split("_");
                $("#" + myId[0] + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                $(this).addClass(opt.currentClass);
                setCurrent();
                $select.get(0).blur();
                hideMe();
                $select.trigger("change");
                $input.removeClass("tipColor");
                $select.data("scrollY", 0);
                if (rel) {
                    ajaxLoad($select, $select.val())
                }
            })
        }
        if ($select.attr("prompt") == null) {
            if (selectedIdx == -1 && selectedValue == "") {
                selectedIdx = 0
            }
        }
        var findSelectValue = 0;
        if (data) {
            var finalData;
            if (data[dataRoot]) {
                finalData = data[dataRoot]
            } else {
                finalData = data
            }
            $.each(finalData,
            function(idx, item) {
                var li = document.createElement("li");
                li.setAttribute("id", parentid + "_" + item[valueField]);
                li.innerHTML = item[labelField];
                $(li).data("itemData", item);
                $select[0].options[$select[0].options.length] = new Option(item[labelField], item[valueField]);
                if (selectedIdx == idx) {
                    if (isEditable == true) {
                        $(li).addClass(opt.currentClass);
                        $input.val(li.innerHTML);
                        $select.val(item[valueField]);
                        $select.attr("relText", item[labelField]);
                        $select.attr("editValue", item[labelField])
                    } else {
                        $(li).addClass(opt.currentClass);
                        $input.val(li.innerHTML.trim());
                        $select.val(item[valueField]);
                        $select.attr("relText", item[labelField]);
                        $select.attr("relValue", item[valueField])
                    }
                    $select.data("selectedNode", item);
                    if ($select.attr("prompt") == null) {
                        $select.data("scrollY", idx * selItemHeight)
                    } else {
                        $select.data("scrollY", (idx + 1) * selItemHeight)
                    }
                    if (rel) {
                        ajaxLoad($select, item[valueField])
                    }
                    findSelectValue = 1
                } else {
                    if (selectedValue != "") {
                        if (selectedValue == item[valueField].toString()) {
                            if (isEditable == true) {
                                $(li).addClass(opt.currentClass);
                                $input.val(li.innerHTML);
                                $select.val(item[valueField]);
                                $select.attr("relText", item[labelField]);
                                $select.attr("editValue", item[labelField])
                            } else {
                                $(li).addClass(opt.currentClass);
                                $input.val(li.innerHTML.trim());
                                $select.val(item[valueField]);
                                $select.attr("relText", item[labelField]);
                                $select.attr("relValue", item[valueField])
                            }
                            $select.data("selectedNode", item);
                            if ($select.attr("prompt") == null) {
                                $select.data("scrollY", idx * selItemHeight)
                            } else {
                                $select.data("scrollY", (idx + 1) * selItemHeight)
                            }
                            if (rel) {
                                ajaxLoad($select, item[valueField])
                            }
                            findSelectValue = 1
                        }
                    }
                }
                if (colNum != 1) {
                    $(li).addClass("li_left");
                    if (colWidth != null) {
                        $(li).width(colWidth)
                    } else {
                        var selWidth = Number(selTrueWidth);
                        $(li).width(selWidth)
                    }
                }
                $(li).mouseover(function(event) {
                    hasfocus = 1;
                    if (opt.debug) {
                        console.log("over on : " + this.id)
                    }
                    jQuery(event.target, $container).addClass(opt.hoverClass)
                }).mouseout(function(event) {
                    hasfocus = -1;
                    if (opt.debug) {
                        console.log("out on : " + this.id)
                    }
                    jQuery(event.target, $container).removeClass(opt.hoverClass)
                }).click(function(event) {
                    var fl = $("li." + opt.hoverClass, $container).get(0);
                    if (opt.debug) {
                        console.log("click on :" + this.id)
                    }
                    var myId = $(this).attr("id").split("_");
                    $("#" + myId[0] + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    setCurrent();
                    $select.data("selectedNode", $(this).data("itemData"));
                    $select.get(0).blur();
                    hideMe();
                    $select.trigger("change");
                    $input.removeClass("tipColor");
                    if ($select.attr("prompt") == null) {
                        $select.data("scrollY", idx * selItemHeight)
                    } else {
                        $select.data("scrollY", (idx + 1) * selItemHeight)
                    }
                    if (rel) {
                        ajaxLoad($select, $select.val())
                    }
                });
                ul.appendChild(li);
                if ($select.attr("editValue") != null) {
                    $input.val($select.attr("editValue"))
                }
            })
        }
        if (findSelectValue == 0) {
            if ($select.attr("prompt")) {
                $(ul).find("li").eq(0).addClass(opt.currentClass);
                $input.val($select.attr("prompt"))
            }
        }
        $select.attr("finished", "true");
        $select.trigger("ajaxInit")
    }
    function ajaxLoad(obj, value) {
        var child = obj.attr("childId");
        var $childLoader = $("#" + child).prev().find("div[class=loader]");
        $childLoader.show();
        window.setTimeout(function() {
            loadLater(obj, value)
        },
        200)
    }
    function loadLater(obj, value) {
        var dataPath;
        if (obj.attr("childDataType") == "xml") {
            var child = obj.attr("childId");
            var $childLoader = $("#" + child).prev().find("div[class=loader]");
            $childLoader.hide();
            var $childUL = $("#" + child).prev().find("ul");
            var childOptId = $("#" + child).prev().find(">div").attr("id").split("_")[0];
            var $childInput = $("#" + child).prev().find("input:text");
            var childSel = $("#" + child)[0];
            var $childSel = $("#" + child);
            $childUL.html("");
            childSel.options.length = 0;
            $("#" + child).data("scrollY", 0);
            var dataRoot = "list";
            if ($("#" + child).attr("dataRoot")) {
                dataRoot = $("#" + child).attr("dataRoot")
            }
            var labelField = "key";
            if ($("#" + child).attr("labelField")) {
                labelField = $("#" + child).attr("labelField")
            }
            var valueField = "value";
            if ($("#" + child).attr("valueField")) {
                valueField = $("#" + child).attr("valueField")
            }
            if ($("#" + child).attr("prompt")) {
                var li0 = document.createElement("li");
                var text0 = $("#" + child).attr("prompt");
                $(li0).text(text0);
                $(li0).attr("relValue", "");
                $childUL.append($(li0));
                childSel.options[childSel.options.length] = new Option(text0, "");
                $(li0).mouseover(function(event) {
                    jQuery(event.target).addClass(opt.hoverClass)
                });
                $(li0).mouseout(function(event) {
                    jQuery(event.target).removeClass(opt.hoverClass)
                });
                $(li0).mousedown(function(event) {
                    $("#" + childOptId + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    $("#" + child).attr("relText", $(this).text());
                    $("#" + child).attr("relValue", $(this).attr("relValue"));
                    $("#" + child).val($(this).attr("relValue"));
                    $childInput.val($(this).html());
                    $("#" + child).prev().find(">div").hide();
                    $("#" + child).prev().find(">div").attr("hasfocus", 0);
                    $("#" + child).focus();
                    $("#" + child).data("scrollY", 0);
                    if ($("#" + child).attr("onchange") != null) {}
                    try {
                        $("#" + child).trigger("change")
                    } catch(e) {}
                })
            }
            var selectedIdx = -1;
            var selectedValue = "";
            var isEditable;
            var rel;
            if ($childSel.attr("childId") != null) {
                rel = true
            }
            if ($childSel.attr("selectedIdx")) {
                selectedIdx = Number($childSel.attr("selectedIdx"))
            }
            if ($childSel.attr("selectedValue")) {
                selectedValue = $childSel.attr("selectedValue")
            }
            if ($childSel.attr("editable") != null) {
                if ($childSel.attr("editable") == "true") {
                    isEditable = true
                } else {
                    isEditable = false
                }
            }
            var findSelectValue = 0;
            $.each($(value).find(dataRoot),
            function(idx, item) {
                var text = $(item).attr(labelField);
                var value = $(item).attr(valueField);
                var li = document.createElement("li");
                $(li).text(text);
                $(li).attr("relValue", value);
                $(li).data("itemData", item);
                $childUL.append($(li));
                childSel.options[childSel.options.length] = new Option(text, value);
                if (selectedIdx == idx) {
                    if (isEditable == true) {
                        $(li).addClass(opt.currentClass);
                        $childInput.val(li.innerHTML);
                        $childSel.val($(item).attr(valueField));
                        $childSel.attr("relText", $(item).attr(labelField));
                        $childSel.attr("editValue", $(item).attr(labelField))
                    } else {
                        $(li).addClass(opt.currentClass);
                        $childInput.val(li.innerHTML.trim());
                        $childSel.val($(item).attr(valueField));
                        $childSel.attr("relText", $(item).attr(labelField));
                        $childSel.attr("relValue", $(item).attr(valueField))
                    }
                    $childSel.data("selectedNode", item);
                    if ($childSel.attr("prompt") == null) {
                        $childSel.data("scrollY", idx * selItemHeight)
                    } else {
                        $childSel.data("scrollY", (idx + 1) * selItemHeight)
                    }
                    if (rel) {
                        ajaxLoad($childSel, item)
                    }
                    findSelectValue = 1
                } else {
                    if (selectedValue != "") {
                        if (selectedValue == $(item).attr(valueField).toString()) {
                            if (isEditable == true) {
                                $(li).addClass(opt.currentClass);
                                $childInput.val(li.innerHTML);
                                $childSel.val($(item).attr(valueField));
                                $childSel.attr("relText", $(item).attr(labelField));
                                $childSel.attr("editValue", $(item).attr(labelField))
                            } else {
                                $(li).addClass(opt.currentClass);
                                $childInput.val(li.innerHTML.trim());
                                $childSel.val($(item).attr(valueField));
                                $childSel.attr("relText", $(item).attr(labelField));
                                $childSel.attr("relValue", $(item).attr(valueField))
                            }
                            $childSel.data("selectedNode", item);
                            if ($childSel.attr("prompt") == null) {
                                $childSel.data("scrollY", idx * selItemHeight)
                            } else {
                                $childSel.data("scrollY", (idx + 1) * selItemHeight)
                            }
                            if (rel) {
                                ajaxLoad($childSel, item)
                            }
                            findSelectValue = 1
                        }
                    }
                }
                $(li).mouseover(function(event) {
                    jQuery(event.target).addClass(opt.hoverClass)
                });
                $(li).mouseout(function(event) {
                    jQuery(event.target).removeClass(opt.hoverClass)
                });
                $(li).mousedown(function(event) {
                    $("#" + childOptId + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    $("#" + child).attr("relText", $(this).text());
                    $("#" + child).attr("relValue", $(this).attr("relValue"));
                    $("#" + child).data("selectedNode", $(this).data("itemData"));
                    $("#" + child).val($(this).attr("relValue"));
                    $childInput.val($(this).html());
                    $("#" + child).prev().find(">div").hide();
                    $("#" + child).prev().find(">div").attr("hasfocus", 0);
                    $("#" + child).focus();
                    if ($("#" + child).attr("prompt") == null) {
                        $("#" + child).data("scrollY", idx * selItemHeight)
                    } else {
                        $("#" + child).data("scrollY", (idx + 1) * selItemHeight)
                    }
                    if ($("#" + child).attr("onchange") != null) {}
                    try {
                        $("#" + child).trigger("change")
                    } catch(e) {}
                    if (rel) {
                        ajaxLoad($("#" + child), $("#" + child).data("selectedNode"))
                    }
                })
            });
            if ($(value).find(dataRoot).length == 0) {
                var li = document.createElement("li");
                $(li).text(uncompile(quiLanguage.select.ldError));
                $childUL.append($(li))
            }
            if (selectedIdx == -1 && selectedValue == "") {
                var $firstLI = $childUL.find("li").eq(0);
                $childInput.val($firstLI.text());
                $firstLI.addClass(opt.currentClass);
                $("#" + child).val($firstLI.attr("relValue"));
                $("#" + child).attr("relValue", $firstLI.attr("relValue"));
                $("#" + child).attr("relText", $firstLI.text());
                $("#" + child).data("selectedNode", $firstLI.data("itemData"));
                $("#" + child).data("scrollY", 0)
            }
            if (findSelectValue == 0) {
                if ($("#" + child).attr("prompt")) {
                    $childUL.find("li").eq(0).addClass(opt.currentClass);
                    $childInput.val($("#" + child).attr("prompt"))
                }
            }
            $("#" + child).trigger("ajaxInit")
        } else {
            if (obj.attr("childDataType") == null) {
                dataPath = obj.attr("childDataPath") + value
            } else {
                if (obj.attr("childActionType") == "local") {
                    dataPath = obj.attr("childDataPath") + value + "." + obj.attr("childDataType")
                } else {
                    dataPath = obj.attr("childDataPath") + value
                }
            }
            $.getJSON(dataPath,
            function(data) {
                var child_j = obj.attr("childId");
                var $childLoader_j = $("#" + child_j).prev().find("div[class=loader]");
                $childLoader_j.hide();
                var $childUL_j = $("#" + child_j).prev().find("ul");
                var childOptId_j = $("#" + child_j).prev().find(">div").attr("id").split("_")[0];
                var $childInput_j = $("#" + child_j).prev().find("input:text");
                var childSel_j = $("#" + child_j)[0];
                var $childSel_j = $("#" + child_j);
                $childUL_j.html("");
                childSel_j.options.length = 0;
                var dataRoot = "list";
                if ($("#" + child_j).attr("dataRoot")) {
                    dataRoot = $("#" + child_j).attr("dataRoot")
                }
                var labelField = "key";
                if ($("#" + child_j).attr("labelField")) {
                    labelField = $("#" + child_j).attr("labelField")
                }
                var valueField = "value";
                if ($("#" + child_j).attr("valueField")) {
                    valueField = $("#" + child_j).attr("valueField")
                }
                if ($("#" + child_j).attr("prompt")) {
                    var li_j0 = document.createElement("li");
                    var text_j0 = $("#" + child_j).attr("prompt");
                    $(li_j0).text(text_j0);
                    $(li_j0).attr("relValue", "");
                    $childUL_j.append($(li_j0));
                    childSel_j.options[childSel_j.options.length] = new Option(text_j0, "");
                    $(li_j0).mouseover(function(event) {
                        jQuery(event.target).addClass(opt.hoverClass)
                    });
                    $(li_j0).mouseout(function(event) {
                        jQuery(event.target).removeClass(opt.hoverClass)
                    });
                    $(li_j0).mousedown(function(event) {
                        $("#" + childOptId_j + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                        $(this).addClass(opt.currentClass);
                        $("#" + child_j).attr("relText", $(this).text());
                        $("#" + child_j).attr("relValue", $(this).attr("relValue"));
                        $("#" + child_j).val($(this).attr("relValue"));
                        $childInput_j.val($(this).html());
                        $("#" + child_j).prev().find(">div").hide();
                        $("#" + child_j).prev().find(">div").attr("hasfocus", 0);
                        $("#" + child_j).focus();
                        $("#" + child_j).data("scrollY", 0);
                        if ($("#" + child_j).attr("onchange") != null) {}
                        try {
                            $("#" + child_j).trigger("change")
                        } catch(e) {}
                    })
                }
                var selectedIdx_j = -1;
                var selectedValue_j = "";
                var isEditable_j;
                var rel_j;
                if ($childSel_j.attr("childId") != null) {
                    rel_j = true
                }
                if ($childSel_j.attr("selectedIdx")) {
                    selectedIdx_j = Number($childSel_j.attr("selectedIdx"))
                }
                if ($childSel_j.attr("selectedValue")) {
                    selectedValue_j = $childSel_j.attr("selectedValue")
                }
                if ($childSel_j.attr("editable") != null) {
                    if ($childSel_j.attr("editable") == "true") {
                        isEditable_j = true
                    } else {
                        isEditable_j = false
                    }
                }
                var findSelectValue_j = 0;
                var finalData;
                if (data[dataRoot]) {
                    finalData = data[dataRoot]
                } else {
                    finalData = data
                }
                $.each(finalData,
                function(idx, item) {
                    var text_j = item[labelField];
                    var value_j = item[valueField];
                    var li_j = document.createElement("li");
                    $(li_j).text(text_j);
                    $(li_j).attr("relValue", value_j);
                    $(li_j).data("itemData", item);
                    $childUL_j.append($(li_j));
                    childSel_j.options[childSel_j.options.length] = new Option(text_j, value_j);
                    if (selectedIdx_j == idx) {
                        if (isEditable_j == true) {
                            $(li_j).addClass(opt.currentClass);
                            $childInput_j.val(li_j.innerHTML);
                            $childSel_j.val(item[valueField]);
                            $childSel_j.attr("relText", item[labelField]);
                            $childSel_j.attr("editValue", item[labelField])
                        } else {
                            $(li_j).addClass(opt.currentClass);
                            $childInput_j.val(li_j.innerHTML.trim());
                            $childSel_j.val(item[valueField]);
                            $childSel_j.attr("relText", item[labelField]);
                            $childSel_j.attr("relValue", item[valueField])
                        }
                        $childSel_j.data("selectedNode", item);
                        if ($childSel_j.attr("prompt") == null) {
                            $childSel_j.data("scrollY", idx * selItemHeight)
                        } else {
                            $childSel_j.data("scrollY", (idx + 1) * selItemHeight)
                        }
                        if (rel) {
                            ajaxLoad($childSel_j, item[valueField])
                        }
                        findSelectValue_j = 1
                    } else {
                        if (selectedValue_j != "") {
                            if (selectedValue_j == item[valueField].toString()) {
                                if (isEditable_j == true) {
                                    $(li_j).addClass(opt.currentClass);
                                    $childInput_j.val(li_j.innerHTML);
                                    $childSel_j.val(item[valueField]);
                                    $childSel_j.attr("relText", item[labelField]);
                                    $childSel_j.attr("editValue", item[labelField])
                                } else {
                                    $(li_j).addClass(opt.currentClass);
                                    $childInput_j.val(li_j.innerHTML.trim());
                                    $childSel_j.val(item[valueField]);
                                    $childSel_j.attr("relText", item[labelField]);
                                    $childSel_j.attr("relValue", item[valueField])
                                }
                                $childSel_j.data("selectedNode", item);
                                if ($childSel_j.attr("prompt") == null) {
                                    $childSel_j.data("scrollY", idx * selItemHeight)
                                } else {
                                    $childSel_j.data("scrollY", (idx + 1) * selItemHeight)
                                }
                                if (rel_j) {
                                    ajaxLoad($childSel_j, item[valueField])
                                }
                                findSelectValue_j = 1
                            }
                        }
                    }
                    $(li_j).mouseover(function(event) {
                        jQuery(event.target).addClass(opt.hoverClass)
                    });
                    $(li_j).mouseout(function(event) {
                        jQuery(event.target).removeClass(opt.hoverClass)
                    });
                    $(li_j).mousedown(function(event) {
                        $("#" + childOptId_j + "_container li." + opt.currentClass).removeClass(opt.currentClass);
                        $(this).addClass(opt.currentClass);
                        $("#" + child_j).attr("relText", $(this).text());
                        $("#" + child_j).attr("relValue", $(this).attr("relValue"));
                        $("#" + child_j).data("selectedNode", $(this).data("itemData"));
                        $("#" + child_j).val($(this).attr("relValue"));
                        $childInput_j.val($(this).html());
                        $("#" + child_j).prev().find(">div").hide();
                        $("#" + child_j).prev().find(">div").attr("hasfocus", 0);
                        $("#" + child_j).focus();
                        if ($("#" + child_j).attr("onchange") != null) {}
                        try {
                            $("#" + child_j).trigger("change")
                        } catch(e) {}
                        if ($childSel_j.attr("prompt") == null) {
                            $("#" + child_j).data("scrollY", idx * selItemHeight)
                        } else {
                            $("#" + child_j).data("scrollY", (idx + 1) * selItemHeight)
                        }
                        if (rel_j) {
                            ajaxLoad($("#" + child_j), $("#" + child_j).val())
                        }
                    })
                });
                if (data.length == 0) {
                    var li_j = document.createElement("li");
                    $(li_j).text(uncompile(quiLanguage.select.noItemMessage));
                    $childUL_j.append($(li_j))
                }
                if (selectedIdx_j == -1 && selectedValue_j == "") {
                    var $firstLI_j = $childUL_j.find("li").eq(0);
                    $childInput_j.val($firstLI_j.text());
                    $firstLI_j.addClass(opt.currentClass);
                    $("#" + child_j).val($firstLI_j.attr("relValue"));
                    $("#" + child_j).attr("relValue", $firstLI_j.attr("relValue"));
                    $("#" + child_j).attr("relText", $firstLI_j.text());
                    $("#" + child_j).data("selectedNode", $firstLI_j.data("itemData"));
                    $("#" + child_j).data("scrollY", 0)
                }
                $("#" + child_j).trigger("ajaxInit");
                if (findSelectValue_j == 0) {
                    if ($("#" + child_j).attr("prompt")) {
                        $childUL_j.find("li").eq(0).addClass(opt.currentClass);
                        $childInput_j.val($("#" + child_j).attr("prompt"))
                    }
                }
            })
        }
    }
};
var tipDirection = "down";
function enableTooltips(e) {
    var b, a, c, d;
    if (!document.getElementById || !document.getElementsByTagName) {
        return
    }
    AddCss();
    d = document.createElement("span");
    d.id = "btc";
    d.setAttribute("id", "btc");
    d.style.position = "absolute";
    d.style.zIndex = 9999;
    $("body").append($(d))
}
function _getStrLength(c) {
    var b;
    var a;
    for (b = 0, a = 0; b < c.length; b++) {
        if (c.charCodeAt(b) < 128) {
            a++
        } else {
            a = a + 2
        }
    }
    return a
}
function addTooltip(f) {
    var g, d, a, e, c;
    d = f.getAttribute("title");
    if (d == " ") {
        f.removeAttribute("title");
        f.onmouseover = null;
        f.onmouseout = null;
        f.onmousemove = null;
        return
    }
    if (d != null && d.length != 0) {
        f.removeAttribute("title");
        if (_getStrLength(d) > 37 || _getStrLength(d) == 37) {
            g = CreateEl("span", "tooltip")
        } else {
            if (_getStrLength(d) > 10 && _getStrLength(d) < 37) {
                g = CreateEl("span", "tooltip_mid")
            } else {
                g = CreateEl("span", "tooltip_min")
            }
        }
        e = CreateEl("span", "top");
        $(e).html(d);
        g.appendChild(e);
        a = CreateEl("b", "bottom");
        g.appendChild(a);
        setOpacity(g);
        f.tooltip = g;
        f.onmouseover = showTooltip;
        f.onmouseout = hideTooltip;
        f.onmousemove = Locate2
    }
}
function hideTip(a) {
    var b = document.getElementById("btc");
    if (b.childNodes.length > 0) {
        b.removeChild(b.firstChild)
    }
}
function showTooltip(a) {
    document.getElementById("btc").appendChild(this.tooltip);
    Locate(a)
}
function hideTooltip() {
    var a = document.getElementById("btc");
    if (a.childNodes.length > 0) {
        a.removeChild(a.firstChild)
    }
}
function setOpacity(a) {
    a.style.filter = "alpha(opacity:95)";
    a.style.KHTMLOpacity = "0.95";
    a.style.MozOpacity = "0.95";
    a.style.opacity = "0.95"
}
function CreateEl(b, d) {
    var a = document.createElement(b);
    a.className = d;
    a.style.display = "block";
    return (a)
}
function AddCss() {}
function Locate(g) {
    var a = 0,
    i = 0;
    if (g == null) {
        g = window.event
    }
    if (g.pageX || g.pageY) {
        a = g.pageX;
        i = g.pageY
    } else {
        if (g.clientX || g.clientY) {
            if (document.documentElement.scrollTop) {
                a = g.clientX + document.documentElement.scrollLeft;
                i = g.clientY + document.documentElement.scrollTop
            } else {
                a = g.clientX + document.body.scrollLeft;
                i = g.clientY + document.body.scrollTop
            }
        }
    }
    var h = window.document.documentElement.clientWidth;
    var c = window.document.documentElement.clientHeight;
    var b = $("#btc").width();
    var f = $("#btc").height();
    var d = $("#btc >span")[0].className;
    if (h - b < a - 20) {
        document.getElementById("btc").style.left = (h - b) + "px";
        if (d == "tooltip") {
            $("#btc >span")[0].className = "tooltip_s"
        } else {
            if (d == "tooltip_min") {
                $("#btc >span")[0].className = "tooltip_min_s"
            } else {
                if (d == "tooltip_mid") {
                    $("#btc >span")[0].className = "tooltip_mid_s"
                }
            }
        }
    } else {
        document.getElementById("btc").style.left = (a - 20) + "px"
    }
    if ($(window).scrollTop() + c - f < i) {
        document.getElementById("btc").style.top = (i - f - 10) + "px";
        if (d == "tooltip") {
            $("#btc >span")[0].className = "tooltip_r"
        } else {
            if (d == "tooltip_min") {
                $("#btc >span")[0].className = "tooltip_min_r"
            } else {
                if (d == "tooltip_mid") {
                    $("#btc >span")[0].className = "tooltip_mid_r"
                }
            }
        }
        tipDirection = "up"
    } else {
        document.getElementById("btc").style.top = (i + 10) + "px";
        if (d == "tooltip_r") {
            $("#btc >span")[0].className = "tooltip"
        } else {
            if (d == "tooltip_min_r") {
                $("#btc >span")[0].className = "tooltip_min"
            } else {
                if (d == "tooltip_mid_r") {
                    $("#btc >span")[0].className = "tooltip_mid"
                }
            }
        }
        tipDirection = "down"
    }
}
function Locate2(f) {
    var a = 0,
    h = 0;
    if (f == null) {
        f = window.event
    }
    if (f.pageX || f.pageY) {
        a = f.pageX;
        h = f.pageY
    } else {
        if (f.clientX || f.clientY) {
            if (document.documentElement.scrollTop) {
                a = f.clientX + document.documentElement.scrollLeft;
                h = f.clientY + document.documentElement.scrollTop
            } else {
                a = f.clientX + document.body.scrollLeft;
                h = f.clientY + document.body.scrollTop
            }
        }
    }
    var g = window.document.documentElement.clientWidth;
    var c = window.document.documentElement.clientHeight;
    var b = $("#btc").width();
    var d = $("#btc").height();
    if (g - b < a - 20) {
        document.getElementById("btc").style.left = (g - b) + "px"
    } else {
        document.getElementById("btc").style.left = (a - 20) + "px"
    }
    if (tipDirection == "up") {
        document.getElementById("btc").style.top = (h - d - 10) + "px"
    } else {
        document.getElementById("btc").style.top = (h + 10) + "px"
    }
} (function(c) {
    var h, i;
    var d = 0;
    var a = 32;
    var e;
    c.fn.TextAreaResizer = function() {
        return this.each(function() {
            h = c(this).addClass("processed"),
            i = null;
            c(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append(c('<div class="grippie"></div>').bind("mousedown", {
                el: this
            },
            b)).wrap('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td></tr></table>');
            var m = c("div.grippie", c(this).parent())
        })
    };
    function b(m) {
        h = c(m.data.el);
        h.blur();
        d = l(m).y;
        i = h.height() - d;
        h.css("opacity", 0.25);
        c(document).mousemove(g).mouseup(f);
        return false
    }
    function g(o) {
        var m = l(o).y;
        var n = i + m;
        if (d >= (m)) {
            n -= 5
        }
        d = m;
        n = Math.max(a, n);
        h.height(n + "px");
        if (n < a) {
            f(o)
        }
        return false
    }
    function f(m) {
        c(document).unbind("mousemove", g).unbind("mouseup", f);
        h.css("opacity", 1);
        h.focus();
        h = null;
        i = null;
        d = 0
    }
    function l(m) {
        return {
            x: m.clientX + document.documentElement.scrollLeft,
            y: m.clientY + document.documentElement.scrollTop
        }
    }
})(jQuery); (function(a) {
    a.fn.watermark = function(b, c) {
        return this.each(function() {
            var e = a(this),
            d;
            e.focus(function() {
                d && !(d = 0) && e.removeClass(b).data("w", 0).val("")
            }).blur(function() { ! e.val() && (d = 1) && e.addClass(b).data("w", 1).val(c)
            }).closest("form").submit(function() {
                d && e.val("")
            });
            e.blur()
        })
    };
    a.fn.removeWatermark = function() {
        return this.each(function() {
            a(this).data("w") && a(this).val("")
        })
    }
})(jQuery);
if (jQuery) { (function(a) {
        a.cursorMessageData = {};
        a(window).ready(function(b) {
            if (a("#cursorMessageDiv").length == 0) {
                a("body").append('<div id="cursorMessageDiv">&nbsp;</div>');
                a("#cursorMessageDiv").hide()
            }
            a("body").mousemove(function(c) {
                a.cursorMessageData.mouseX = c.pageX;
                a.cursorMessageData.mouseY = c.pageY;
                currentMouseX = c.pageX;
                currentMouseY = c.pageY;
                if (a.cursorMessageData.options != undefined) {
                    a._showCursorMessage()
                }
            })
        });
        a.extend({
            cursorMessage: function(c, b) {
                if (b == undefined) {
                    b = {}
                }
                if (b.offsetX == undefined) {
                    b.offsetX = 5
                }
                if (b.offsetY == undefined) {
                    b.offsetY = 5
                }
                if (b.hideTimeout == undefined) {
                    b.hideTimeout = 3000
                }
                a("#cursorMessageDiv").html(c).show();
                if (jQuery.cursorMessageData.hideTimeoutId != undefined) {
                    clearTimeout(jQuery.cursorMessageData.hideTimeoutId)
                }
                if (b.hideTimeout > 0) {
                    jQuery.cursorMessageData.hideTimeoutId = setTimeout(a.hideCursorMessage, b.hideTimeout)
                }
                jQuery.cursorMessageData.options = b;
                a._showCursorMessage()
            },
            hideCursorMessage: function() {
                a("#cursorMessageDiv").hide()
            },
            _showCursorMessage: function() {
                a("#cursorMessageDiv").css({
                    top: (a.cursorMessageData.mouseY + a.cursorMessageData.options.offsetY) + "px",
                    left: (a.cursorMessageData.mouseX + a.cursorMessageData.options.offsetX)
                })
            }
        })
    })(jQuery)
}
jQuery.fn.caps = function(a) {
    return this.keypress(function(f) {
        var b = f.which ? f.which: (f.keyCode ? f.keyCode: -1);
        var d = f.shiftKey ? f.shiftKey: (f.modifiers ? !!(f.modifiers & 4) : false);
        var g = ((b >= 65 && b <= 90) && !d) || ((b >= 97 && b <= 122) && d);
        a.call(this, g)
    })
};
function iframeHeight(b) {
    var a = document.getElementById(b);
    a.style.height = a.contentWindow.document.body.scrollHeight + "px"
} (function(d) {
    d.fn.clearableTextField = function() {
        if (d(this).length > 0) {
            d(this).bind("keyup change paste cut", e);
            for (var f = 0; f < d(this).length; f++) {
                c(d(d(this)[f]))
            }
        }
    };
    function e() {
        c(d(this))
    }
    function c(f) {
        if (f.val().length > 0) {
            b(f)
        } else {
            a(f)
        }
    }
    function b(i) {
        if (!i.next().hasClass("text_clear_button")) {
            i.after("<div class='text_clear_button'></div>");
            var f = i.next();
            var g = f.outerHeight(),
            m = f.outerHeight();
            i.css("padding-right", parseInt(i.css("padding-right")) + g + 1);
            i.width(i.width() - g - 1);
            var o = i.position();
            var l = {};
            l.left = o.left + i.outerWidth(false) - (g + 2);
            var n = Math.round((i.outerHeight(true) - m) / 2);
            l.top = o.top + d("#scrollContent").scrollTop() + n;
            f.css(l);
            f.click(function() {
                i.val("");
                c(i)
            })
        }
    }
    function a(h) {
        var f = h.next();
        if (f.hasClass("text_clear_button")) {
            f.remove();
            var g = f.width();
            h.css("padding-right", parseInt(h.css("padding-right")) - g - 1);
            h.width(h.width() + g + 1)
        }
    }
})(jQuery); (function(a) {
    a.fn.maxlength = function(b) {
        var c = jQuery.extend({
            events: [],
            maxCharacters: 10,
            status: true,
            statusClass: "maxNum",
            statusText: uncompile(quiLanguage.maxlength.statusText),
            notificationClass: "notification",
            showAlert: false,
            alertText: uncompile(quiLanguage.maxlength.alertText),
            slider: true
        },
        b);
        a.merge(c.events, ["keyup"]);
        return this.each(function() {
            var g = a(this);
            var l = a(this).val().length;
            function d() {
                var m = c.maxCharacters - l;
                if (m < 0) {
                    m = 0
                }
                g.next("div").html(c.statusText + " :" + m)
            }
            function e() {
                var m = true;
                if (l >= c.maxCharacters) {
                    m = false;
                    g.addClass(c.notificationClass);
                    g.val(g.val().substr(0, c.maxCharacters));
                    i()
                } else {
                    if (g.hasClass(c.notificationClass)) {
                        g.removeClass(c.notificationClass)
                    }
                }
                if (c.status) {
                    d()
                }
            }
            function i() {
                if (c.showAlert) {
                    alert(c.alertText)
                }
            }
            function f() {
                var m = false;
                if (g.is("textarea")) {
                    m = true
                } else {
                    if (g.filter("input[type=text]")) {
                        m = true
                    } else {
                        if (g.filter("input[type=password]")) {
                            m = true
                        }
                    }
                }
                return m
            }
            if (!f()) {
                return false
            }
            a.each(c.events,
            function(m, o) {
                g.bind(o,
                function(n) {
                    l = g.val().length;
                    e()
                })
            });
            if (c.status) {
                g.after(a("<div/>").addClass(c.statusClass).html("-"));
                d()
            }
            if (!c.status) {
                var h = g.next("div." + c.statusClass);
                if (h) {
                    h.remove()
                }
            }
            if (c.slider) {
                g.next().hide();
                g.focus(function() {
                    g.next().slideDown("fast")
                });
                g.blur(function() {
                    g.next().slideUp("fast")
                })
            }
        })
    }
})(jQuery);
var colsDefault = 0;
var rowsDefault = 5;
function setDefaultValues(a) {
    colsDefault = a.cols;
    rowsDefault = $(a).attr("rows")
}
function bindEvents(a) {
    a.onkeyup = function() {
        grow(a)
    }
}
function grow(d) {
    var c = 0;
    var a = d.value.split("\n");
    for (var b = a.length - 1; b >= 0; --b) {
        c += Math.floor((a[b].length / colsDefault) + 1)
    }
    if (c >= rowsDefault) {
        d.rows = c + 1
    } else {
        d.rows = rowsDefault
    }
}
jQuery.fn.autoGrow = function() {
    return this.each(function() {
        setDefaultValues(this);
        bindEvents(this)
    })
}; (function(b) {
    var a = new
    function() {
        this.countRegexp = function(d, e) {
            var c = d.match(e);
            return c ? c.length: 0
        };
        this.getStrength = function(i, e) {
            var c = i.length;
            if (c < e) {
                return 0
            }
            var g = this.countRegexp(i, /\d/g),
            l = this.countRegexp(i, /[a-z]/g),
            f = this.countRegexp(i, /[A-Z]/g),
            d = c - g - l - f;
            if (g == c || l == c || f == c || d == c) {
                return 1
            }
            var h = 0;
            if (g) {
                h += 2
            }
            if (l) {
                h += f ? 4 : 3
            }
            if (f) {
                h += l ? 4 : 3
            }
            if (d) {
                h += 5
            }
            if (c > 10) {
                h += 1
            }
            return h
        };
        this.getStrengthLevel = function(e, c) {
            var d = this.getStrength(e, c);
            switch (true) {
            case(d <= 0) : return 1;
                break;
            case (d > 0 && d <= 4) : return 2;
                break;
            case (d > 4 && d <= 8) : return 3;
                break;
            case (d > 8 && d <= 12) : return 4;
                break;
            case (d > 12) : return 5;
                break
            }
            return 1
        }
    };
    b.fn.password_strength = function(c) {
        var d = b.extend({
            container: null,
            minLength: 6,
            texts: {
                1 : uncompile(quiLanguage.passStrength.text1),
                2 : uncompile(quiLanguage.passStrength.text2),
                3 : uncompile(quiLanguage.passStrength.text3),
                4 : uncompile(quiLanguage.passStrength.text4),
                5 : uncompile(quiLanguage.passStrength.text5)
            }
        },
        c);
        return this.each(function() {
            if (d.container) {
                var e = b(d.container)
            } else {
                var e = b("<span/>").attr("class", "password_strength");
                b(this).after(e)
            }
            b(this).keyup(function() {
                var g = b(this).val();
                if (g.length > 0) {
                    var h = a.getStrengthLevel(g, d.minLength);
                    var f = "password_strength_" + h;
                    if (!e.hasClass(f) && h in d.texts) {
                        e.text(d.texts[h]).attr("class", "password_strength " + f)
                    }
                } else {
                    e.text("").attr("class", "password_strength")
                }
            })
        })
    };
    b.fn.password_strength2 = function(c) {
        var d = a.getStrengthLevel(c, 6);
        return d
    }
})(jQuery);
jQuery.jCookie = function(i, b, n, l) {
    if (!navigator.cookieEnabled) {
        return false
    }
    var l = l || {};
    if (typeof(arguments[0]) !== "string" && arguments.length === 1) {
        l = arguments[0];
        i = l.name;
        b = l.value;
        n = l.expires
    }
    i = encodeURI(i);
    if (b && (typeof(b) !== "number" && typeof(b) !== "string" && b !== null)) {
        return false
    }
    var e = l.path ? "; path=" + l.path: "";
    var f = l.domain ? "; domain=" + l.domain: "";
    var d = l.secure ? "; secure": "";
    var g = "";
    if (b || (b === null && arguments.length == 2)) {
        n = (n === null || (b === null && arguments.length == 2)) ? -1 : n;
        if (typeof(n) === "number" && n != "session" && n !== undefined) {
            var m = new Date();
            m.setTime(m.getTime() + (n * 24 * 60 * 60 * 1000));
            g = ["; expires=", m.toGMTString()].join("")
        }
        document.cookie = [i, "=", encodeURI(b), g, f, e, d].join("");
        return true
    }
    if (!b && typeof(arguments[0]) === "string" && arguments.length == 1 && document.cookie && document.cookie.length) {
        var a = document.cookie.split(";");
        var h = a.length;
        while (h--) {
            var c = a[h].split("=");
            if (jQuery.trim(c[0]) === i) {
                return decodeURI(c[1])
            }
        }
    }
    return false
};
function showProgressBar(e, b) {
    var c = uncompile(quiLanguage.progressBar.title);
    if (e) {
        c = e
    }
    var a = "simple";
    if (b) {
        if (b == "normal") {
            a = b
        }
    }
    if (a == "simple") {
        top.progressFlag = 2;
        top.showSimpleProgress(c, 0, true, "#ffffff")
    } else {
        top.progressFlag = 1;
        var d = new top.Dialog();
        d.Width = 360;
        d.Height = 70;
        d.Title = c;
        d.InvokeElementId = "progress";
        d.show()
    }
}
function closeProgress() {
    try {
        if (top.progressFlag == 1) {
            top.Dialog.close();
            top.progressFlag = 0
        } else {
            if (top.progressFlag == 2) {
                top.hideSimpleProgress();
                top.progressFlag = 0
            }
        }
    } catch(a) {}
}
function _initComplete() {
    try {
        initComplete()
    } catch(a) {}
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}; (function(a) {
    a.fn.mask = function(d, c, e, b) {
        a(this).each(function() {
            if (e == null) {
                e = true
            }
            var f = "#cccccc";
            if (b) {
                f = b
            }
            if (c !== undefined && c > 0 && c != null) {
                var g = a(this);
                g.data("_mask_timeout", setTimeout(function() {
                    a.maskElement(g, d, e, f)
                },
                c))
            } else {
                a.maskElement(a(this), d, e, f)
            }
        })
    };
    a.fn.unmask = function() {
        a(this).each(function() {
            a.unmaskElement(a(this))
        })
    };
    a.fn.isMasked = function() {
        return this.hasClass("masked")
    };
    a.maskElement = function(e, d, g, c) {
        if (e.data("_mask_timeout") !== undefined) {
            clearTimeout(e.data("_mask_timeout"));
            e.removeData("_mask_timeout")
        }
        if (e.isMasked()) {
            a.unmaskElement(e)
        }
        if (e.css("position") == "static") {
            e.addClass("masked-relative")
        }
        e.addClass("masked");
        var f = a('<div class="loadmask"></div>');
        f.css({
            backgroundColor: c
        });
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            f.height(e.height() + parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom")));
            f.width(e.width() + parseInt(e.css("padding-left")) + parseInt(e.css("padding-right")))
        }
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            e.find("select").addClass("masked-hidden")
        }
        e.append(f);
        f.show();
        if (d !== undefined && d != null) {
            var b = a('<div class="loadmask-msg" style="display:none;"></div>');
            if (g) {
                b.append('<div class="mask_lading">' + d + "</div>")
            } else {
                b.append('<div class="normal">' + d + "</div>")
            }
            e.append(b);
            b.css("top", Math.round(e.height() / 2 - (b.height() - parseInt(b.css("padding-top")) - parseInt(b.css("padding-bottom"))) / 2) + "px");
            b.css("left", Math.round(e.width() / 2 - (b.width() - parseInt(b.css("padding-left")) - parseInt(b.css("padding-right"))) / 2) + "px");
            b.show()
        }
    };
    a.unmaskElement = function(b) {
        if (b.data("_mask_timeout") !== undefined) {
            clearTimeout(b.data("_mask_timeout"));
            b.removeData("_mask_timeout")
        }
        b.find(".loadmask-msg,.loadmask").remove();
        b.removeClass("masked");
        b.removeClass("masked-relative");
        b.find("select").removeClass("masked-hidden")
    }
})(jQuery);
var JSON;
if (!JSON) {
    JSON = {}
} (function() {
    function f(n) {
        return n < 10 ? "0" + n: n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable,
        function(a) {
            var c = meta[a];
            return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
        partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": ": ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": ": ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            function walk(holder, key) {
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx,
                function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                },
                "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
} ());
function validateInput(c, b) {
    var a = new RegExp(b);
    return a.test(c)
}
function createPosition(c, a) {
    var b;
    if (a == "normal") {
        b = $('<div class="position"><div class="center"><div class="left"><div class="right"><span></span></div></div></div></div>')
    } else {
        if (a == "simple") {
            b = $('<div class="positionSimple"><span></span></div>')
        }
    }
    b.find("span").append(c);
    $("body").prepend(b)
}
$.fn.createBoxItem = function(d, f) {
    var c = $(this);
    var g = c.parents(".box4");
    c.empty();
    var e;
    var a = "double";
    if (d.type) {
        if (d.type == "single") {
            a = "single"
        }
    }
    if (a == "single") {
        g.attr("noTitle", "false");
        g.attr("panelTitle", d.title);
        g.box4Build();
        var b = $("<ul></ul>");
        c.append(b);
        $.each(d.list,
        function(h, m) {
            var l = $('<li><a><span class="text_slice"></span></a></li>');
            if (m.link != "") {
                var i = l.find("a");
                i.attr("href", m.link);
                i.attr("target", f)
            }
            l.find(".text_slice").text(m.name);
            b.append(l)
        })
    } else {
        g.attr("noTitle", "true");
        g.box4Build();
        $.each(d.list,
        function(h, i) {
            if (h == 0) {
                e = i.link
            }
            if (i.type == "parent") {
                var m = $('<div class="subtitle"></div>');
                var l;
                if (i.link != "") {
                    l = $('<a><div class="subtitle_con"></div></a>');
                    l.attr("href", i.link);
                    l.attr("target", f)
                } else {
                    l = $('<div class="subtitle_con"></div>')
                }
                m.append(l);
                m.find(".subtitle_con").text(i.name);
                m.attr("id", "boxitem_" + i.id);
                c.append(m);
                c.append("<ul></ul>")
            }
        });
        $.each(d.list,
        function(h, n) {
            if (n.type == "child") {
                var l = $('<li><a><span class="text_slice"></span></a></li>');
                if (n.link != "") {
                    var m = l.find("a");
                    m.attr("href", n.link);
                    m.attr("target", f)
                }
                l.find(".text_slice").text(n.name);
                var i = n.pid;
                $("#boxitem_" + i).next("ul").append(l)
            }
        });
        c.find(".subtitle a").each(function() {
            $(this).unbind("click");
            $(this).click(function() {
                c.find("li a").removeClass("current")
            })
        })
    }
    c.find("li a").each(function(h) {
        $(this).unbind("click");
        $(this).click(function() {
            c.find("li a").removeClass("current");
            $(this).addClass("current");
            if ($(this).attr("href") != null) {
                showProgressBar();
                if (a == "single") {
                    if (d.title) {
                        top.positionContent = "【" + uncompile(quiLanguage.position.title) + d.title + ">>" + $(this).text() + "】"
                    } else {
                        top.positionContent = "【" + uncompile(quiLanguage.position.title) + $(this).text() + "】"
                    }
                } else {
                    if (d.title) {
                        top.positionContent = "【" + uncompile(quiLanguage.position.title) + d.title + ">>" + $(this).parents("ul").prev(".subtitle").eq(0).text() + ">>" + $(this).text() + "】"
                    } else {
                        top.positionContent = "【" + uncompile(quiLanguage.position.title) + $(this).parents("ul").prev(".subtitle").eq(0).text() + ">>" + $(this).text() + "】"
                    }
                }
                top.positionType = "simple"
            }
        })
    });
    $("#" + f).attr("src", e)
};
function showCodePage(c, a) {
    var b = new top.Dialog();
    b.Title = a;
    b.Modal = false;
    b.ID = "code1";
    b.URL = c;
    b.ShowMaxButton = true;
    b.ShowMinButton = true;
    b.Width = 900;
    b.Height = 540;
    b.MaxEvent = function() {
        b.innerFrame.contentWindow.changeCodeHeight($(top.document.getElementById("_DialogBGDiv")).height() - 55)
    };
    b.DecreaseEvent = function() {
        b.innerFrame.contentWindow.changeCodeHeight(530)
    };
    b.show()
} (function($) {
    Function.prototype.quiExtend = function(parent, overrides) {
        if (typeof parent != "function") {
            return this
        }
        this.base = parent.prototype;
        this.base.constructor = parent;
        var f = function() {};
        f.prototype = parent.prototype;
        this.prototype = new f();
        this.prototype.constructor = this;
        if (overrides) {
            $.extend(this.prototype, overrides)
        }
    };
    Function.prototype.quiDefer = function(o, defer, args) {
        var fn = this;
        return setTimeout(function() {
            fn.apply(o, args || [])
        },
        defer)
    };
    window.qui = $.quiui = {
        version: "qui3.1",
        managerCount: 0,
        managers: {},
        managerIdPrev: "quiui",
        error: {
            managerIsExist: uncompile(quiLanguage.jsError.idInfo)
        },
        getId: function(prev) {
            prev = prev || this.managerIdPrev;
            var id = prev + (1000 + this.managerCount);
            this.managerCount++;
            return id
        },
        add: function(manager) {
            if (arguments.length == 2) {
                var m = arguments[1];
                m.id = m.id || m.options.id || arguments[0].id;
                this.addManager(m);
                return
            }
            if (!manager.id) {
                manager.id = this.getId(manager.__idPrev())
            }
            if (this.managers[manager.id]) {
                throw new Error(this.error.managerIsExist)
            }
            this.managers[manager.id] = manager
        },
        remove: function(arg) {
            if (typeof arg == "string" || typeof arg == "number") {
                delete $.quiui.managers[arg]
            } else {
                if (typeof arg == "object" && arg instanceof $.quiui.core.Component) {
                    delete $.quiui.managers[arg.id]
                }
            }
        },
        get: function(arg, idAttrName) {
            idAttrName = idAttrName || "quiuiid";
            if (typeof arg == "string" || typeof arg == "number") {
                return $.quiui.managers[arg]
            } else {
                if (typeof arg == "object" && arg.length) {
                    if (!arg[0][idAttrName] && !$(arg[0]).attr(idAttrName)) {
                        return null
                    }
                    return $.quiui.managers[arg[0][idAttrName] || $(arg[0]).attr(idAttrName)]
                }
            }
            return null
        },
        find: function(type) {
            var arr = [];
            for (var id in this.managers) {
                var manager = this.managers[id];
                if (type instanceof Function) {
                    if (manager instanceof type) {
                        arr.push(manager)
                    }
                } else {
                    if (type instanceof Array) {
                        if ($.inArray(manager.__getType(), type) != -1) {
                            arr.push(manager)
                        }
                    } else {
                        if (manager.__getType() == type) {
                            arr.push(manager)
                        }
                    }
                }
            }
            return arr
        },
        run: function(plugin, args, ext) {
            if (!plugin) {
                return
            }
            ext = $.extend({
                defaultsNamespace: "quiDefaults",
                methodsNamespace: "quiMethods",
                controlNamespace: "controls",
                idAttrName: "quiuiid",
                isStatic: false,
                hasElement: true,
                propertyToElemnt: null
            },
            ext || {});
            plugin = plugin.replace(/^quiGet/, "");
            plugin = plugin.replace(/^qui/, "");
            if (this == null || this == window || ext.isStatic) {
                if (!$.quiui.plugins[plugin]) {
                    $.quiui.plugins[plugin] = {
                        fn: $["qui" + plugin],
                        isStatic: true
                    }
                }
                return new $.quiui[ext.controlNamespace][plugin]($.extend({},
                $[ext.defaultsNamespace][plugin] || {},
                $[ext.defaultsNamespace][plugin + "String"] || {},
                args.length > 0 ? args[0] : {}))
            }
            if (!$.quiui.plugins[plugin]) {
                $.quiui.plugins[plugin] = {
                    fn: $.fn["qui" + plugin],
                    isStatic: false
                }
            }
            if (/Manager$/.test(plugin)) {
                return $.quiui.get(this, ext.idAttrName)
            }
            this.each(function() {
                if (this[ext.idAttrName] || $(this).attr(ext.idAttrName)) {
                    var manager = $.quiui.get(this[ext.idAttrName] || $(this).attr(ext.idAttrName));
                    if (manager && args.length > 0) {
                        manager.set(args[0])
                    }
                    return
                }
                if (args.length >= 1 && typeof args[0] == "string") {
                    return
                }
                var options = args.length > 0 ? args[0] : null;
                var p = $.extend({},
                $[ext.defaultsNamespace][plugin] || {},
                $[ext.defaultsNamespace][plugin + "String"] || {},
                options || {});
                if (ext.propertyToElemnt) {
                    p[ext.propertyToElemnt] = this
                }
                if (ext.hasElement) {
                    new $.quiui[ext.controlNamespace][plugin](this, p)
                } else {
                    new $.quiui[ext.controlNamespace][plugin](p)
                }
            });
            if (this.length == 0) {
                return null
            }
            if (args.length == 0) {
                return $.quiui.get(this, ext.idAttrName)
            }
            if (typeof args[0] == "object") {
                return $.quiui.get(this, ext.idAttrName)
            }
            if (typeof args[0] == "string") {
                var manager = $.quiui.get(this, ext.idAttrName);
                if (manager == null) {
                    return
                }
                if (args[0] == "option") {
                    if (args.length == 2) {
                        return manager.get(args[1])
                    } else {
                        if (args.length >= 3) {
                            return manager.set(args[1], args[2])
                        }
                    }
                } else {
                    var method = args[0];
                    if (!manager[method]) {
                        return
                    }
                    var params = Array.apply(null, args);
                    params.shift();
                    return manager[method].apply(manager, params)
                }
            }
            return null
        },
        defaults: {},
        methods: {},
        core: {},
        controls: {},
        plugins: {}
    };
    $.quiDefaults = {};
    $.quiMethos = {};
    $.quiui.defaults = $.quiDefaults;
    $.quiui.methods = $.quiMethos;
    $.fn.qui = function(plugin) {
        if (plugin) {
            return $.quiui.run.call(this, plugin, arguments)
        } else {
            return $.quiui.get(this)
        }
    };
    $.quiui.core.Component = function(options) {
        this.events = this.events || {};
        this.options = options || {};
        this.children = {}
    };
    $.extend($.quiui.core.Component.prototype, {
        __getType: function() {
            return "$.quiui.core.Component"
        },
        __idPrev: function() {
            return "quiui"
        },
        set: function(arg, value) {
            if (!arg) {
                return
            }
            if (typeof arg == "object") {
                var tmp;
                if (this.options != arg) {
                    $.extend(this.options, arg);
                    tmp = arg
                } else {
                    tmp = $.extend({},
                    arg)
                }
                if (value == undefined || value == true) {
                    for (var p in tmp) {
                        if (p.indexOf("on") == 0) {
                            this.set(p, tmp[p])
                        }
                    }
                }
                if (value == undefined || value == false) {
                    for (var p in tmp) {
                        if (p.indexOf("on") != 0) {
                            this.set(p, tmp[p])
                        }
                    }
                }
                return
            }
            var name = arg;
            if (name.indexOf("on") == 0) {
                if (typeof value == "function") {
                    this.bind(name.substr(2), value)
                }
                return
            }
            this.trigger("propertychange", arg, value);
            if (!this.options) {
                this.options = {}
            }
            this.options[name] = value;
            var pn = "_set" + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn]) {
                this[pn].call(this, value)
            }
            this.trigger("propertychanged", arg, value)
        },
        get: function(name) {
            var pn = "_get" + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn]) {
                return this[pn].call(this, name)
            }
            return this.options[name]
        },
        hasBind: function(arg) {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (event && event.length) {
                return true
            }
            return false
        },
        trigger: function(arg, data) {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event) {
                return
            }
            data = data || [];
            if ((data instanceof Array) == false) {
                data = [data]
            }
            for (var i = 0; i < event.length; i++) {
                var ev = event[i];
                if (ev.handler.apply(ev.context, data) == false) {
                    return false
                }
            }
        },
        bind: function(arg, handler, context) {
            if (typeof arg == "object") {
                for (var p in arg) {
                    this.bind(p, arg[p])
                }
                return
            }
            if (typeof handler != "function") {
                return false
            }
            var name = arg.toLowerCase();
            var event = this.events[name] || [];
            context = context || this;
            event.push({
                handler: handler,
                context: context
            });
            this.events[name] = event
        },
        unbind: function(arg, handler) {
            if (!arg) {
                this.events = {};
                return
            }
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event || !event.length) {
                return
            }
            if (!handler) {
                delete this.events[name]
            } else {
                for (var i = 0,
                l = event.length; i < l; i++) {
                    if (event[i].handler == handler) {
                        event.splice(i, 1);
                        break
                    }
                }
            }
        },
        destroy: function() {
            $.quiui.remove(this)
        }
    });
    $.quiui.core.UIComponent = function(element, options) {
        $.quiui.core.UIComponent.base.constructor.call(this, options);
        var extendMethods = this._extendMethods();
        if (extendMethods) {
            $.extend(this, extendMethods)
        }
        this.element = element;
        this._init();
        this._preRender();
        this.trigger("render");
        this._render();
        this.trigger("rendered");
        this._rendered()
    };
    $.quiui.core.UIComponent.quiExtend($.quiui.core.Component, {
        __getType: function() {
            return "$.quiui.core.UIComponent"
        },
        _extendMethods: function() {},
        _init: function() {
            this.type = this.__getType();
            if (!this.element) {
                this.id = this.options.id || $.quiui.getId(this.__idPrev())
            } else {
                this.id = this.options.id || this.element.id || $.quiui.getId(this.__idPrev())
            }
            $.quiui.add(this);
            if (!this.element) {
                return
            }
            var attributes = this.attr();
            if (attributes && attributes instanceof Array) {
                for (var i = 0; i < attributes.length; i++) {
                    var name = attributes[i];
                    this.options[name] = $(this.element).attr(name)
                }
            }
            var p = this.options;
            if ($(this.element).attr("quiui")) {
                try {
                    var attroptions = $(this.element).attr("quiui");
                    if (attroptions.indexOf("{") != 0) {
                        attroptions = "{" + attroptions + "}"
                    }
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) {
                        $.extend(p, attroptions)
                    }
                } catch(e) {}
            }
        },
        _preRender: function() {},
        _render: function() {},
        _rendered: function() {
            if (this.element) {
                $(this.element).attr("quiuiid", this.id)
            }
        },
        attr: function() {
            return []
        },
        destroy: function() {
            if (this.element) {
                $(this.element).remove()
            }
            this.options = null;
            $.quiui.remove(this)
        }
    });
    $.quiui.controls.Input = function(element, options) {
        $.quiui.controls.Input.base.constructor.call(this, element, options)
    };
    $.quiui.controls.Input.quiExtend($.quiui.core.UIComponent, {
        __getType: function() {
            return "$.quiui.controls.Input"
        },
        attr: function() {
            return ["nullText"]
        },
        setValue: function(value) {
            return this.set("value", value)
        },
        getValue: function() {
            return this.get("value")
        },
        setEnabled: function() {
            return this.set("disabled", false)
        },
        setDisabled: function() {
            return this.set("disabled", true)
        },
        updateStyle: function() {}
    });
    $.quiui.win = {
        top: false,
        mask: function(win) {
            function setHeight() {
                if (!$.quiui.win.windowMask) {
                    return
                }
                var h = $(window).height() + $(window).scrollTop();
                $.quiui.win.windowMask.height(h)
            }
            if (!this.windowMask) {
                this.windowMask = $("<div class='l-window-mask' style='display: block;'></div>").appendTo("body");
                $(window).bind("resize.quiuiwin", setHeight);
                $(window).bind("scroll", setHeight)
            }
            this.windowMask.show();
            setHeight();
            this.masking = true
        },
        unmask: function(win) {
            var jwins = $("body > .l-dialog:visible,body > .l-window:visible");
            for (var i = 0,
            l = jwins.length; i < l; i++) {
                var winid = jwins.eq(i).attr("quiuiid");
                if (win && win.id == winid) {
                    continue
                }
                var winmanager = $.quiui.get(winid);
                if (!winmanager) {
                    continue
                }
                var modal = winmanager.get("modal");
                if (modal) {
                    return
                }
            }
            if (this.windowMask) {
                this.windowMask.hide()
            }
            this.masking = false
        },
        createTaskbar: function() {
            if (!this.taskbar) {
                this.taskbar = $('<div class="l-taskbar"><div class="l-taskbar-tasks"></div><div class="l-clear"></div></div>').appendTo("body");
                if (this.top) {
                    this.taskbar.addClass("l-taskbar-top")
                }
                this.taskbar.tasks = $(".l-taskbar-tasks:first", this.taskbar);
                this.tasks = {}
            }
            this.taskbar.show();
            this.taskbar.animate({
                bottom: 0
            });
            return this.taskbar
        },
        removeTaskbar: function() {
            var self = this;
            self.taskbar.animate({
                bottom: -32
            },
            function() {
                self.taskbar.remove();
                self.taskbar = null
            })
        },
        activeTask: function(win) {
            for (var winid in this.tasks) {
                var t = this.tasks[winid];
                if (winid == win.id) {
                    t.addClass("l-taskbar-task-active")
                } else {
                    t.removeClass("l-taskbar-task-active")
                }
            }
        },
        getTask: function(win) {
            var self = this;
            if (!self.taskbar) {
                return
            }
            if (self.tasks[win.id]) {
                return self.tasks[win.id]
            }
            return null
        },
        addTask: function(win) {
            var self = this;
            if (!self.taskbar) {
                self.createTaskbar()
            }
            if (self.tasks[win.id]) {
                return self.tasks[win.id]
            }
            var title = win.get("title");
            var task = self.tasks[win.id] = $('<div class="l-taskbar-task"><div class="l-taskbar-task-icon"></div><div class="l-taskbar-task-content">' + title + "</div></div>");
            self.taskbar.tasks.append(task);
            self.activeTask(win);
            task.bind("click",
            function() {
                self.activeTask(win);
                if (win.actived) {
                    win.min()
                } else {
                    win.active()
                }
            }).hover(function() {
                $(this).addClass("l-taskbar-task-over")
            },
            function() {
                $(this).removeClass("l-taskbar-task-over")
            });
            return task
        },
        hasTask: function() {
            for (var p in this.tasks) {
                if (this.tasks[p]) {
                    return true
                }
            }
            return false
        },
        removeTask: function(win) {
            var self = this;
            if (!self.taskbar) {
                return
            }
            if (self.tasks[win.id]) {
                self.tasks[win.id].unbind();
                self.tasks[win.id].remove();
                delete self.tasks[win.id]
            }
            if (!self.hasTask()) {
                self.removeTaskbar()
            }
        },
        setFront: function(win) {
            var wins = $.quiui.find($.quiui.core.Win);
            for (var i in wins) {
                var w = wins[i];
                if (w == win) {
                    $(w.element).css("z-index", "9200");
                    this.activeTask(w)
                } else {
                    $(w.element).css("z-index", "9100")
                }
            }
        }
    };
    $.quiui.core.Win = function(element, options) {
        $.quiui.core.Win.base.constructor.call(this, element, options)
    };
    $.quiui.core.Win.quiExtend($.quiui.core.UIComponent, {
        __getType: function() {
            return "$.quiui.controls.Win"
        },
        mask: function() {
            if (this.options.modal) {
                $.quiui.win.mask(this)
            }
        },
        unmask: function() {
            if (this.options.modal) {
                $.quiui.win.unmask(this)
            }
        },
        min: function() {},
        max: function() {},
        active: function() {}
    });
    $.quiui.draggable = {
        dragging: false
    };
    $.quiui.resizable = {
        reszing: false
    };
    $.quiui.toJSON = typeof JSON === "object" && JSON.stringify ? JSON.stringify: function(o) {
        var f = function(n) {
            return n < 10 ? "0" + n: n
        },
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        quote = function(value) {
            escapable.lastIndex = 0;
            return escapable.test(value) ? '"' + value.replace(escapable,
            function(a) {
                var c = meta[a];
                return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
            }) + '"': '"' + value + '"'
        };
        if (o === null) {
            return "null"
        }
        var type = typeof o;
        if (type === "undefined") {
            return undefined
        }
        if (type === "string") {
            return quote(o)
        }
        if (type === "number" || type === "boolean") {
            return "" + o
        }
        if (type === "object") {
            if (typeof o.toJSON === "function") {
                return $.quiui.toJSON(o.toJSON())
            }
            if (o.constructor === Date) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
            }
            var pairs = [];
            if (o.constructor === Array) {
                for (var i = 0,
                l = o.length; i < l; i++) {
                    pairs.push($.quiui.toJSON(o[i]) || "null")
                }
                return "[" + pairs.join(",") + "]"
            }
            var name, val;
            for (var k in o) {
                type = typeof k;
                if (type === "number") {
                    name = '"' + k + '"'
                } else {
                    if (type === "string") {
                        name = quote(k)
                    } else {
                        continue
                    }
                }
                type = typeof o[k];
                if (type === "function" || type === "undefined") {
                    continue
                }
                val = $.quiui.toJSON(o[k]);
                pairs.push(name + ":" + val)
            }
            return "{" + pairs.join(",") + "}"
        }
    }
})(jQuery);
function uncompile(b) {
    b = unescape(b);
    var d = String.fromCharCode(b.charCodeAt(0) - b.length);
    for (var a = 1; a < b.length; a++) {
        d += String.fromCharCode(b.charCodeAt(a) - d.charCodeAt(a - 1))
    }
    return d
} (function(a) {
    a.tip = function(b) {
        return a.quiui.run.call(null, "quiTip", arguments)
    };
    a.fn.tip = function(b) {
        this.each(function() {
            var c = a.extend({},
            a.quiDefaults.Tip, b || {});
            c.target = c.target || this;
            if (c.auto || b == undefined) {
                if (!c.content) {
                    c.content = this.title;
                    if (c.removeTitle) {
                        a(this).removeAttr("title")
                    }
                }
                c.content = c.content || this.title;
                a(this).bind("mouseover.tip",
                function() {
                    if (c.arrowDirection == "up") {
                        c.x = a(this).offset().left + (c.distanceX || 0);
                        c.y = a(this).offset().top + 7 + a(this).height() + (c.distanceY || 0)
                    } else {
                        c.x = a(this).offset().left + a(this).width() + (c.distanceX || 0);
                        c.y = a(this).offset().top + (c.distanceY || 0)
                    }
                    a.tip(c)
                }).bind("mouseout.tip",
                function() {
                    var d = a.quiui.managers[this.quiuitipid];
                    if (d) {
                        d.remove()
                    }
                })
            } else {
                if (c.target.quiuitipid) {
                    return
                }
                if (c.arrowDirection == "up") {
                    c.x = a(this).offset().left + (c.distanceX || 0);
                    c.y = a(this).offset().top + 7 + a(this).height() + (c.distanceY || 0)
                } else {
                    c.x = a(this).offset().left + a(this).width() + (c.distanceX || 0);
                    c.y = a(this).offset().top + (c.distanceY || 0)
                }
                c.x = c.x || 0;
                c.y = c.y || 0;
                a.tip(c)
            }
        });
        return a.quiui.get(this, "quiuitipid")
    };
    a.fn.hideTip = function(b) {
        return this.each(function() {
            var f = b || {};
            if (f.isLabel == undefined) {
                f.isLabel = this.tagName.toLowerCase() == "label" && a(this).attr("for") != null
            }
            var e = this;
            if (f.isLabel) {
                var c = a("#" + a(this).attr("for"));
                if (c.length == 0) {
                    return
                }
                e = c[0]
            }
            var d = a.quiui.managers[e.quiuitipid];
            if (d) {
                d.remove()
            }
        }).unbind("mouseover.tip").unbind("mouseout.tip")
    };
    a.fn.quiGetTipManager = function() {
        return a.quiui.get(this)
    };
    a.quiDefaults = a.quiDefaults || {};
    a.quiDefaults.HideTip = {};
    a.quiDefaults.Tip = {
        content: null,
        callback: null,
        width: null,
        height: null,
        x: 0,
        y: 0,
        appendIdTo: null,
        target: null,
        auto: null,
        removeTitle: true,
        arrowDirection: "up",
        showCloseBtn: false,
        distanceX: 1,
        distanceY: -3,
        arrowDistanceX: 0,
        arrowDistanceY: 0,
        showArrow: true
    };
    a.quiDefaults.ElementTip = {
        distanceX: 1,
        distanceY: -3,
        auto: null,
        removeTitle: true
    };
    a.quiMethos.Tip = {};
    a.quiui.controls.Tip = function(b) {
        a.quiui.controls.Tip.base.constructor.call(this, null, b)
    };
    a.quiui.controls.Tip.quiExtend(a.quiui.core.UIComponent, {
        __getType: function() {
            return "Tip"
        },
        __idPrev: function() {
            return "Tip"
        },
        _extendMethods: function() {
            return a.quiMethos.Tip
        },
        _render: function() {
            var i = this,
            d = this.options;
            var m = a('<div class="l-verify-tip"></div>');
            var e;
            var f;
            if (d.showArrow) {
                if (d.arrowDirection == "up") {
                    e = a('<div class="l-verify-tip-corner2"></div>');
                    f = a('<div class="l-verify-tip-content2"></div>')
                } else {
                    e = a('<div class="l-verify-tip-corner"></div>');
                    f = a('<div class="l-verify-tip-content"></div>')
                }
                m.append(e)
            } else {
                f = a('<div class="l-verify-tip-content2"></div>')
            }
            m.append(f);
            i.tip = m;
            i.tip.attr("id", i.id);
            var h = a('<div class="qui-tip-con"></div>');
            f.append(h);
            if (d.content || d.content == "") {
                h.html(d.content);
                m.appendTo("body")
            } else {
                return
            }
            m.css({
                left: d.x,
                top: d.y
            }).show();
            if (d.width) {
                f.width(d.width)
            } else {
                var b = _getStrLength(d.content);
                if (b > 37 || b == 37) {
                    f.width(220)
                }
            }
            if (d.height) {
                f.height(d.height)
            }
            if (!d.width && !d.height && b < 37) {
                f.addClass("text_singleLine")
            }
            if (d.arrowDistanceX != 0) {
                if (d.arrowDirection == "up") {
                    e.css("left", d.arrowDistanceX)
                }
            }
            if (d.arrowDistanceY != 0) {
                if (d.arrowDirection != "up") {
                    e.css("top", d.arrowDistanceY)
                }
            }
            if (d.showCloseBtn) {
                var l = a('<div class="l-verify-tip-close"></div>');
                var c = a('<div class="l-verify-tip-close-con"></div>');
                f.prepend(c);
                c.append(l);
                c.append('<div class="clear"></div>');
                l.click(function() {
                    if (d.onClose) {
                        var g = d.onClose;
                        if ((typeof g) == "function") {
                            g.apply()
                        }
                    }
                    i.remove()
                })
            }
            eee = d.appendIdTo;
            if (d.appendIdTo) {
                d.appendIdTo.attr("tipId", i.id)
            }
            if (d.target) {
                a(d.target).attr("tipId", i.id);
                d.target.quiuitipid = i.id
            }
            d.callback && d.callback(m);
            i.set(d)
        },
        _setContent: function(b) {},
        remove: function() {
            if (this.options.appendIdTo) {
                this.options.appendIdTo.removeAttr("tipId")
            }
            if (this.options.target) {
                a(this.options.target).removeAttr("tipId");
                this.options.target.quiuitipid = null
            }
            this.tip.remove()
        }
    })
})(jQuery); (function(a) {
    a.rightClickMenu = function(b) {
        return a.quiui.run.call(null, "quiMenu", arguments)
    };
    a.quiDefaults.Menu = {
        width: 120,
        top: 0,
        left: 0,
        items: null,
        shadow: true
    };
    a.quiMethos.Menu = {};
    a.quiui.controls.Menu = function(b) {
        a.quiui.controls.Menu.base.constructor.call(this, null, b)
    };
    a.quiui.controls.Menu.quiExtend(a.quiui.core.UIComponent, {
        __getType: function() {
            return "Menu"
        },
        __idPrev: function() {
            return "Menu"
        },
        _extendMethods: function() {
            return a.quiMethos.Menu
        },
        _render: function() {
            var b = this,
            c = this.options;
            b.menuItemCount = 0;
            b.menus = {};
            b.menu = b.createMenu();
            b.element = b.menu[0];
            b.menu.css({
                top: c.top,
                left: c.left,
                width: c.width
            });
            c.items && a(c.items).each(function(d, e) {
                b.addItem(e)
            });
            a(document).bind("click.menu",
            function() {
                for (var d in b.menus) {
                    var e = b.menus[d];
                    if (!e) {
                        return
                    }
                    e.hide();
                    if (e.shadow) {
                        e.shadow.hide()
                    }
                }
            });
            b.set(c)
        },
        show: function(b, e) {
            var c = this,
            d = this.options;
            if (e == undefined) {
                e = c.menu
            }
            if (b && b.left != undefined) {
                e.css({
                    left: b.left
                })
            }
            if (b && b.top != undefined) {
                e.css({
                    top: b.top
                })
            }
            e.show();
            c.updateShadow(e)
        },
        updateShadow: function(d) {
            var b = this,
            c = this.options;
            if (!c.shadow) {
                return
            }
            d.shadow.css({
                left: d.css("left"),
                top: d.css("top"),
                width: d.outerWidth(),
                height: d.outerHeight()
            });
            if (d.is(":visible")) {
                d.shadow.show()
            } else {
                d.shadow.hide()
            }
        },
        hide: function(d) {
            var b = this,
            c = this.options;
            if (d == undefined) {
                d = b.menu
            }
            b.hideAllSubMenu(d);
            d.hide();
            b.updateShadow(d)
        },
        toggle: function() {
            var b = this,
            c = this.options;
            b.menu.toggle();
            b.updateShadow(b.menu)
        },
        removeItem: function(c) {
            var b = this,
            d = this.options;
            a("> .l-menu-item[menuitemid=" + c + "]", b.menu.items).remove()
        },
        setEnabled: function(c) {
            var b = this,
            d = this.options;
            a("> .l-menu-item[menuitemid=" + c + "]", b.menu.items).removeClass("l-menu-item-disable")
        },
        setDisabled: function(c) {
            var b = this,
            d = this.options;
            a("> .l-menu-item[menuitemid=" + c + "]", b.menu.items).addClass("l-menu-item-disable")
        },
        isEnable: function(c) {
            var b = this,
            d = this.options;
            return ! a("> .l-menu-item[menuitemid=" + c + "]", b.menu.items).hasClass("l-menu-item-disable")
        },
        getItemCount: function() {
            var b = this,
            c = this.options;
            return a("> .l-menu-item", b.menu.items).length
        },
        addItem: function(e, h) {
            var d = this,
            f = this.options;
            if (!e) {
                return
            }
            if (h == undefined) {
                h = d.menu
            }
            if (e.line) {
                h.items.append('<div class="l-menu-item-line"></div>');
                return
            }
            var b = a('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>');
            var c = a("> .l-menu-item", h.items).length;
            h.items.append(b);
            b.attr("quiuimenutemid", ++d.menuItemCount);
            e.id && b.attr("menuitemid", e.id);
            e.text && a(">.l-menu-item-text:first", b).html(e.text);
            e.iconClass && b.prepend('<div class="l-menu-item-icon ' + e.iconClass + '"></div>');
            e.img && b.prepend('<div class="l-menu-item-icon"><img style="width:16px;height:16px;margin:2px;" src="' + e.img + '" /></div>');
            if (e.disable || e.disabled) {
                b.addClass("l-menu-item-disable")
            }
            if (e.visible) {
                b.css("display", "none")
            }
            if (e.children) {
                b.append('<div class="l-menu-item-arrow"></div>');
                var l = d.createMenu(b.attr("quiuimenutemid"));
                d.menus[b.attr("quiuimenutemid")] = l;
                l.width(f.width);
                l.hover(null,
                function() {
                    if (!l.showedSubMenu) {
                        d.hide(l)
                    }
                });
                a(e.children).each(function() {
                    d.addItem(this, l)
                })
            }
            e.click && b.click(function() {
                if (a(this).hasClass("l-menu-item-disable")) {
                    return
                }
                e.click(e, c)
            });
            e.dblclick && b.dblclick(function() {
                if (a(this).hasClass("l-menu-item-disable")) {
                    return
                }
                e.dblclick(e, c)
            });
            var i = a("> .l-menu-over:first", h);
            b.hover(function() {
                if (a(this).hasClass("l-menu-item-disable")) {
                    return
                }
                var g = a(this).offset().top;
                var m = g - h.offset().top;
                i.css({
                    top: m
                });
                d.hideAllSubMenu(h);
                if (e.children) {
                    var n = a(this).attr("quiuimenutemid");
                    if (!n) {
                        return
                    }
                    if (d.menus[n]) {
                        d.show({
                            top: g,
                            left: a(this).offset().left + a(this).width() - 5
                        },
                        d.menus[n]);
                        h.showedSubMenu = true
                    }
                }
            },
            function() {
                if (a(this).hasClass("l-menu-item-disable")) {
                    return
                }
                var g = a(this).attr("quiuimenutemid");
                if (e.children) {
                    var g = a(this).attr("quiuimenutemid");
                    if (!g) {
                        return
                    }
                }
            })
        },
        hideAllSubMenu: function(d) {
            var b = this,
            c = this.options;
            if (d == undefined) {
                d = b.menu
            }
            a("> .l-menu-item", d.items).each(function() {
                if (a("> .l-menu-item-arrow", this).length > 0) {
                    var e = a(this).attr("quiuimenutemid");
                    if (!e) {
                        return
                    }
                    b.menus[e] && b.hide(b.menus[e])
                }
            });
            d.showedSubMenu = false
        },
        createMenu: function(c) {
            var b = this,
            d = this.options;
            var e = a('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
            c && e.attr("quiuiparentmenuitemid", c);
            e.items = a("> .l-menu-inner:first", e);
            e.appendTo("body");
            if (d.shadow) {
                e.shadow = a('<div class="l-menu-shadow"></div>').insertAfter(e);
                b.updateShadow(e)
            }
            e.hover(null,
            function() {
                if (!e.showedSubMenu) {
                    a("> .l-menu-over:first", e).css({
                        top: -24
                    })
                }
            });
            if (c) {
                b.menus[c] = e
            } else {
                b.menus[0] = e
            }
            return e
        }
    });
    a.quiui.controls.Menu.prototype.setEnable = a.quiui.controls.Menu.prototype.setEnabled;
    a.quiui.controls.Menu.prototype.setDisable = a.quiui.controls.Menu.prototype.setDisabled
})(jQuery);