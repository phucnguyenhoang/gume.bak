$(function() {
    Editor.run();
});
var Editor = {
    _w: 0,
    _h: 0,
    dw: 1170,
    dh: 900,
    win: $(window),
    editor: $('#editor'),
    contentBG: $('#content_background'),
    contentEditor: $('#content_editor'),
    topRuler: $('#top_ruler'),
    leftRuler: $('#left_ruler'),
    topRulerPadding: 600,
    leftRulerPadding: 700,
    topRulerCursor: $('#top_ruler_cursor'),
    leftRulerCursor: $('#left_ruler_cursor'),
    url: null,
    token: {
        name: null,
        value: null
    },
    init: function() {
        var self = this,
            hidSecurityToken = $('#security_token');

        // get window resolution
        self._initResolution();
        // get server info
        self.url = $('#base_url').val();
        self.token.name = hidSecurityToken.attr('name');
        self.token.value = hidSecurityToken.val();

        // init editor
        self._initEditor();
        // init content background
        self._initContentBackground();
        // init editor content
        self._initContentEditor();
        // init ruler
        self._initRuler();
        // init ruler guides
        self._initRulerGuides();
    },
    eventHandle: function() {
        var self = this;

        self._editorScroll();
        self._editorMouseMove();
        self._windowResize();
        self._rulerClick();
    },
    _initResolution: function() {
        var self = this;

        self._w = self.win.width();
        self._h = self.win.height();
    },
    _initEditor: function() {
        var self = this;

        self.editor.css({
            width: (self._w - 20) + 'px',
            height: (self._h - 55) + 'px'
        });
    },
    _initContentBackground: function() {
        var self = this;

        self.contentBG.css({
            width: (self.dw + 200) + 'px',
            height: (self.dh + 200) + 'px'
        });
    },
    _initContentEditor: function() {
        var self = this;

        self.contentEditor.css({
            width: self.dw + 'px',
            height: self.dh + 'px',
            top: '100px',
            left: '100px'
        });
    },
    _initRuler: function() {
        var self = this,
            editorWidth = self.editor.width(),
            editorHeight = self.editor.height(),
            bgWidth = self.contentBG.width(),
            bgHeight = self.contentBG.height(),
            rulerWidth, rulerHeight, i, rulerValue;

        // set top ruler width
        if (bgWidth >= editorWidth) {
            rulerWidth = bgWidth + 1000;
        } else {
            rulerWidth = editorWidth + 1000;
        }
        self.topRuler.css('width', rulerWidth + 'px');
        // set top ruler value
        self.topRuler.find('.ruler-value').remove();
        for (i=0; i<=rulerWidth; i+=100) {
            if (i-self.topRulerPadding >= 0) {
                rulerValue = $('<div class="ruler-value">' + (i-self.topRulerPadding) + '</div>');
                rulerValue.css({
                    top: '2px',
                    left:  (i + 2) + 'px'
                });
                self.topRuler.append(rulerValue);
            }
        }

        // set left ruler height
        if (bgHeight >= editorHeight) {
            rulerHeight = bgHeight + 1000;
        } else {
            rulerHeight = editorHeight + 1000;
        }
        self.leftRuler.css('height', rulerHeight + 'px');
        // set left ruler value
        self.leftRuler.find('.ruler-value').remove();
        for (i=0; i<=rulerHeight; i+=100) {
            if (i-self.leftRulerPadding >= 0) {
                rulerValue = $('<div class="ruler-value">' + (i-self.leftRulerPadding) + '</div>');
                rulerValue.css({
                    top: (i + 1) + 'px',
                    left:  '2px'
                });
                self.leftRuler.append(rulerValue);
            }
        }
    },
    _initRulerGuides: function() {
        var self = this;

        // set guides line
        self.topRuler.find('.guides-line').css('height', self.leftRuler.height() + 'px');
        self.leftRuler.find('.guides-line').css('width', self.topRuler.width() + 'px');
        // allow drag guide icon
        self.topRuler.find('.guides-top').draggable({
            axis: 'x'
        });
        self.leftRuler.find('.guides-left').draggable({
            axis: 'y'
        });
    },
    _editorScroll: function() {
        var self = this;

        self.editor.scroll(function() {
            var left = self.editor.scrollLeft(),
                top = self.editor.scrollTop();

            self.topRuler.css('left', (-480 - left) + 'px');
            self.leftRuler.css('top', (-544 - top) + 'px');
        });
    },
    _editorMouseMove: function() {
        var self = this;

        self.editor.mousemove(function(e) {
            self.topRulerCursor.css('left', e.pageX + 'px');
            self.leftRulerCursor.css('top', e.pageY + 'px');
        });
    },
    _windowResize: function() {
        var self = this;

        self.win.resize(function() {
            self.init();
        });
    },
    _rulerClick: function() {
        var self = this;

        // handle for top ruler
        self.topRuler.click(function(e) {
            var _x = e.pageX + self.editor.scrollLeft() + self.topRulerPadding - 120 - 6,
                guides = $('<div class="guides-top"></div>');

            guides.append('<div class="guides-icon"></div>');
            guides.append('<div class="guides-line"></div>');
            guides.css('left', _x + 'px');

            self.topRuler.append(guides);
            self._initRulerGuides();
        });

        // handle for left ruler
        self.leftRuler.click(function(e) {
            var _y = e.pageY + self.editor.scrollTop() + self.leftRulerPadding - 156 - 6,
                guides = $('<div class="guides-left"></div>');

            guides.append('<div class="guides-icon"></div>');
            guides.append('<div class="guides-line"></div>');
            guides.css('top', _y + 'px');

            self.leftRuler.append(guides);
            self._initRulerGuides();
        });
    },
    run: function() {
        this.init();
        this.eventHandle();
    }
};