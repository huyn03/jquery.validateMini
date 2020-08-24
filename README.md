# JQUERY validateMini

mini js script for form validation. You can add new custom and use it very easy.

## Getting Started

this script help you validate data in frontend before submit data for backend.

### Prerequisites

```
JQUERY
```
```
jquery.validateMini
```

### Installing

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```
and
```
<script src="assets/js/jquery.validateMini.min.js></script>
```

## Running the tests

Html
```
<form>
    <div class="form-group">
        <label>Username</label>
        <input validates="required|test:3,6" name="username" type="text" class="form-control" value="">
    </div>
    <div class="form-group">
        <label>Password</label>
        <input validates="required|between:6,15|strong" id="Password" name="password" type="password" class="form-control" value="">
    </div>
    <input type="submit" name="" value="send" class="form-control">
</form>
```

JavaScript
```
$('form').validateMini({
	validates: {
		test: (params, value)=> {
			return `Params of valid test: ${params[0]} and ${params[1]}`;
		},
		strong: (params, value)=>{
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value) || "Yêu cầu chữ cái, số, in hoa và ký tự"
		},
	}

});
```

## Built With

* [JQUERY](https://jquery.com/) - The javascript framework used

## Authors

**Đinh Thanh Huy** [DrHuy](https://github.com/huyn03)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks for used
* It help for you: donate me 1$: https://paypal.me/huy03