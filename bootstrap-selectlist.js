!function ($) {

  "use strict"; // jshint ;_;


 /* SelectList CLASS DEFINITION
  * ========================= */

  var SelectList = function (element, options) {
    var that = this

    this.options = $.extend({}, $.fn.selectlist.defaults, options)

    this.$element = $(element)
    this.$options = this.$element.children()

    this.createTemplateElements()

    this.fulfillList()    

    // bind clicks
    this.$dropdownList.on('click.selectlist.data-api', 'a', function(e){
      e.preventDefault(this)
      that.elementClick(this)
    })

    // add dropdown list
    this.$dropdown.insertAfter(this.$element)
    // remove original select
    this.$element.remove()
  }

  SelectList.prototype = {

      constructor: SelectList

    , createTemplateElements: function(){
        this.$dropdown = $(this.options.template)

        this.$button_visible = this.$dropdown.find('.btn:eq(0)')
        this.$input = this.$dropdown.find('input')
        this.$dropdownList = this.$dropdown.find('ul')

        // set input name
        this.$input.attr('name', this.$element.attr('name'))
      }

    , fulfillList: function(){
        var that = this
          , active_link

        $.each(this.$options, function(index){
          var link = $(that.options.templateOption)
            , link_a = link.find('a')

          link_a.data('value', this.getAttribute('value'))
          link_a.text(this.text)

          if(index == 0 || this.getAttribute('selected')){
            that.$button_visible.text(this.text)
            active_link = link_a
          }

          that.$dropdownList.append(link)
        })

        active_link.addClass('active')
      }

    , elementClick: function(link){
        var $link = $(link)
        if(this.$input.val() != $link.data('value')){
          this.$dropdownList.find('a').removeClass('active')
          $link.addClass('active')

          this.$button_visible.text($link.text())
          this.$input.val($link.data('value'))
        }
      }
  }


 /* SelectList PLUGIN DEFINITION
  * ========================== */

  $.fn.selectlist = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('selectlist')
        , options = typeof option == 'object' && option

      if (!data) $this.data('selectlist', (data = new SelectList(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.selectlist.Constructor = SelectList

  $.fn.selectlist.defaults = {
      template: '<div class="btn-group"><button class="btn" data-toggle="dropdown"></button><button class="btn dropdown-toggle" data-toggle="dropdown"><i class="icon icon-arrow-white-down"></i></button><input type="hidden" value="" name=""><ul class="dropdown-menu"></ul></div>'
    , templateOption: '<li><a href="#"></a></li>'
  }

  /* SelectList DATA-API
  * ================= */
  $(function () {
    $('select.selectlist').each(function () {
      var $this = $(this)
        , data = $this.data()

      $this.selectlist(data)
    })
  })

}(window.jQuery);