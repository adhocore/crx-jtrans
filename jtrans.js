/**
 * JavaScript Plugin - jTransliter
 * Translits Roman To Nepali Unicode Live
 * 
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */

;
var jTransliter = jTransliter || {
    mod: {"a": "", "aa": "\u093e", "A": "\u093e", "i": "\u093f", "ii": "\u0940", "ee": "\u0940", "I": "\u0940", "u": "\u0941", "uu": "\u0942", "oo": "\u0942", "U": "\u0942", "R": "\u0943", "e": "\u0947", "ai": "\u0948", "ei": "\u0948", "o": "\u094b", "ou": "\u094c", "au": "\u094c", ".": "\u094d", "Om": "\u0950", "OM": "\u0950", "Ri": "\u0943", "Rh": "\u0943", "^": "\u0902", "*": "\u0901"}, 
    num: {"0": "\u0966", "1": "\u0967", "2": "\u0968", "3": "\u0969", "4": "\u096a", "5": "\u096b", "6": "\u096c", "7": "\u096d", "8": "\u096e", "9": "\u096f", ".": ".", "-": "-"}, 
    chr: {"^": "\u0902", "*": "\u0901", "a": "\u0905", "aa": "\u0906", "ai": "\u0910", "au": "\u0914", "b": "\u092c", "B": "\u092c", "bh": "\u092d", "Bh": "\u092d", "ch": "\u091a", "x": "\u091b", "X": "\u091b", "chh": "\u091b", "cH": "\u091b", "CH": "\u091b", "Ch": "\u091a", "Chh": "\u091b", "d": "\u0926", "dh": "\u0927", "e": "\u090f", "f": "\u092b", "F": "\u092b", "g": "\u0917", "gh": "\u0918", "G": "\u0917", "Gh": "\u0918", "h": "\u0939", "i": "\u0907", "ee": "\u0907", "ii": "\u0908", "j": "\u091c", "J": "\u091c", "jh": "\u091d", "Jh": "\u091d", "k": "\u0915", "K": "\u0915", "c": "\u0915", "C": "\u0915", "kh": "\u0916", "Kh": "\u0916", "l": "\u0932", "L": "\u0932", "m": "\u092e", "n": "\u0928", "ng": "\u0919", "o": "\u0913", "oo": "\u090a", "ou": "\u0914", "p": "\u092a", "P": "\u092a", "ph": "\u092b", "q": "\u0915", "Q": "\u0915", "r": "\u0930", "RH": "\u090b", "s": "\u0938", "sh": "\u0937", "t": "\u0924", "th": "\u0925", "u": "\u0909", "uu": "\u090a", "v": "\u092d", "V": "\u092d", "w": "\u0935", "W": "\u0935", "y": "\u092f", "Y": "\u092f", "yn": "\u091e", "z": "\u091c", "Z": "\u091c", "Gy": "\u091c\u094d\u091e", "Gn": "\u091c\u094d\u091e",".": "\u0964", "..": "\u0965", "A": "\u0906", "D": "\u0921", "Dh": "\u0922", "E": "\u0908", "H": "\u0903", "I": "\u0908", "Lr": "\u090c", "M": "\u0902", "MM": "\u0901", "N": "\u0923", "O": "\u0911", "R": "\u0943", "Ri": "\u090b", "S": "\u0936", "T": "\u091f", "Th": "\u0920", "U": "\u090a"}, 
    type: function(t) {
        if (!t)
            return'X';
        if (t.match(/[0-9]/))
            return'N';
        else if (t.match(/[aeiuo]/i))
            return'V';
        else if (t.match(/[bcdfghj-np-tv-z]+/i))
            return'C';
        else if (t.match(/[.]/))
            return'D';
        else
            return'X';
    },
    char: function(t) {
        return this.chr.hasOwnProperty(t) ? this.chr[t] : '';
    }, 
    modifier: function(t) {
        return this.mod.hasOwnProperty(t) ? this.mod[t] : '';
    }, 
    number: function(n) {
        nn = '';
        for (var k = 0; k < n.length; k++) {
            nn += this.num[n.substr(k, 1)];
        }
        return nn;
    }, 
    unicode: function(a) {
        var b = a.length;
        var c = '';
        var d = false;
        for (i = 0; i < b; i++) {
            v0 = (i === 0) ? '' : a[i - 1];
            v = a[i];
            v1 = (i < b - 1) ? a[i + 1] : '';
            t0 = this.type(v0);
            t = this.type(v);
            t1 = this.type(v1);
            if (t === 'C') {
                if (d && (v0 && t0 === 'C')) {
                    if ((v1 !== 'R' && v1 !== 'H' && v1 !== 'M') && (v !== 'R' && v !== 'H' && v !== 'M'));
                        c += "\u094d";
                    d = false;
                } else {
                    d = false;
                }
                if (((v === 'R' && v1 !== 'i') || v === 'H' || v === 'M') && (t0 !== 'C' && t0 !== 'V')) {
                    c += char(v.toLowerCase());
                    if ((v1 && t1 === 'C') && (v1 !== 'R' && v1 !== 'H' && v1 !== 'M'))
                        c += "\u094d";
                    continue;
                }
                if (t1 === 'C') {
                    try_ = this.char(v + v1);
                    if (try_) {
                        c += try_;
                        i++;
                        d = true;
                        continue;
                    };
                    c += this.char(v);
                    if ((v1 !== 'R' && v1 !== 'H' && v1 !== 'M') && (v !== 'R' && v !== 'H' && v !== 'M'))
                        c += "\u094d";
                } else {
                    try_ = this.char(v + v1);
                    if (try_) {
                        c += try_;
                        i++;
                        d = true;
                        continue;
                    };
                    c += this.char(v);
                }
            } else if (t === 'V') {
                if (t1 === 'V') {
                    try_ = (t0 === 'C') ? this.modifier(v + v1) : this.char(v + v1);
                    if (try_) {
                        c += try_;
                        i++;
                        continue;
                    }
                    c += ((v0 && t0 !== 'C') || !v0) ? this.char(v) : this.modifier(v);
                } else {
                    c += ((v0 && t0 !== 'C') || !v0) ? this.char(v) : this.modifier(v);
                }
            } else if (t === 'N') {
                c += this.number(v);
            } else if (t === 'D') {
                c += (t1 === 'N') ? this.number(v) : this.char(v);
            } else if ((v === '^' || v === '*') && (v0 && (t0 === 'V' || t0 === 'C'))) {
                c += this.modifier(v)
            } else if (v === '_' && (v0 && t0 === 'C')) {
                c += "\u094d";
            } else
                c += v;
        };
        return c;
    }, 
    roman: function(a) {
        var b = a.split(''), out = '';
        for (var i = 0; i < b.length; i++) {
            curr = this.getMapper(b[i]);
            next = (i < b.length) ? this.getMapper(b[i + 1]) : false;
            if (this.type(curr) == 'C' && next && next != '.' && this.type(next) == 'C')
                out += curr + (this.type(curr[curr.length - 1]) == 'C' ? 'a' : '');
            else
                out += ((curr == '.') ? '' : (curr == '?' ? '.' : curr));
        };
        return out;
    }, 
    getPos: function(a) {
        return a.selectionStart;
    }, 
    setPos: function(a, b) {
        a.setSelectionRange(b, b);
    }, 
    translit: function(a) {
        that = a.target || a.srcElement || a.currentTarget;
        k = ('which'in a) ? a.which : a.keyCode;
        if (k == 32 || k == 13 || k == 8) {
            if (that.getAttribute('data-transliter') == 'pause')
                return;
            var b = jTransliter.getPos(that), string = that.value, subs = string.substr(0, b), parts = subs.split(/[\s]+/), last = parts[parts.length - 1], before = '';
            if (k != 8 && last.match(/[a-z0-9.]+/i)) {
                before = string.substr(0, b - last.length) + jTransliter.unicode(last);
            };
            if (k == 8 && last) {
                if (last.match(/^[a-z0-9.]+$/i))
                    return;
                before = string.substr(0, b - last.length) + jTransliter.roman(last);
            };
            if (before) {
                that.value = before + string.substr(b, string.length);
                jTransliter.setPos(that, before.length);
            }
        }
    }, 
    getMapper: function(a) {
        for (var b in this.chr) {
            if (this.chr[b] == a)
                return b == '.' ? '_' : b;
        };
        for (var b in this.mod) {
            if (this.mod[b] == a)
                return b;
        };
        for (var b in this.num) {
            if (this.num[b] == a)
                return b;
        };
        return a;
    }
};

