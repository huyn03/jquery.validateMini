// params 
// { 
//   useKeyup(bool), 
//   useBlur(bool), 
//   useFocus(bool),
//   validates: opject 
// }
$.fn.validateMini = function(options = {}){
    
    let inputs  = this.find('[validates]');
    let useKeyup = true;
    let useFocus = true;
    let useBlur  = true;

    if(options.useKeyup)
        useKeyup = useKeyup;
    if(options.useFocus)
        useFocus = useFocus;
    if(options.useBlur)
        useBlur = useBlur;

    this.submit(function(){

        let flag    = true;

        for(let i=0; i< inputs.length; i++){
            let input       = $(inputs[i]);
            let validates   = input.attr('validates'); 
            let value       = input.val();
            let result      = doValidate(validates, value);
            makeDom(input, result);
            if(result !== true)
                flag = false;
        }
        return flag;

    });

    if(useKeyup)
    inputs.keyup(e=> {
        let input       = $(e.target);
        let validates   = input.attr('validates'); 
        let value       = input.val();
        let result      = doValidate(validates, value);
        makeDom(input, result);
    });
    
    if(useBlur)
    inputs.blur(e=> {
        let input       = $(e.target);
        let validates   = input.attr('validates'); 
        let value       = input.val();
        let result      = doValidate(validates, value);
        makeDom(input, result);
    });
    
    if(useFocus)
    inputs.focus(e=> {
        let input = $(e.target);
        makeDom(input,-1);
    });


    let baseValidates = {
        required: (params, value)=> { 
            return value != "" || `value is empty!`
        },
        email: (params, value)=> {
            return /\S+@\S+\.\S+/.test(value) || `value is not an email!`;
        },
        between: (params, value)=>{ 
            let min = params[0], max = params[1];
            let len = value.length; 
            return min <= len && len <= max || `value required form ${min} to ${max} character!`
        },
        min: (params, value)=> { 
            let min = params[0];
            return min <= value.length || `value smaller ${min} character!` 
        },
        max: (params, value)=> { 
            let max = params[0];
            return max >= value.length || `value bigger ${max} character!`
        },
        numeric: (params, value)=> {
            return !isNaN(value) || `value is not a number!`;
        },
        num_min: (params, value)=> { 
            let min = params[0];
            return min <= parseInt(value) || `value bigger ${min} required!` 
        },
        num_max: (params, value)=> {
            let max = params[0]; 
            return max >= parseInt(value) || `value smaller ${max} required!`
        },
        num_between: (params, value)=> { 
            let min = params[0], max = params[1];
            value = parseInt(value);
            return min <= value && value <= max || `value bigger ${min} and smaller ${max} required!`
        },
        same: (params, value)=>{
            let other = $('#'+ params[0]).val();
            return other === value || `value not match ${params[0]}`
        },
    };

    let validateOptions = {...baseValidates, ...options.validates};

    function doValidate(strValidates = null, value = null){
        if(!strValidates)
            return true;

        valids = strValidates.split('|');

        for(i = 0; i < valids.length; i++){
            let valid       = valids[i];
            let subvalids   = valid.split(':') || null;
            if(!validateOptions[subvalids[0]])
                continue;
            let params = subvalids[1]? subvalids[1].split(','): null;
            let r = validateOptions[subvalids[0]](params, value);
            if (r !== true)
                return r;
        }

        return true;
    }

    function makeDom(input, result){

        let parent = input.parent();
        let txtError = parent.find('div.error-text');
        if(txtError.length === 0)
            txtError = $(`<div class="error-text">${result}</div>`);
        txtError.html(result);

        if(result === true){
            input.removeClass('valid-error');
            input.addClass('valid-pass');
            txtError.remove();
        }
        else if(result === -1){
            input.removeClass('valid-pass');
            input.removeClass('valid-error');
            txtError.remove();
        }else{
            input.removeClass('valid-pass');
            input.addClass('valid-error');
            parent.append(txtError[0]);
        }
    }
}