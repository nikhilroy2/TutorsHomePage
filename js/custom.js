$(document).ready(function () {


    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";
            /*(selected.text().includes("Select") ? "" : selected.text()) : "";*/
            if (value.includes("City1")) {
                this.input = $('<i class="fa fa-map-marker location-icon-bg-dark"></i><input>')
                    .appendTo(this.wrapper)
                    .val("")
                    .attr("placeholder", "Select City")
                    .attr("title", "")
                    .addClass("custom-combobox-input shadow bg-white rounded")
                    //.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left col-md shadow bg-white rounded")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        classes: {
                            "ui-tooltip": "ui-state-highlight"
                        }
                    })
                    .bind("focus", function () {
                        this.value = '';
                        $(this).autocomplete("search", '');
                        if (this.innerHTML == "") {
                            /*alert("empty");*/
                        }
                    });

            }
            else if (value.includes("Area1")) {
                this.input = $('<i class="fa fa-graduation-cap location-icon-bg-dark"></i><input>')
                    .appendTo(this.wrapper)
                    .val("")
                    .attr("placeholder", "Select Course")
                    .attr("title", "")
                    .addClass("custom-combobox-input col-* shadow bg-white inherit rounded")
                    //.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left col-md shadow bg-white rounded")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        classes: {
                            "ui-tooltip": "ui-state-highlight"
                        }
                    })
                    .bind("focus", function () {
                        this.value = '';
                        $(this).autocomplete("search", '');
                        if (this.innerHTML == "") {
                            /*alert("empty");*/
                        }
                    });

            }
            else if (value.includes("Locality1")) {
                this.input = $('<i class="fa fa-street-view location-icon-bg-dark"></i><input>')
                    .appendTo(this.wrapper)
                    .val("")
                    .attr("placeholder", "Select Locality")
                    .attr("title", "")
                    .addClass("custom-combobox-input col-* shadow bg-white inherit rounded")
                    //.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left col-md shadow bg-white rounded")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        classes: {
                            "ui-tooltip": "ui-state-highlight"
                        }
                    })
                    .bind("focus", function () {
                        this.value = '';
                        $(this).autocomplete("search", '');
                        if (this.innerHTML == "") {
                            /*alert("empty");*/
                        }
                    });

            }

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
                wasOpen = true;

            $("<a>")
                .attr("tabIndex", -1)
                .tooltip()
                .appendTo(this.wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle position-absolute")
                .on("mousedown", function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .on("click", function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                    if (wasOpen) {
                        return; // Close if already visible
                    }
                    input.trigger("focus");
                    //ui-id-1
                    //$(input).autocomplete("search", '');
                    // Pass empty string as value to search for, displaying all results
                    //input.autocomplete("search", "");
                });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
                .val("")
                .attr("title", value + " didn't match any item")
                .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });

    $("#city").combobox();
    $("#toggle").on("click", function () {
        $("#city").toggle();
    });
    $("#course").combobox();
    $("#toggle").on("click", function () {
        $("#course").toggle();
    });
    $("#locality").combobox();
    $("#toggle").on("click", function () {
        $("#locality").toggle();
    });



});



/* Disable locality search filter on click of Online Teaching */
$("#radioOnlineTeaching").on('click', function () {
    $("#divLocalitySearchField *").prop("disabled", true);
});

/* Enable locality search filter on click of Classroom Teaching */
$("#radioClassroomTeaching").on('click', function () {
    $("#divLocalitySearchField *").prop("disabled", false);
});

/* Enable locality search filter on click of Student Location Teaching */
$("#radioStudentLocationTeaching").on('click', function () {
    $("#divLocalitySearchField *").prop("disabled", false);
});