// Handy wrapper 
function dgi(i) {
    return document.getElementById(i);
};

// live translit
dgi('jtrans-area').addEventListener('keydown', jTransliter.translit);

// HotKey actions
document.addEventListener('keydown', function(a) {
    var b = dgi('jtrans-area'), c = dgi('jtrans-info');
    var k = ('which'in event) ? event.which : event.keyCode;
    if (k == 17) {
        if (b.getAttribute('data-transliter') == 'resume') {
            b.setAttribute('data-transliter', 'pause');
            c.innerHTML = 'Paused. Ctrl = Resume | Esc = Close.';
        } else {
            b.setAttribute('data-transliter', 'resume');
            c.innerHTML = 'Active. Ctrl = Pause | Esc = Close.';
        }
    }
});

// copy and save
dgi("jtrans-copy").addEventListener('click', function(c) {
    dgi('jtrans-area').focus();
    dgi('jtrans-area').select();
    document.execCommand("Copy");
    if (window.localStorage) {
        localStorage.setItem('latestText', dgi('jtrans-area').value);
    }
    dgi("jtrans-copy").innerHTML = 'Copied';
    var cp = setTimeout(function(){
        dgi("jtrans-copy").innerHTML = 'Copy';
        window.clearInterval(cp);
    }, 1000);
}, false);

