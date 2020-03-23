/**
 * boxClass: 放置容器class
 * textArray：文本数组
 * title: 文章标题
 * signature: 署名
 * text: 文本
 * textArray: 文本截取的数组
 * isEnd: 是否结束
 * paragraphLength：段落长度
 * paragraphIndex：当前所在段落
 * textLength：当前文本长度
 * textIndex：当前所在文本的位置
*/
function WRITE (obj) {
    this.boxClass = obj.box
    this.title = obj.title || null
    this.signature = obj.signature || null
    this.text = obj.text || 'Hello World!'
    this.textArray = this.text.split('\n')
    this.paragraphLength = this.textArray.length
    this.paragraphIndex = 0
    this.textLength = this.textArray[this.paragraphIndex].length
    this.textIndex = 0
    this.isEnd = false
    
    var _this = this
    if(this.title && this.title != '') {
        this.newTitle()
    }else{
        this.newParagraph()
    }
}

WRITE.prototype.newTitle = function () {
    var h = '<h1 class="write-h1"><span class="cursor">&nbsp;</span></h1>'
    $(this.boxClass).append(h)
    var timer = window.setTimeout(function(){
        this.addText(this.title)
    }.bind(this),3000)
}

WRITE.prototype.newParagraph = function () {
    var p = '<p class="write-p" data-index="' + this.paragraphIndex + '"><span class="cursor">&nbsp;&nbsp;&nbsp;</span></p>'
    $(this.boxClass).append(p)
    var timer = window.setTimeout(function(){
        this.addParagraph()
    }.bind(this),3000)
}

WRITE.prototype.newSignature = function () {
    if(this.isEnd === false){
        var p = '<p class="write-signature">——&nbsp;<span class="cursor">&nbsp;&nbsp;&nbsp;</span></p>'
        $(this.boxClass).append(p)
        var timer = window.setTimeout(function(){
            this.addText(this.signature)
            this.isEnd = true
        }.bind(this),3000)
    }
}

WRITE.prototype.addParagraph = function () {
    if (this.textArray[this.paragraphIndex]) {
        this.addText(this.textArray[this.paragraphIndex])
    }else if(this.signature){
        $('.cursor').remove()
        this.newSignature()
    }
}

WRITE.prototype.addText = function (text) {
    if (text && text.length > 0) {
        var _this = this
        var $cursor = $('.cursor')
        var length = text.length
        var timer2 = null
        var audio = $('audio')[0]
        var timer = window.setInterval( function () {
            if(_this.textIndex < length && (text[_this.textIndex] == ',' || text[_this.textIndex] == '，' || text[_this.textIndex] == '.') || text[_this.textIndex] == '。'){
                audio.pause()
                clearInterval(timer)
                timer = null
                $cursor.before(text[_this.textIndex])
                _this.textIndex++
                timer2 = setTimeout(function(){
                    _this.addText(text)
                },1300)
            }else if(_this.textIndex < length){
                audio.play()
                $cursor.before(text[_this.textIndex])
                _this.textIndex++
            }else{
                audio.pause()
                clearInterval(timer)
                timer = null
                _this.paragraphIndex++
                _this.textIndex = 0
                $cursor.remove()
                _this.newParagraph()
            }
        }, 150)
    } else {

    }
}