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
    },
    eventHandle: function() {
        var self = this;

        self._editorScroll();
        self._editorMouseMove();
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
        for (i=0; i<=rulerWidth; i+=100) {
            if (i-600 >= 0) {
                rulerValue = $('<div class="ruler-value">' + (i-600) + '</div>');
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
        for (i=0; i<=rulerHeight; i+=100) {
            if (i-700 >= 0) {
                rulerValue = $('<div class="ruler-value">' + (i-700) + '</div>');
                rulerValue.css({
                    top: (i + 1) + 'px',
                    left:  '2px'
                });
                self.leftRuler.append(rulerValue);
            }
        }
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
    run: function() {
        this.init();
        this.eventHandle();
    }
};