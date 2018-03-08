/*
 *
 * 
 * 
 * 
 * JavaScript - lSelect
 * 
 */

(function($) {
	$.fn.extend({
		lSelect: function(options) {
			var settings = {
				choose: "请选择...",
				emptyValue: "",
				cssStyle: {"margin-right": "4px"},
				url: null,
				type: "GET",
				extend:null,
				address:null,
				timer:0
			};
			$.extend(settings, options);

			var cache = {};
			return this.each(function() {
				var $input = $(this);
				var id = $input.val();
				var treePath = $input.attr("treePath");
				var selectName = $input.attr("name") + "_select";


				if (treePath != null && treePath != "") {
					var ids = (treePath + id + ",").split(",");
					var $position = $input;
					for (var i = 1; i < ids.length; i ++) {
						$position = addSelect($position, ids[i - 1], ids[i]);
					}

					settings.timer ++;
				} else {
					addSelect($input, null, null);
					settings.timer ++;
				}

				function addSelect($position, parentId, currentId) {



					/*if (null != address && "" != address) {
						var address = $("#" + settings.address);
						var addressVal1 = address.val();
						var addressVal2 = $("*[name='areaCode_select']").find("option:selected").text();
						var add1 =  addressVal1.substring(0,addressVal1.indexOf("省")+1);
						var add2 =  addressVal2.substring(0,addressVal2.indexOf("省")+1);
						/!*	if (add2 == null || add2 == "") {
						 add2 =  addressVal2.substring(0,addressVal2.indexOf("市")+1);
						 }*!/
						console.log("add1:" + add1)
						console.log("add2:" + add2)

						console.log("addressVal1:" + addressVal1)
						console.log("addressVal2:" + addressVal2)

						var lastAdd = '';
						if (settings.timer == 0) {
							lastAdd = addressVal1;
						} else if (  add2 == ""  ) {
							add2 =  $("*[name='areaCode_select']:first").find("option:selected").text();
							console.log("addddddddddddddddd2:" + add2)
							if (add1 == "") {
								add1 =  addressVal1.substring(0,add2.length);
							}
							if (add2 != add1) {
								lastAdd = add2;
							}else {
								add2 =  $("*[name='areaCode_select']:first").find("option:selected").text();
								lastAdd = addressVal2;
							}
						}else if (add1 == add2  ) {
							lastAdd = addressVal2;
						}else if (add1 != add2) {
							lastAdd = add2;
						}
						lastAdd = lastAdd.replace(/请选择.../g,"");
						console.log("lastAdd:" + lastAdd)
						address.val(lastAdd);
						address.css('display','block');
						console.log(address);
					}*/



					$position.nextAll("select[name=" + selectName + "]").remove();
					/***
					 * 自动填充详细地址开始
					 * @type {*|HTMLElement}
					 */
					if (null != settings.address && "" != settings.address) {
						var address = $("#" + settings.address);
						var addressVal1 = address.val();
						var addressVal2 = $("*[name='areaCode_select']").find("option:selected").text();

						console.log("addressVal1:" + addressVal1)
						console.log("addressVal2:" + addressVal2)

						var lastAdd = '';
						if (settings.timer == 0) {
							lastAdd = addressVal1;
						} else {
							lastAdd = addressVal2;
						}
						lastAdd = lastAdd.replace(/请选择.../g,"");
						console.log("lastAdd:" + lastAdd)
						address.val(lastAdd);
						address.css('display','block');
						console.log(address);
					}
					/***
					 * 自动填充详细地址结束
					 * @type {*|HTMLElement}
					 */

					if ($position.is("select") && (parentId == null || parentId == "")) {
						return false;
					}
					if (cache[parentId] == null) {
						$.ajax({
							url: settings.url,
							type: settings.type,
							data: parentId != null ? {parentId: parentId} : null,
							dataType: "json",
							cache: false,
							async: false,
							success: function(data) {
								cache[parentId] = data;
							}
						});
					}
					var data = cache[parentId];
					if ($.isEmptyObject(data)) {
						return false;
					}
					var select = '<select name="' + selectName + '">';
					if (settings.emptyValue != null && settings.choose != null) {
						select += '<option value="' + settings.emptyValue + '">' + settings.choose + '</option>';
					}
					$.each(data, function(value, name) {
						if(value == currentId) {
							select += '<option value="' + value + '" selected="selected">' + name + '</option>';
						} else {
							select += '<option value="' + value + '">' + name + '</option>';
						}
					});
					select += '</select>';
					return $(select).css(settings.cssStyle).insertAfter($position).bind("change", function() {
						var $this = $(this);
						if ($this.val() == "") {
							var $prev = $this.prev("select[name=" + selectName + "]");
							if ($prev.size() > 0) {
								$input.val($prev.val());
							} else {
								$input.val(settings.emptyValue);
							}
						} else {
							$input.val($this.val());
							console.log(settings.extend)

							if (null != settings.extend) {
								console.log($(settings.extend))
								$("#"+settings.extend).hide();
							}
						}
						addSelect($this, $this.val(), null);

					});
				}
			});

		}
	});
})(jQuery);