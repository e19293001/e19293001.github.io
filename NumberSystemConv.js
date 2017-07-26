var enumstates = {
    dec: 0,
    hex: 1,
    oct: 2,
    bin: 3
};

var state = enumstates.dec;

window.onload = function() {

    var current,
        screen,
        screen_hex,
        screen_dec,
        screen_oct,
        screen_bin,
        output,
        limit,
        zero,
//        period,
        signval,
        exponentval,
        fractionval,
        num;
    
    screen = document.getElementById("result");
    screen_hex = document.getElementById("hex-result");
    screen_dec = document.getElementById("dec-result");
    screen_oct = document.getElementById("oct-result");
    screen_bin = document.getElementById("bin-result");
    signval = document.getElementById("sign");
    exponentval = document.getElementById("exponent");
    fractionval = document.getElementById("fraction");

    var elem = document.querySelectorAll(".num");
    var len = elem.length;
    for(var i = 0; i < len; i++ ) {
        elem[i].addEventListener("click",function() {
            num = this.value;
            output = screen.innerHTML +=num;
            limit = output.length;
            if(limit > 30 ) {
                alert("Sorry no more input is allowed");
            }
        },false);
    } 

    document.querySelector(".zero").addEventListener("click",function() {
        zero = this.value;
        if(screen.innerHTML === "") {
            output = screen.innerHTML = zero;
        }
        //else if(screen.innerHTML === output) {
        else {
            output = screen.innerHTML +=zero;
        }
        console.log("zero pressed\n");
    },false);

    function seerch(inptstr, ch) {
        var x;
        for (x = 0; x < inptstr.length; x++) {
            if (inptstr[x] == ch) {
                return true;
            }
        }
        return false;
    }
    
    document.querySelector("#eqn-bg").addEventListener("click",function() {
        if (!seerch(screen.innerHTML,".")) {
            if (screen.innerHTML == "") {
                screen.innerHTML = "0.";
            }
            else {
                screen.innerHTML += ".";
            }
        }
        if (!seerch(screen_hex.innerHTML,".")) {
            if (screen_hex.innerHTML == "") {
                screen_hex.innerHTML = "0.";
            }
            else {
                screen_hex.innerHTML += ".";
            }
        }
        if (!seerch(screen_bin.innerHTML,".")) {
            if (screen_bin.innerHTML == "") {
                screen_bin.innerHTML = "0.";
            }
            else {
                screen_bin.innerHTML += ".";
            }
        }
        if (!seerch(screen_dec.innerHTML,".")) {
            if (screen_dec.innerHTML == "") {
                screen_dec.innerHTML = "0.";
            }
            else {
                screen_dec.innerHTML += ".";
            }
        }
        if (!seerch(screen_oct.innerHTML,".")) {
            if (screen_oct.innerHTML == "") {
                screen_oct.innerHTML = "0.";
            }
            else {
                screen_oct.innerHTML += ".";
            }
        }
    },false);
    
    document.querySelector("#delete").addEventListener("click",function() {
        screen.innerHTML = "";
        screen_hex.innerHTML = "";
        screen_dec.innerHTML = "";
        screen_oct.innerHTML = "";
        screen_bin.innerHTML = "";
        signval.innerHTML = "";
        exponentval.innerHTML = "";
        fractionval.innerHTML = "";
        console.log("delete pressed");
    },false);
    
    document.querySelector("#dec").addEventListener("click",function() {
        activateBtn("dec");
        console.log("dec pressed");

        var disp;
        if (state == enumstates.bin) {
            disp = BinToDecimal(screen.innerHTML);
        }
        else if (state == enumstates.hex) {
            disp = HexToDecimal(screen.innerHTML);
        }
        else if (state == enumstates.oct) {
            disp = OctToDecimal(screen.innerHTML);
        }
        if (disp.length > 0) {
            screen.innerHTML = disp;
        }
        else {
            screen.innerHTML = "";
        }
        updateButtons("dec");
        state = enumstates.dec;
    },false);

    document.querySelector("#hex").addEventListener("click",function() {
        activateBtn("hex");
        console.log("hex pressed");
        var disp;
        if (state == enumstates.bin) {
            disp = BinToHexadecimal(screen.innerHTML);
        }
        else if (state == enumstates.dec) {
            disp = DecToHexadecimal(screen.innerHTML);
        }
        else if (state == enumstates.oct) {
            disp = OctToHexadecimal(screen.innerHTML);
        }

        if (disp.length > 0) {
            screen.innerHTML = disp;
        }
        else {
            screen.innerHTML = "";
        }
        updateButtons("hex");
        state = enumstates.hex;
    },false);

    function OctToHexadecimal(inptstr) {
        var ret;
        ret = BinToHexadecimal(OctToBinary(inptstr));
        return ret;
    }

    document.querySelector("#oct").addEventListener("click",function() {
        activateBtn("oct");
        console.log("oct pressed");
        var disp;
        if (state == enumstates.dec) {
            disp = DecToOctal(screen.innerHTML);
        }
        else if (state == enumstates.bin) {
            disp = BinToOctal(screen.innerHTML);
        }
        else if (state == enumstates.hex) {
            disp = HexToOctal(screen.innerHTML);
            disp = removeZerosHead(disp);
        }

        if (disp.length > 0) {
            screen.innerHTML = disp;
        }
        else {
            screen.innerHTML = "";
        }
        updateButtons("oct");
        state = enumstates.oct;
    },false);

    function HexToOctal(inptstr) {
        var ret;
        ret = BinToOctal(HexToBinary(inptstr));
        return ret;
    }
    
    document.querySelector("#plusminus").addEventListener("click",function() {
        if(screen.innerHTML != "") {
            if (!seerch(screen.innerHTML, "-")) {
                screen.innerHTML = "-" + screen.innerHTML;
            }
            else {
                screen.innerHTML = screen.innerHTML.substr(1,screen.innerHTML.length);
            }
        }
    },false);

    document.querySelector("#bin").addEventListener("click",function() {
        activateBtn("bin");
        console.log("bin pressed");
        var disp;
        if (state == enumstates.dec) {
            disp = DecToBinary(screen.innerHTML);
            disp = removeZerosHead(disp);
        }
        else if (state == enumstates.hex) {
            disp = HexToBinary(screen.innerHTML);
            disp = removeZerosHead(disp);
        }
        else if (state == enumstates.oct) {
            disp = OctToBinary(screen.innerHTML);
            disp = removeZerosHead(disp);
        }
        if (disp.length > 0) {
            screen.innerHTML = disp;
        }
        else {
            screen.innerHTML = "";
        }
        updateButtons("bin");
        state = enumstates.bin;
    },false);

    function OctToDecimal(inptstr) {
        var inptstr1, inptstr2;
        [inptstr1, inptstr2] = splitFromDot(inptstr);

        inptstr1 = reverse(inptstr1);
        if (inptstr1.length <= 0) {
            return "";
        }
        var ret1 = 0;
        var ret2 = 0;
        var x = 0;

        for (x = 0; x < inptstr1.length; x++) {
            ret1 += Math.pow(8,x) * HexToDigit(inptstr1[x]);
        }

        for (x = 0; x < inptstr2.length; x++) {
            ret2 += (1/Math.pow(8,x+1)) * HexToDigit(inptstr2[x]);
        }

        return ret1 + ret2;
    }

    function HexToDecimal(inptstr) {
        var inptstr1, inptstr2;
        [inptstr1, inptstr2] = splitFromDot(inptstr);

        inptstr1 = reverse(inptstr1);
        if (inptstr1.length <= 0) {
            return "";
        }
        var ret1 = 0;
        var ret2 = 0;
        var x = 0;

        for (x = 0; x < inptstr1.length; x++) {
            ret1 += Math.pow(16,x) * HexToDigit(inptstr1[x]);
        }

        for (x = 0; x < inptstr2.length; x++) {
            ret2 += (1/Math.pow(16,x+1)) * HexToDigit(inptstr2[x]);
        }

        return ret1 + ret2;
    }

    function BinToDecimal(inptstr) {
        var inptstr1, inptstr2;

        [inptstr1, inptstr2] = splitFromDot(inptstr);
        var ret1 = 0;
        var ret2 = 0;
        var x = 0;

        inptstr1 = reverse(inptstr1);
        if (inptstr1.length <= 0) {
            return "";
        }

        for (x = 0; x < inptstr1.length; x++) {
            if (inptstr1[x] == "1") {
                ret1 += Math.pow(2,x);
            }
        }

        for (x = 0; x < inptstr2.length; x++) {
            if (inptstr2[x] == "1") {
                ret2 += (1/Math.pow(2,x+1));
            }
        }

        ret2 = ret2.toString();
        ret2 = ret2.substr(2,ret2.length);
        if (ret2 == "") {
            return ret1;
        }
        return ret1 + "." + ret2;
    }

    function BinToDecimal2(inptstr) {
        var linptstr = reverse(inptstr);
        var ret = 0;
        var x = 0;

        if (linptstr.length <= 0) {
            return "";
        }

        for (x = 0; x < linptstr.length; x++) {
            if (linptstr[x] == "1") {
                ret += Math.pow(2,x);
            }
            else if (linptstr[x] == "0") {
            }
            else {
                return "";
            }
        }
        console.log("BinToDecimal: " + ret);
        return ret.toString();
    }

    function DecToBinary2(inptstr) {
        if (inptstr.length <= 0) {
            return "";
        }

        var x;
        var inpt = parseInt(inptstr,10);
        var ret = "";

        if (inpt > 4294967295) {
            alert("maximum of 4294967295 only.");
        }

        for (x = 31; x >= 0; x--) {
            if (inpt & (1 << x)) {
                ret += "1";
            }
            else {
                ret += "0";
            }
        }
        console.log("DecToBinary: " + ret);
        return ret;
    }

    function splitFromDot(inptstr) {
        var x = 0;
        var y = 0;
        var str1 = "";
        var str2 = "";
        for (x = 0; x < inptstr.length;x++) {
            if (inptstr[x] == ".") {
                break;
            }
            else {
                str1 += inptstr[x];
            }
        }

        for (y = x+1; y < inptstr.length; y++) {
            str2 += inptstr[y];
        }

        return [str1,str2];
    }

    function DecToBinary(inptstr) {
        if (inptstr.length <= 0) {
            return "";
        }
        var inptstr1, inptstr2;

        [inptstr1,inptstr2] = splitFromDot(inptstr);

        var x;
        var inpt1 = parseInt(inptstr1,10);
        var inpt2 = parseFloat("."+inptstr2,10);
        var ret = "";

        if (inpt1 > 4294967295) {
            alert("maximum of 4294967295 only.");
        }

        for (x = 31; x >= 0; x--) {
            if (inpt1 & (1 << x)) {
                ret += "1";
            }
            else {
                ret += "0";
            }
        }
        if (inptstr2 != "") {
            ret += ".";
            var t = inpt2;

            for (x = 0; x < 32; x++) {
                t = t*2;

                if (t >= 1.0) {
                    t = t - 1;
                    ret += "1";
                }
                else {
                    ret += "0";
                }            
            }

            ret = removeZerosTail(removeZerosHead(ret));
            if (ret[0] == ".") {
                ret = "0" + ret;
            }
        }
        return ret;
    }

    //console.log("DecToBinary:" + DecToBinary("5"));

    function DecToHexadecimal(inptstr) {
        var linptstr = inptstr;
        var ret;
        if (linptstr.length <= 0) {
            return "";
        }
        ret = removeZerosHead(BinToHexadecimal(DecToBinary(inptstr)));
        
        return ret;
    }
    
    function HexToDigit(inpt) {
        var ret;
        if (inpt == "A") {
            ret = 10;
        }
        else if (inpt == "B") {
            ret = 11;
        }
        else if (inpt == "C") {
            ret = 12;
        }
        else if (inpt == "D") {
            ret = 13;
        }
        else if (inpt == "E") {
            ret = 14;
        }
        else if (inpt == "F") {
            ret = 15;
        }
        else {
            ret = parseInt(inpt,10);
        }
        //console.log("HexToDigit: " + ret);
        return ret;
    }

    function DigitToHex(inpt) {
        var ret;
        if (inpt == 10) {
            ret = "A";
        }
        else if (inpt == 11) {
            ret = "B";
        }
        else if (inpt == 12) {
            ret = "C";
        }
        else if (inpt == 13) {
            ret = "D";
        }
        else if (inpt == 14) {
            ret = "E";
        }
        else if (inpt == 15) {
            ret = "F";
        }
        else {
            ret = inpt.toString();
        }
        return ret;
    }

    function reverse(inptstr) {
        if (!inptstr) {
            return "";
        }
        else {
            return inptstr.split('').reverse().join('');
        }
    }

    function BinToHexadecimal(inptstr) {
        var inptstr1,inptstr2;
        [inptstr1,inptstr2] = splitFromDot(inptstr);
        var linptstr = reverse(inptstr1);
        var rinptstr = inptstr2;
        if (linptstr.length <= 0) {
            return "";
        }
        var ret1 = "";
        var ret2 = "";
        var x = 0;

        for (x = 0; x < linptstr.length; x+=4) {
            var hx = "";
            var y = 0;
            for (y = 0; y < 4; y++) {
                if (!linptstr[x+y] || linptstr[x+y] == ".") {
                    hx += "0";
                }
                else {
                    hx += linptstr[x+y];
                }
            }

            ret1 += DigitToHex(parseInt(BinToDecimal(reverse(hx)),10));
        }

        ret1 = reverse(ret1);

        for (x = 0; x < rinptstr.length; x+=4) {
            var hx = "";
            var y = 0;
            for (y = 0; y < 4; y++) {
                if (!rinptstr[x+y] || rinptstr[x+y] == ".") {
                    hx += "0";
                }
                else {
                    hx += rinptstr[x+y];
                }
            }

            ret2 += DigitToHex(parseInt(BinToDecimal(hx),10));
        }

        if (ret2 == "") {
            return ret1;
        }
        return ret1 + "." + ret2;
    }

    function BinToOctal(inptstr) {
        var inptstr1,inptstr2;
        [inptstr1,inptstr2] = splitFromDot(inptstr);
        var linptstr = reverse(inptstr1);
        var rinptstr = inptstr2;
        if (linptstr.length <= 0) {
            return "";
        }
        var ret1 = "";
        var ret2 = "";
        var x = 0;

        for (x = 0; x < linptstr.length; x+=3) {
            var hx = "";
            var y = 0;
            for (y = 0; y < 3; y++) {
                if (!linptstr[x+y] || linptstr[x+y] == ".") {
                    hx += "0";
                }
                else {
                    hx += linptstr[x+y];
                }
            }

            ret1 += DigitToHex(parseInt(BinToDecimal(reverse(hx)),10));
        }

        ret1 = reverse(ret1);

        for (x = 0; x < rinptstr.length; x+=3) {
            var hx = "";
            var y = 0;
            for (y = 0; y < 3; y++) {
                if (!rinptstr[x+y] || rinptstr[x+y] == ".") {
                    hx += "0";
                }
                else {
                    hx += rinptstr[x+y];
                }
            }

            ret2 += DigitToHex(parseInt(BinToDecimal(hx),10));
        }

        if (ret2 == "") {
            return ret1;
        }
        return ret1 + "." + ret2;
    }

    function DecToOctal(inptstr) {
        var linptstr = inptstr;
        var ret;
        if (linptstr.length <= 0) {
            return "";
        }
        ret = removeZerosHead(BinToOctal(DecToBinary(inptstr)));
        
        return ret;
    }

    function removeZerosTail(inptstr) {
        var ret = inptstr;
        var x = inptstr.length-1;
        while (inptstr[x] == "0") {
            ret = ret.substr(0,ret.length-1);
            x = x - 1;
        }
        if (!ret) {
            ret = "";
        }
        return ret;
    }

    function removeZerosTail_old(inptstr) {
        var ret = reverse(inptstr);
        var hd = reverse(inptstr);
        var x = 0;

        while (hd[x] == "0") {
            ret = ret.substr(1);
            x = x + 1;
        }
        if (!ret) {
            ret = "";
        }

        return reverse(ret);
    }

    function removeZerosHead(inptstr) {
        if (inptstr.length <= 0) {
            return "";
        }
        var ret = inptstr;
        var x = 0;

        while (inptstr[x] == "0" && x < inptstr.length-1) {
            var t = ret.substr(1);
            if (t) ret = ret.substr(1);
            x = x + 1;
        }

        if (!ret) {
            ret = "";
        }

        return ret;
    }

    function OctToBinary(inptstr) {
        var inptstr1, inptstr2;
        [inptstr1, inptstr2] = splitFromDot(inptstr);

        if (inptstr1.length <= 0) {
            return "";
        }
        var ret1 = "";
        var ret2 = "";
        var x = 0;

        for (x = 0; x < inptstr1.length; x++) {
            ret1 += DecToBinary(HexToDigit(inptstr1[x]).toString()).substr(29);
        }

        if (inptstr2 != "") {
            for (x = 0; x < inptstr2.length; x++) {
                ret2 += DecToBinary(HexToDigit(inptstr2[x]).toString()).substr(29);
            }

            return ret1 + "." + ret2;
        }

        return ret1;
    }

    //console.log("DecToBinary: " + DecToBinary("5"));
    //console.log("OctToBinary: " + OctToBinary("12345"));
    //console.log("OctToBinary: " + OctToBinary("12345.0"));
    //console.log("OctToBinary: " + OctToBinary("12345.0"));
    
    function HexToBinary(inptstr) {
        var inptstr1, inptstr2;
        [inptstr1, inptstr2] = splitFromDot(inptstr);
        
        if (inptstr1.length <= 0) {
            return "";
        }
        var ret1 = "";
        var ret2 = "";
        var x = 0;

        for (x = 0; x < inptstr1.length; x++) {
            ret1 += DecToBinary(HexToDigit(inptstr1[x]).toString()).substr(28);
        }

        if (inptstr2 != "") {
            for (x = 0; x < inptstr2.length; x++) {
                ret2 += DecToBinary(HexToDigit(inptstr2[x]).toString()).substr(28);
            }
            return ret1 + "." + ret2;                
        }

        //console.log("HexToBinary: " + ret1);
        return ret1;
    }

    function activateBtn(btn) {
        deactivateBtn();
        document.getElementById(btn).classList.remove("opera-bg");
        document.getElementById(btn).classList.add("opera-active-bg");
    }

    function deactivateBtn() {
        document.getElementById("hex").classList.remove("opera-active-bg");
        document.getElementById("dec").classList.remove("opera-active-bg");
        document.getElementById("oct").classList.remove("opera-active-bg");
        document.getElementById("bin").classList.remove("opera-active-bg");
        document.getElementById("hex").classList.add("opera-bg");
        document.getElementById("dec").classList.add("opera-bg");
        document.getElementById("oct").classList.add("opera-bg");
        document.getElementById("bin").classList.add("opera-bg");
    }

    var elem1 = document.querySelectorAll(".pwn3d");
    
    var len1 = elem1.length;
    
    for(var i = 0; i < len1; i++ ) {
        elem1[i].addEventListener("click",function() {
            //console.log("pwn3d clicked " + " i: " + i);
            UpdateMgaAmigo();
        },false);
    }
    
    function UpdateMgaAmigo() {
        var disp_hex;
        var disp_dec;
        var disp_oct;
        var disp_bin;
        if (state == enumstates.bin) {
            disp_hex = BinToHexadecimal(screen.innerHTML);
            screen_hex.innerHTML = disp_hex;
            disp_dec = BinToDecimal(screen.innerHTML);
            screen_dec.innerHTML = disp_dec;
            disp_oct = BinToOctal(screen.innerHTML);
            screen_oct.innerHTML = disp_oct;
            screen_bin.innerHTML = screen.innerHTML;
            updateButtons("bin");
        }
        else if (state == enumstates.dec) {
            disp_hex = DecToHexadecimal(screen.innerHTML);
            screen_hex.innerHTML = disp_hex;
            disp_oct = DecToOctal(screen.innerHTML);
            screen_oct.innerHTML = disp_oct;
            disp_bin = DecToBinary(screen.innerHTML);
            disp_bin = removeZerosHead(disp_bin);
            if (disp_bin == ".") {
                disp_bin = 0;
            }
            screen_bin.innerHTML = disp_bin;
            screen_dec.innerHTML = screen.innerHTML;
            updateButtons("dec");
        }
        else if (state == enumstates.oct) {
            disp_hex = OctToHexadecimal(screen.innerHTML);
            screen_hex.innerHTML = disp_hex;
            disp_dec = OctToDecimal(screen.innerHTML);
            screen_dec.innerHTML = disp_dec;
            disp_bin = OctToBinary(screen.innerHTML);
            disp_bin = removeZerosHead(disp_bin);
            screen_bin.innerHTML = disp_bin;
            screen_oct.innerHTML = screen.innerHTML;
            updateButtons("oct");
        }
        else if (state == enumstates.hex) {
            disp_dec = HexToDecimal(screen.innerHTML);
            screen_dec.innerHTML = disp_dec;
            disp_oct = HexToOctal(screen.innerHTML);
            disp_oct = removeZerosHead(disp_oct);
            screen_oct.innerHTML = disp_oct;
            disp_bin = HexToBinary(screen.innerHTML);
            disp_bin = removeZerosHead(disp_bin);
            screen_bin.innerHTML = disp_bin;
            screen_hex.innerHTML = screen.innerHTML;
            updateButtons("hex");
        }
        UpdateAmigoFloat(screen_bin.innerHTML);
    }

    //UpdateAmigoFloat();
    //UpdateAmigoFloat(DecToBinary("1313.3125"));
    //UpdateAmigoFloat(DecToBinary("-1313.3125"));

    function UpdateAmigoFloat(binval) {
        //var binval = screen_bin.innerHTML;

        //fractionval.innerHTML = binval;
        //binval = DecToBinary("1313.3125");
        //binval = DecToBinary("1313");
        //binval = DecToBinary("0.1015625");
        var x = 0;
        var exp;
        var str1,str2;
        var mantissa;
        // search for the decimal point
        console.log("binval: " + binval);
//        while (binval[x] != 1) {
//            x = x + 1;
//        }
//        for (x; x < binval.length; x++) {
//            if (binval[x] == ".") {
//                break;
//            }
//        }
//        exp = x - 1;
        [str1,str2] = splitFromDot(binval);
        signval.innerHTML = "0";
        console.log("*str1: " + str1);
        console.log("*str2: " + str2);
        console.log("--- " + str1[0]);
        if (str1.length < 32) {
            var y = 32 - str1.length;
            for (x = 0; x < y; x++) {
                str1 = "0" + str1;
            }
        }
        else {
            str1 = reverse(reverse(str1).substr(0,32));
        }

        if (str1[0] == "1") {
            var t = BinToDecimal(str1);
            t = ~t + 1;
            str1 = DecToBinary(t.toString());
            signval.innerHTML = "1";
        }

        if (signval.innerHTML == "0") {
            console.log("positive");
        }
        else {
            console.log("negative");
        }

        exp = removeZerosHead(str1).length - 1;
        console.log("exp: " + exp);

        console.log("str1: " + str1);
        console.log("str2: " + str2);
        mantissa = removeZerosHead(str1 + str2);
        //mantissa = str1.substr(1,str1.length) + str2;

        // discard the first 1
        console.log("mantissa: " + mantissa);
        mantissa = mantissa.substr(1,mantissa.length);
        console.log("mantissa: " + mantissa);
        // add zero padding
        if (mantissa.length < 23) {
            var y = 23 - mantissa.length;
            for (x = 0; x < y; x++) {
                mantissa = mantissa + "0";
            }
        }
        else {
            mantissa = mantissa.substr(0,22);
        }
        console.log("x: " + x);
        console.log("mantissa: " + mantissa);
        exp = DecToBinary((exp+127).toString()).substr(24,31);
        console.log("exp: " + exp);
        exponentval.innerHTML = exp;
        fractionval.innerHTML = mantissa;        
    }

    updateButtons("dec");
    function updateButtons(str) {
        if (str == "bin") {
            document.getElementById("one").disabled = false;
            document.getElementById("two").disabled = true;
            document.getElementById("three").disabled = true;
            document.getElementById("four").disabled = true;
            document.getElementById("five").disabled = true;
            document.getElementById("six").disabled = true;
            document.getElementById("seven").disabled = true;
            document.getElementById("eight").disabled = true;
            document.getElementById("nine").disabled = true;
            document.getElementById("eey").disabled = true;
            document.getElementById("bee").disabled = true;
            document.getElementById("see").disabled = true;
            document.getElementById("dee").disabled = true;
            document.getElementById("iee").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("plusminus").disabled = true;
        }
        else if (str == "oct") {
            document.getElementById("one").disabled = false;
            document.getElementById("two").disabled = false;
            document.getElementById("three").disabled = false;
            document.getElementById("four").disabled = false;
            document.getElementById("five").disabled = false;
            document.getElementById("six").disabled = false;
            document.getElementById("seven").disabled = false;
            document.getElementById("eight").disabled = true;
            document.getElementById("nine").disabled = true;
            document.getElementById("eey").disabled = true;
            document.getElementById("bee").disabled = true;
            document.getElementById("see").disabled = true;
            document.getElementById("dee").disabled = true;
            document.getElementById("iee").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("plusminus").disabled = true;
        }
        else if (str == "hex") {
            document.getElementById("one").disabled = false;
            document.getElementById("two").disabled = false;
            document.getElementById("three").disabled = false;
            document.getElementById("four").disabled = false;
            document.getElementById("five").disabled = false;
            document.getElementById("six").disabled = false;
            document.getElementById("seven").disabled = false;
            document.getElementById("eight").disabled = false;
            document.getElementById("nine").disabled = false;
            document.getElementById("eey").disabled = false;
            document.getElementById("bee").disabled = false;
            document.getElementById("see").disabled = false;
            document.getElementById("dee").disabled = false;
            document.getElementById("iee").disabled = false;
            document.getElementById("eff").disabled = false;
            document.getElementById("plusminus").disabled = true;
        }
        else if (str == "dec") {
            document.getElementById("one").disabled = false;
            document.getElementById("two").disabled = false;
            document.getElementById("three").disabled = false;
            document.getElementById("four").disabled = false;
            document.getElementById("five").disabled = false;
            document.getElementById("six").disabled = false;
            document.getElementById("seven").disabled = false;
            document.getElementById("eight").disabled = false;
            document.getElementById("nine").disabled = false;
            document.getElementById("eey").disabled = true;
            document.getElementById("bee").disabled = true;
            document.getElementById("see").disabled = true;
            document.getElementById("dee").disabled = true;
            document.getElementById("iee").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("plusminus").disabled = false;
        }
        else {
            alert("internal error.");
            document.getElementById("one").disabled = true;
            document.getElementById("two").disabled = true;
            document.getElementById("three").disabled = true;
            document.getElementById("four").disabled = true;
            document.getElementById("five").disabled = true;
            document.getElementById("six").disabled = true;
            document.getElementById("seven").disabled = true;
            document.getElementById("eight").disabled = true;
            document.getElementById("nine").disabled = true;
            document.getElementById("eey").disabled = true;
            document.getElementById("bee").disabled = true;
            document.getElementById("see").disabled = true;
            document.getElementById("dee").disabled = true;
            document.getElementById("iee").disabled = true;
            document.getElementById("eff").disabled = true;
            document.getElementById("plusminus").disabled = true;
        }
    }
}

