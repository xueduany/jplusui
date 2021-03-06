/**
 * @author xuld
 */


using("Controls.Suggest.Suggest");

var EmailSuggest = Suggest.extend({

    mails: " @126.com @139.com @163.com @gmail.com @hotmail.cn @hotmail.com @qq.com @sina.com @sohu.com @vip.163.com @vip.qq.com @yahoo.cn @yahoo.com.cn".split(' '),

    getSuggestItems: function (value) {

        if (!value)
            return null;

        var r = [], v = value.indexOf('@') !== -1 ? value.substr(0, value.indexOf('@')) : value;

        this.mails.each(function (m) {
            if ((v + m).indexOf(value) === 0)
                r.push(v + m);
        });


        return r;

    }

});