// clear and delete 
dgi("jtrans-clear").addEventListener('click', function(c) {
    dgi('jtrans-area').focus();
    dgi('jtrans-area').value = '';
    if (window.localStorage) {
        localStorage.setItem('latestText', dgi('jtrans-area').value);
    }
    dgi("jtrans-clear").innerHTML = 'Cleared';
    var cl = setTimeout(function(){
        dgi("jtrans-clear").innerHTML = 'Clear';
        window.clearInterval(cl);
    }, 1000);
}, false);

// load latest text and build usage help 
document.addEventListener('DOMContentLoaded', function(l) {
    if (window.localStorage) {
        dgi('jtrans-area').value = localStorage.getItem('latestText');
    }
    var a = ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'ai', 'o', 'au', 'a*', 'aH', '', 'k', 'kh', 'g', 'gh', 'ng', 'ch', 'x', 'j', 'jh', 'yn', 'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n', 'p', 'f', 'b', 'v', 'm', 'y', 'r', 'l', 'w', 's', 'S', 'sh', 'h', 'ksh', 'tr', 'Gy'];
    var b = '<tr>';
    for (var i = 0; i < a.length; i++) {
        if (a[i])
            b += '<td class="jtrans-click"><span class="lt">' + jTransliter.unicode(a[i]) + '</span><span class="rt">' + a[i] + '</span></td>';
        if (i && i % 12 == 0) {
            b += '</tr><tr>';
        }
    }
    dgi("jtrans-help-text").innerHTML = b;
});

// toggle help
dgi("jtrans-help").addEventListener('click', function(c) {
    dgi("jtrans-help-text").style.display = dgi("jtrans-help-text").style.display == 'none' ? 'block' : 'none';
});

// save on collapse
window.addEventListener('unload', function() {
    if (window.localStorage && dgi('jtrans-area').value) {
        localStorage.setItem('latestText', dgi('jtrans-area').value);    
    }
});

// type just readily !
dgi('jtrans-area').focus();