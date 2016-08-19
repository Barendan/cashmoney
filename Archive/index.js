!function t(e, n, r) {
    function i(s, a) {
        if (!n[s]) {
            if (!e[s]) {
                var u = "function" == typeof require && require;
                if (!a && u)
                    return u(s, !0);
                if (o)
                    return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var l = n[s] = {
                exports: {}
            };
            e[s][0].call(l.exports, function(t) {
                var n = e[s][1][t];
                return i(n ? n : t)
            }, l, l.exports, t, e, n, r)
        }
        return n[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++)
        i(r[s]);
    return i
}({
    1: [function(t, e, n) {
        var r, i;
        i = t("../../../../../package.json"),
        r = function() {
            function t() {
                this.env = -1 === window.location.host.indexOf("localhost") ? "production" : "development"
            }
            return t.prototype.getURL = function(t) {
                return "development" === this.env ? "http://localhost:8000/api/" + i.version + "/" + t : "production" === this.env ? i.homepage + "/api/" + i.version + "/" + t : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../../../../../package.json": 36
    }],
    2: [function(t, e, n) {
        var r, i;
        i = t("../api/api.coffee"),
        r = function() {
            function t() {
                this.el = {
                    component: document.querySelector(".js-blog"),
                    list: document.querySelector(".js-blog-list"),
                    navigation: document.querySelector(".js-navigation-menu")
                },
                this.el.component && this.el.list && this.getArticles()
            }
            return t.prototype.addEventListeners = function() {
                var t, e, n, r, i;
                for (r = document.querySelectorAll(".o-blog-post-list__item__link"),
                i = [],
                t = 0,
                e = r.length; e > t; t++)
                    n = r[t],
                    i.push(n.addEventListener("click", function(t) {
                        return ga("send", "event", "blog post", "click", "navigate to", t.target, {
                            nonInteraction: 1
                        })
                    }));
                return i
            }
            ,
            t.prototype.formatDate = function(t) {
                var e, n, r;
                return t = new Date(t),
                e = t.getDate(),
                e = e + "<sup>" + this.getOrdinal(e) + "</sup>",
                r = this.getMonth(t.getMonth()),
                n = e + " " + r
            }
            ,
            t.prototype.getArticles = function() {
                var t, e, n;
                return n = function(t) {
                    return function() {
                        var e;
                        return e = i.getURL("blog"),
                        fetch(e).then(function(t) {
                            return t.json()
                        }).then(function(e) {
                            return t.handleSuccess(e)
                        })["catch"](function(e) {
                            return t.handleFailure()
                        })
                    }
                }(this),
                e = JSON.parse(localStorage.getItem("articles")),
                t = 6048e5,
                null !== e && new Date - new Date(e.date) < t ? setTimeout(function(t) {
                    return function() {
                        return t.handleSuccess(e.articles)
                    }
                }(this), 1e3) : n()
            }
            ,
            t.prototype.getListItem = function(t) {
                var e, n, r, i;
                return r = document.createElement("li"),
                r.classList.add("o-blog-post-list__item"),
                i = document.createElement("a"),
                i.classList.add("o-blog-post-list__item__link"),
                i.href = t.link,
                i.title = "Read more",
                n = document.createElement("h2"),
                n.classList.add("o-blog-post-list__item__heading"),
                n.textContent = t.title,
                e = document.createElement("div"),
                e.classList.add("o-blog-post-list__item__date"),
                e.innerHTML = this.formatDate(t.published),
                i.appendChild(n),
                i.appendChild(e),
                r.appendChild(i),
                r
            }
            ,
            t.prototype.getMenuItem = function() {
                var t, e;
                return t = this.el.navigation.querySelector("[href='#" + this.el.component.id + "']"),
                t ? e = t.parentNode : void 0
            }
            ,
            t.prototype.getMonth = function(t) {
                var e;
                return e = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                e[t]
            }
            ,
            t.prototype.getOrdinal = function(t) {
                if (t > 20 || 10 > t)
                    switch (t % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd"
                    }
                return "th"
            }
            ,
            t.prototype.handleFailure = function() {
                var t;
                return this.el.component.parentNode.removeChild(this.el.component),
                this.el.navigation && (t = this.getMenuItem(),
                t && t.parentNode.removeChild(t)),
                window.dispatchEvent(new CustomEvent("resize"))
            }
            ,
            t.prototype.handleSuccess = function(t) {
                var e, n;
                return e = {
                    date: new Date,
                    articles: t
                },
                localStorage.setItem("articles", JSON.stringify(e)),
                this.populateList(t),
                this.el.component.classList.add("is-loaded"),
                n = this.getMenuItem(),
                n ? n.classList.remove("is-hidden") : void 0
            }
            ,
            t.prototype.populateList = function(t) {
                var e, n, r;
                for (t = t.slice(0, 5),
                this.el.list.innerHTML = "",
                n = 0,
                r = t.length; r > n; n++)
                    e = t[n],
                    this.el.list.appendChild(this.getListItem(e));
                return this.addEventListeners()
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../api/api.coffee": 1
    }],
    3: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                this.logos = Array.prototype.slice.call(document.querySelectorAll(".js-client-logo")),
                this.shown = !1,
                this.config = {
                    delay: 200
                }
            }
            return t.prototype.showLogos = function() {
                var t, e;
                return this.logos.length && !this.shown ? (t = this.logos.length,
                e = this.logos.slice(0),
                this.interval = setInterval(function(n) {
                    return function() {
                        var r;
                        return 0 === t ? clearInterval(n.interval) : (r = e.shift(),
                        r.setAttribute("class", r.getAttribute("class") + " is-shown"),
                        t--)
                    }
                }(this), this.config.delay),
                this.shown = !0) : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    4: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                var t;
                t = document.querySelector(".js-error-page"),
                t && console.info("error page")
            }
            return t
        }(),
        e.exports = new r
    }
    , {}],
    5: [function(t, e, n) {
        var r, i;
        i = t("../api/api.coffee"),
        r = function() {
            function t() {
                this.el = {
                    contactForm: {
                        button: document.querySelector(".js-form-submit"),
                        email: {
                            group: document.querySelector(".js-email"),
                            input: document.querySelector(".js-email-input")
                        },
                        form: document.querySelector(".js-form"),
                        message: {
                            group: document.querySelector(".js-message"),
                            input: document.querySelector(".js-message-input")
                        },
                        name: {
                            group: document.querySelector(".js-name"),
                            input: document.querySelector(".js-name-input")
                        },
                        notifications: {
                            sending: document.querySelector(".js-sending-form"),
                            sent: document.querySelector(".js-sent-form")
                        }
                    },
                    loginForm: {
                        button: document.querySelector(".js-login-button"),
                        email: {
                            group: document.querySelector(".js-login-email"),
                            input: document.querySelector(".js-login-email-input")
                        },
                        form: document.querySelector(".js-login-form"),
                        password: {
                            group: document.querySelector(".js-login-password"),
                            input: document.querySelector(".js-login-password-input")
                        },
                        notifications: {
                            loggingIn: document.querySelector(".js-logging-in")
                        }
                    }
                },
                this.validations = {
                    contactForm: {},
                    loginForm: {}
                },
                this.el.contactForm.form && this.resetForm("contactForm"),
                this.el.loginForm.form && this.resetForm("loginForm"),
                this.el.contactForm.form && this.el.loginForm.form && this.addEventListeners()
            }
            return t.prototype.addEventListeners = function() {
                return this.el.contactForm.button.addEventListener("click", function(t) {
                    return function(e) {
                        return e.preventDefault(),
                        t.submitContactForm(),
                        ga("send", "event", "contact form", "submit")
                    }
                }(this)),
                this.el.loginForm.button.addEventListener("click", function(t) {
                    return function(e) {
                        return e.preventDefault(),
                        t.login(),
                        ga("send", "event", "login form", "submit", "", "", {
                            nonInteraction: 1
                        })
                    }
                }(this)),
                this.el.contactForm.name.input.addEventListener("focus", function(t) {
                    return function() {
                        return t.setFocus("contactForm", "name")
                    }
                }(this)),
                this.el.contactForm.email.input.addEventListener("focus", function(t) {
                    return function() {
                        return t.setFocus("contactForm", "email")
                    }
                }(this)),
                this.el.contactForm.message.input.addEventListener("focus", function(t) {
                    return function() {
                        return t.setFocus("contactForm", "message")
                    }
                }(this)),
                this.el.loginForm.email.input.addEventListener("focus", function(t) {
                    return function() {
                        return t.setFocus("loginForm", "email")
                    }
                }(this)),
                this.el.loginForm.password.input.addEventListener("focus", function(t) {
                    return function() {
                        return t.setFocus("loginForm", "password")
                    }
                }(this)),
                this.el.contactForm.name.input.addEventListener("blur", function(t) {
                    return function() {
                        return t.setInputState("contactForm", "name")
                    }
                }(this)),
                this.el.contactForm.email.input.addEventListener("blur", function(t) {
                    return function() {
                        return t.setInputState("contactForm", "email")
                    }
                }(this)),
                this.el.contactForm.message.input.addEventListener("blur", function(t) {
                    return function() {
                        return t.setInputState("contactForm", "message")
                    }
                }(this)),
                this.el.loginForm.email.input.addEventListener("blur", function(t) {
                    return function() {
                        return t.setInputState("loginForm", "email")
                    }
                }(this)),
                this.el.loginForm.password.input.addEventListener("blur", function(t) {
                    return function() {
                        return t.setInputState("loginForm", "password")
                    }
                }(this)),
                this.el.contactForm.name.input.addEventListener("keyup", function(t) {
                    return function() {
                        return t.el.contactForm.name.input.value = t.sanitiseInput(t.el.contactForm.name.input.value),
                        t.setInputValidationState("contactForm", "name")
                    }
                }(this)),
                this.el.contactForm.email.input.addEventListener("keyup", function(t) {
                    return function() {
                        return t.setInputValidationState("contactForm", "email")
                    }
                }(this)),
                this.el.contactForm.message.input.addEventListener("keyup", function(t) {
                    return function() {
                        return t.setInputValidationState("contactForm", "message")
                    }
                }(this)),
                this.el.loginForm.email.input.addEventListener("keyup", function(t) {
                    return function() {
                        return t.setInputValidationState("loginForm", "email")
                    }
                }(this)),
                this.el.loginForm.password.input.addEventListener("keyup", function(t) {
                    return function() {
                        return t.setInputValidationState("loginForm", "password")
                    }
                }(this))
            }
            ,
            t.prototype.disableButton = function(t) {
                return this.el[t].button.classList.add("is-disabled")
            }
            ,
            t.prototype.enableButton = function(t) {
                return this.el[t].button.classList.remove("is-disabled")
            }
            ,
            t.prototype.formIsValid = function(t) {
                var e, n, r, i;
                r = !0,
                n = this.validations[t];
                for (e in n)
                    i = n[e],
                    i || (r = !1);
                return r
            }
            ,
            t.prototype.getError = function(t, e) {
                var n;
                return n = document.createElement("div"),
                n.classList.add("o-form__error-message"),
                this.el[t][e].input && (n.textContent = this.el[t][e].input.dataset.error),
                n
            }
            ,
            t.prototype.hideAllNotifications = function() {
                var t, e, n, r, i, o, s, a;
                s = this.el,
                a = [];
                for (e in s)
                    r = s[e],
                    a.push(function() {
                        var e;
                        e = [];
                        for (n in r)
                            t = r[n],
                            "notifications" === n ? e.push(function() {
                                var e;
                                e = [];
                                for (i in t)
                                    o = t[i],
                                    e.push(o.classList.add("is-hidden"));
                                return e
                            }()) : e.push(void 0);
                        return e
                    }());
                return a
            }
            ,
            t.prototype.login = function() {
                return this.formIsValid("loginForm") ? (this.hideAllNotifications(),
                this.setFormIsSending("loginForm", "logging in"),
                setTimeout(function(t) {
                    return function() {
                        var e, n, r, i, o;
                        for (t.hideAllNotifications(),
                        t.el.loginForm.form.querySelector(".o-form").classList.remove("is-sending"),
                        t.el.loginForm.form.classList.add("is-error"),
                        r = t.el.loginForm.form.querySelectorAll(".o-form__input-group"),
                        o = [],
                        e = 0,
                        i = r.length; i > e; e++)
                            n = r[e],
                            n.classList.remove("is-complete"),
                            o.push(n.classList.add("is-error"));
                        return o
                    }
                }(this), 3e3)) : console.error("invalid input data")
            }
            ,
            t.prototype.makeDirty = function(t, e) {
                return this.el[t][e].input.classList.contains("is-dirty"),
                this.el[t][e].input.classList.add("is-dirty")
            }
            ,
            t.prototype.removeAllErrors = function() {
                var t, e, n, r, i, o, s, a, u;
                for (r = document.querySelectorAll(".o-form"),
                e = [],
                i = 0,
                s = r.length; s > i; i++)
                    n = r[i],
                    e.push.apply(e, Array.prototype.slice.call(n.querySelectorAll(".o-form__error-message")));
                for (u = [],
                o = 0,
                a = e.length; a > o; o++)
                    t = e[o],
                    u.push(t.parentNode.removeChild(t));
                return u
            }
            ,
            t.prototype.resetForm = function(t) {
                var e, n, r;
                this.el[t].form.classList.remove("is-error"),
                this.el[t].form.classList.remove("is-sent"),
                this.el[t].form.classList.remove("is-sending"),
                "loginForm" === t && this.el[t].form.querySelector(".o-form").classList.remove("is-sending"),
                r = this.el[t];
                for (n in r)
                    e = r[n],
                    "button" !== n && "form" !== n && "notifications" !== n && (this.validations[t][n] = !1,
                    this.resetInput(t, n));
                return this.disableButton(t),
                this.removeAllErrors()
            }
            ,
            t.prototype.resetInput = function(t, e) {
                return this.el[t][e].input.value = "",
                this.el[t][e].group.classList.remove("is-complete"),
                this.el[t][e].group.classList.remove("is-dirty"),
                this.el[t][e].group.classList.remove("is-error"),
                this.el[t][e].group.classList.remove("is-in-focus")
            }
            ,
            t.prototype.sanitiseInput = function(t) {
                return t.replace(/[\/!@#£\$\%\^&*0-9()\[\]+~?<>:\.|\"]+/g, "")
            }
            ,
            t.prototype.setComplete = function(t, e) {
                return this.el[t][e].group.classList.add("is-complete"),
                this.el[t][e].group.classList.remove("is-error"),
                this.el[t][e].group.classList.remove("is-in-focus")
            }
            ,
            t.prototype.setError = function(t, e) {
                return this.el[t][e].group.classList.add("is-error"),
                this.el[t][e].group.classList.remove("is-complete"),
                this.el[t][e].group.classList.remove("is-in-focus")
            }
            ,
            t.prototype.setFocus = function(t, e) {
                return this.el[t][e].group.classList.add("is-in-focus"),
                this.el[t][e].group.classList.remove("is-complete"),
                this.el[t][e].group.classList.remove("is-error")
            }
            ,
            t.prototype.setFormIsSending = function(t, e) {
                return this.el[t].form.classList.remove("is-error"),
                this.el[t].form.classList.remove("is-sent"),
                this.el[t].form.classList.add("is-sending"),
                "loginForm" === t && this.el[t].form.querySelector(".o-form").classList.add("is-sending"),
                this.showNotifcation(e)
            }
            ,
            t.prototype.setFormIsSent = function(t) {
                return this.hideAllNotifications(),
                this.el[t].form.classList.remove("is-error"),
                this.el[t].form.classList.remove("is-sending"),
                this.el[t].form.classList.add("is-sent"),
                this.showNotifcation("sent"),
                setTimeout(function(e) {
                    return function() {
                        return e.resetForm(t),
                        e.hideAllNotifications()
                    }
                }(this), 1e4)
            }
            ,
            t.prototype.setInputState = function(t, e) {
                return this.el[t][e].group.classList.remove("is-in-focus"),
                "message" !== e ? this.validations[t][e] ? this.setComplete(t, e) : (this.el[t][e].group.classList.remove("is-complete"),
                this.showError(t, e)) : this.validateIsntBlank(this.el[t][e].input.value) && this.setComplete(t, e),
                this.validateIsntBlank(this.el[t][e].input.value) ? this.makeDirty(t, e) : void 0
            }
            ,
            t.prototype.setInputValidationState = function(t, e) {
                var n, r, i;
                return i = this.el[t][e].input.value,
                "email" === e && (r = this.validateIsntBlank(i),
                n = this.validateEmail(i),
                this.validations[t][e] = r && n),
                "message" === e && (this.validations[t][e] = !0),
                "name" === e && (this.validations[t][e] = this.validateIsntBlank(i)),
                "password" === e && (this.validations[t][e] = this.validateIsntBlank(i)),
                this.validateForm(t)
            }
            ,
            t.prototype.showError = function(t, e) {
                var n;
                return this.setError(t, e),
                "loginForm" !== t && (n = this.el[t][e].group.querySelectorAll(".o-form__error-message"),
                0 === n.length) ? this.el[t][e].group.appendChild(this.getError(t, e)) : void 0
            }
            ,
            t.prototype.showErrors = function(t) {
                var e, n, r, i;
                if ("loginForm" !== t) {
                    ga("send", "event", "contact form", "show errors", "errors", this.validations[t], {
                        nonInteraction: 1
                    }),
                    r = this.el[t],
                    i = [];
                    for (n in r)
                        e = r[n],
                        "button" !== n && "form" !== n && "notifications" !== n ? !e.input.classList.contains("is-dirty") || e.group.classList.contains("is-in-focus") || this.validations[t][n] ? i.push(void 0) : i.push(this.showError(t, n)) : i.push(void 0);
                    return i
                }
            }
            ,
            t.prototype.showNotifcation = function(t) {
                switch (t) {
                case "logging in":
                    return this.el.loginForm.notifications.loggingIn.classList.remove("is-hidden");
                case "sending":
                    return this.el.contactForm.notifications.sending.classList.remove("is-hidden");
                case "sent":
                    return this.el.contactForm.notifications.sent.classList.remove("is-hidden")
                }
            }
            ,
            t.prototype.submitContactForm = function() {
                var t, e;
                return this.formIsValid("contactForm") ? (this.setFormIsSending("contactForm", "sending"),
                e = i.getURL("email"),
                t = {
                    message: this.el.contactForm.message.input.value,
                    senderName: this.el.contactForm.name.input.value,
                    senderEmail: this.el.contactForm.email.input.value
                },
                fetch(e, {
                    body: JSON.stringify(t),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "post"
                }).then(function(t) {
                    return t.json()
                }).then(function(e) {
                    return function(n) {
                        return "sent" === n ? (e.setFormIsSent("contactForm"),
                        ga("send", "event", "contact form", "sent", "data", t, {
                            nonInteraction: 1
                        })) : ga("send", "event", "contact form", "send failed", "errors", n, {
                            nonInteraction: 1
                        })
                    }
                }(this))) : console.error("invalid input data")
            }
            ,
            t.prototype.validateEmail = function(t) {
                var e;
                return e = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                e.test(t)
            }
            ,
            t.prototype.validateForm = function(t) {
                return this.formIsValid(t) ? (this.enableButton(t),
                this.removeAllErrors()) : (this.disableButton(t),
                this.showErrors(t))
            }
            ,
            t.prototype.validateIsntBlank = function(t) {
                return "" !== t
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../api/api.coffee": 1
    }],
    6: [function(t, e, n) {
        var r, i;
        i = t("lodash/function/debounce"),
        r = function() {
            function t() {
                var t, e, n, r;
                for (this.sections = [],
                n = document.querySelectorAll(".js-full-height-section"),
                t = 0,
                e = n.length; e > t; t++)
                    r = n[t],
                    this.sections.push({
                        content: r.querySelector(".js-full-height-section__content"),
                        el: r
                    });
                this.sections.length && this.addEventListeners()
            }
            return t.prototype.addEventListeners = function() {
                return window.addEventListener("load", function(t) {
                    return function() {
                        return t.updateAllSections()
                    }
                }(this)),
                window.addEventListener("resize", i(function(t) {
                    return function() {
                        return t.updateAllSections()
                    }
                }(this), 500))
            }
            ,
            t.prototype.getMinimumHeight = function(t) {
                var e;
                return e = 0,
                t.el.classList.contains("o-section--padding-top") && (e = 100),
                t.content.offsetHeight + e
            }
            ,
            t.prototype.updateSection = function(t, e) {
                return e < window.innerHeight ? t.el.classList.add("o-section--full-height") : t.el.classList.remove("o-section--full-height")
            }
            ,
            t.prototype.updateAllSections = function() {
                var t, e, n, r, i, o;
                for (r = this.sections,
                i = [],
                t = 0,
                e = r.length; e > t; t++)
                    o = r[t],
                    o.content ? (n = this.getMinimumHeight(o),
                    i.push(this.updateSection(o, n))) : i.push(void 0);
                return i
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "lodash/function/debounce": 22
    }],
    7: [function(t, e, n) {
        var r, i;
        i = t("../api/api.coffee"),
        r = function() {
            function t() {
                this.el = {
                    component: document.querySelector(".js-local-conditions"),
                    icon: document.querySelector(".js-weather-icon"),
                    temperature: document.querySelector(".js-temperature"),
                    time: document.querySelector(".js-current-time"),
                    weather: document.querySelector(".js-weather")
                },
                this.el.component && (this.runClock(),
                this.getWeather())
            }
            return t.prototype.getIcon = function(t, e) {
                var n;
                switch (e) {
                case "113":
                    n = t ? "clear--day" : "clear--night";
                    break;
                case "116":
                    n = t ? "cloudy--day" : "cloudy--night";
                    break;
                case "119":
                    n = t ? "cloudy--day" : "cloudy--night";
                    break;
                case "260":
                    n = "foggy";
                    break;
                case "248":
                    n = "foggy";
                    break;
                case "143":
                    n = "foggy";
                    break;
                case "122":
                    n = "overcast";
                    break;
                case "200":
                    n = "lightening";
                    break;
                case "386":
                    n = "lightening";
                    break;
                case "176":
                    n = "light-rain";
                    break;
                case "293":
                    n = "light-rain";
                    break;
                case "263":
                    n = "light-rain";
                    break;
                case "266":
                    n = "light-rain";
                    break;
                case "296":
                    n = "light-rain";
                    break;
                case "353":
                    n = "light-rain";
                    break;
                case "389":
                    n = "heavy-rain";
                    break;
                case "359":
                    n = "heavy-rain";
                    break;
                case "308":
                    n = "heavy-rain";
                    break;
                case "305":
                    n = "heavy-rain";
                    break;
                case "302":
                    n = "heavy-rain";
                    break;
                case "299":
                    n = "heavy-rain";
                    break;
                case "371":
                    n = "light-snow";
                    break;
                case "368":
                    n = "light-snow";
                    break;
                case "338":
                    n = "light-snow";
                    break;
                case "335":
                    n = "light-snow";
                    break;
                case "332":
                    n = "light-snow";
                    break;
                case "329":
                    n = "light-snow";
                    break;
                case "326":
                    n = "light-snow";
                    break;
                case "323":
                    n = "light-snow";
                    break;
                case "230":
                    n = "light-snow";
                    break;
                case "227":
                    n = "light-snow";
                    break;
                case "179":
                    n = "light-snow";
                    break;
                case "395":
                    n = "heavy-snow";
                    break;
                case "392":
                    n = "heavy-snow";
                    break;
                case "377":
                    n = "heavy-snow";
                    break;
                case "374":
                    n = "heavy-snow";
                    break;
                case "365":
                    n = "heavy-snow";
                    break;
                case "362":
                    n = "heavy-snow";
                    break;
                case "350":
                    n = "heavy-snow";
                    break;
                case "320":
                    n = "heavy-snow";
                    break;
                case "317":
                    n = "heavy-snow";
                    break;
                case "314":
                    n = "heavy-snow";
                    break;
                case "311":
                    n = "heavy-snow";
                    break;
                case "284":
                    n = "heavy-snow";
                    break;
                case "281":
                    n = "heavy-snow";
                    break;
                case "182":
                    n = "heavy-snow";
                    break;
                default:
                    n = t ? "clear--day" : "clear--night"
                }
                return n
            }
            ,
            t.prototype.getTime = function() {
                var t;
                return t = new Date((new Date).getTime() + 288e5).toUTCString().replace(" GMT", "").substr(-8),
                t.substr(0, t.length - 3)
            }
            ,
            t.prototype.getWeather = function() {
                var t;
                return t = i.getURL("weather"),
                fetch(t).then(function(t) {
                    return t.json()
                }).then(function(t) {
                    return function(e) {
                        return t.handleData(e)
                    }
                }(this))["catch"](function(t) {
                    return function(e) {
                        return t.el.weather.parentNode.removeChild(t.el.weather)
                    }
                }(this))
            }
            ,
            t.prototype.handleData = function(t) {
                return this.showCondition(t.condition),
                this.showTemperature(t.temperature),
                this.el.weather.classList.remove("is-hidden")
            }
            ,
            t.prototype.runClock = function() {
                return this.el.time ? setInterval(function(t) {
                    return function() {
                        var e, n, r;
                        return r = t.getTime(),
                        e = r.substr(0, 2),
                        n = r.substr(-2, 2),
                        t.el.time.innerHTML = e + "<span class='o-local-conditions__time__colon'>:</span>" + n
                    }
                }(this), 1e3) : void 0
            }
            ,
            t.prototype.showCondition = function(t) {
                var e, n, r;
                return e = this.getTime().substr(0, 2),
                r = 18 > e && e >= 6 ? !0 : !1,
                n = this.getIcon(r, t),
                this.el.icon ? (this.el.icon.setAttribute("class", this.el.icon.getAttribute("class") + " o-icon--weather--" + n),
                this.el.icon.querySelector("use").setAttribute("xlink:href", "#icon--" + n)) : void 0
            }
            ,
            t.prototype.showTemperature = function(t) {
                return this.el.temperature ? this.el.temperature.textContent = t : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../api/api.coffee": 1
    }],
    8: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                this.el = {
                    map: document.querySelector(".js-map")
                },
                this.config = {
                    delay: 2e3
                },
                this.addEventListeners()
            }
            return t.prototype.addEventListeners = function() {
                return this.el.map ? this.el.map.addEventListener("click", function(t) {
                    return function(e) {
                        return t.toggleZoomState()
                    }
                }(this), !0) : void 0
            }
            ,
            t.prototype.toggleZoomState = function() {
                return this.el.map.classList.contains("is-zoomed") ? (this.el.map.classList.remove("is-zoomed"),
                ga("send", "event", "map", "zoom", "zoom out")) : (this.el.map.classList.add("is-zoomed"),
                ga("send", "event", "map", "zoom", "zoom in"))
            }
            ,
            t.prototype.zoom = function() {
                return this.el.map ? setTimeout(function(t) {
                    return function() {
                        return t.el.map.classList.add("is-zoomed")
                    }
                }(this), this.config.delay) : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    9: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                var t, e, n, r;
                for (r = document.querySelectorAll(".js-morph-button"),
                this.components = [],
                e = 0,
                n = r.length; n > e; e++)
                    t = r[e],
                    this.components.push({
                        closeButton: t.querySelector(".js-morph-button-close"),
                        element: t,
                        openButton: t.querySelector(".js-morph-button-open")
                    });
                this.config = {
                    delay: 1e3
                },
                this.components.length && (this.addEventListeners(),
                this.showMorphButtons())
            }
            return t.prototype.addEventListeners = function() {
                var t, e, n, r, i;
                for (r = this.components,
                i = [],
                e = 0,
                n = r.length; n > e; e++)
                    t = r[e],
                    t.openButton.addEventListener("click", function(t) {
                        return function(e) {
                            return e.preventDefault(),
                            t.openMorphButton(e.target.parentNode),
                            ga("send", "event", "morph button", "click", "open", e.target.parentNode, {
                                nonInteraction: 1
                            })
                        }
                    }(this)),
                    i.push(t.closeButton.addEventListener("click", function(t) {
                        return function(e) {
                            return t.closeMorphButton(e.target.parentNode.parentNode.parentNode),
                            ga("send", "event", "morph button", "click", "close", e.target.parentNode.parentNode.parentNode, {
                                nonInteraction: 1
                            })
                        }
                    }(this)));
                return i
            }
            ,
            t.prototype.openMorphButton = function(t) {
                return t.classList.add("is-open")
            }
            ,
            t.prototype.closeMorphButton = function(t) {
                return t.classList.remove("is-open")
            }
            ,
            t.prototype.showMorphButtons = function() {
                return setTimeout(function(t) {
                    return function() {
                        var e, n, r, i, o;
                        for (i = t.components,
                        o = [],
                        n = 0,
                        r = i.length; r > n; n++)
                            e = i[n],
                            o.push(e.element.classList.remove("is-hidden"));
                        return o
                    }
                }(this), this.config.delay)
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    10: [function(t, e, n) {
        var r, i;
        i = t("smoothscroll"),
        r = function() {
            function t() {
                this.el = {
                    menu: document.querySelector(".js-navigation-menu")
                },
                this.links = {},
                this.config = {
                    scrollDuration: 200
                }
            }
            return t.prototype.activateItem = function(t) {
                return this.resetItems(),
                this.el.menu ? this.links[t.id].classList.add("is-active") : void 0
            }
            ,
            t.prototype.addEventListener = function(t, e) {
                return t.addEventListener("click", function(t) {
                    return function(t) {
                        return t.preventDefault(),
                        e = document.querySelector("#" + e),
                        i(e.offsetTop),
                        ga("send", "event", "navigation", "click", "navigate to section", e, {
                            nonInteraction: 1
                        })
                    }
                }(this))
            }
            ,
            t.prototype.addItem = function(t) {
                return this.el.menu ? this.el.menu.appendChild(this.generateListItem(t)) : void 0
            }
            ,
            t.prototype.generateListItem = function(t) {
                var e, n;
                return n = document.createElement("li"),
                n.classList.add("o-navigation__menu__item"),
                t.dataset.waitForLoad && n.classList.add("is-hidden"),
                e = document.createElement("a"),
                e.href = "#" + t.id,
                e.title = t.dataset.navTitle || "",
                e.classList.add("o-navigation__menu__item__link"),
                n.appendChild(e),
                this.addEventListener(e, t.id),
                this.links[t.id] = e,
                n
            }
            ,
            t.prototype.resetItems = function() {
                var t, e, n, r;
                n = this.links,
                r = [];
                for (t in n)
                    e = n[t],
                    r.push(e.classList.remove("is-active"));
                return r
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        smoothscroll: 32
    }],
    11: [function(t, e, n) {
        var r, i, o;
        r = t("page"),
        o = t("../svg-loader/svg-loader.coffee"),
        i = function() {
            function t() {
                var t;
                this.el = {
                    initialPageOverlay: document.querySelector(".js-page-transition__initial-overlay"),
                    pages: document.querySelectorAll(".js-page-transition__page-container"),
                    overlay: document.querySelector(".js-page-transition__overlay"),
                    triggers: document.querySelectorAll(".js-trigger-page-transition"),
                    wrapper: document.querySelector(".js-page-transition")
                },
                this.currentPage = "home",
                this.config = {
                    initialDelay: 1500,
                    transitionDuration: 1e3,
                    transitionTime: 400
                },
                this.el.wrapper && this.el.pages.length && (this.loader = t = new SVGLoader(this.el.overlay,{
                    easingIn: mina.easeinout,
                    speedIn: this.config.transitionTime
                }),
                this.pages = this.indexPages(),
                this.addEventListeners(),
                this.setupRouting())
            }
            return t.prototype.addEventListeners = function() {
                var t, e, n, r, i;
                for (n = this.el.triggers,
                r = [],
                t = 0,
                e = n.length; e > t; t++)
                    i = n[t],
                    r.push(i.addEventListener("click", function(t) {
                        return function(e) {
                            return e.preventDefault(),
                            t.transition(e.target.dataset.page),
                            ga("send", "event", "page transition trigger", "click", "go to page", e.target.dataset.page, {
                                nonInteraction: 1
                            })
                        }
                    }(this)));
                return r
            }
            ,
            t.prototype.hideOverlay = function() {
                return this.loader.hide(),
                this.el.wrapper.classList.remove("is-loading"),
                setTimeout(function(t) {
                    return function() {
                        return t.el.overlay.classList.remove("is-shown")
                    }
                }(this), this.config.transitionTime)
            }
            ,
            t.prototype.hidePage = function(t) {
                return this.pages[t].classList.remove("is-shown")
            }
            ,
            t.prototype.indexPages = function() {
                var t, e, n, r, i;
                for (r = {},
                i = this.el.pages,
                t = 0,
                e = i.length; e > t; t++)
                    n = i[t],
                    r[n.dataset.page] = n;
                return r
            }
            ,
            t.prototype.noTransition = function(t) {
                return this.currentPage !== t ? (this.hidePage(this.currentPage),
                this.showPage(t),
                this.resizeWindow(),
                this.currentPage = t) : void 0
            }
            ,
            t.prototype.removeInitialPageOverlay = function() {
                return this.el.initialPageOverlay.classList.add("is-hidden"),
                this.hideOverlay(),
                setTimeout(function(t) {
                    return function() {
                        return t.el.initialPageOverlay.parentNode.removeChild(t.el.initialPageOverlay)
                    }
                }(this), this.config.initialDelay)
            }
            ,
            t.prototype.resizeWindow = function() {
                return window.dispatchEvent(new CustomEvent("resize"))
            }
            ,
            t.prototype.setupRouting = function() {
                return r("/", function(t) {
                    return function() {
                        return t.noTransition("home"),
                        ga("send", "pageview", "/")
                    }
                }(this)),
                r("/about/me", function(t) {
                    return function() {
                        return t.noTransition("about"),
                        ga("send", "pageview", "/about/me")
                    }
                }(this)),
                r("/contract", function(t) {
                    return function() {
                        return t.noTransition("contract"),
                        ga("send", "pageview", "/contract")
                    }
                }(this)),
                r(),
                this.removeInitialPageOverlay()
            }
            ,
            t.prototype.showOverlay = function() {
                return this.el.wrapper.classList.add("is-loading"),
                this.el.overlay.classList.add("is-shown"),
                this.loader.show()
            }
            ,
            t.prototype.showPage = function(t) {
                return this.pages[t].classList.add("is-shown")
            }
            ,
            t.prototype.transition = function(t) {
                return this.currentPage !== t ? (this.showOverlay(),
                setTimeout(function(e) {
                    return function() {
                        switch (e.hidePage(e.currentPage),
                        e.showPage(t),
                        t) {
                        case "home":
                            r("/");
                            break;
                        case "about":
                            r("/about/me");
                            break;
                        case "contract":
                            r("/contract")
                        }
                        return window.scrollTo(0, 0),
                        e.hideOverlay(),
                        e.currentPage = t
                    }
                }(this), this.config.transitionDuration)) : void 0
            }
            ,
            t
        }(),
        e.exports = new i
    }
    , {
        "../svg-loader/svg-loader.coffee": 16,
        page: 28
    }],
    12: [function(t, e, n) {
        var r, i;
        i = t("../api/api.coffee"),
        r = function() {
            function t() {
                this.el = {
                    calculator: document.querySelector(".js-calculator"),
                    currencySelector: document.querySelector(".js-currency"),
                    currencySymbols: document.querySelectorAll(".js-currency-symbol"),
                    hourlyRate: document.querySelector(".js-hourly-rate"),
                    minRate: document.querySelector(".js-min-rate"),
                    slider: document.querySelector(".js-time-slider"),
                    sliderTime: document.querySelector(".js-time"),
                    sliderLabel: document.querySelector(".js-time-slider-text"),
                    sliderNotice: document.querySelector(".js-slider-notice"),
                    weeklyRate: document.querySelector(".js-rate")
                },
                this.config = {
                    baseRate: 3e3,
                    currency: "usd",
                    discountRate: .33333,
                    discountTime: 12,
                    rates: {
                        usd: 3e3,
                        gbp: 2035,
                        eur: 2760,
                        cny: 19500,
                        jpy: 361500
                    }
                },
                this.el.calculator && (this.el.slider.value = 1,
                this.el.currencySelector.value = "usd",
                this.getRates(),
                this.addEventListeners())
            }
            return t.prototype.addEventListeners = function() {
                return this.el.slider.addEventListener("input", function(t) {
                    return function() {
                        return t.updateProjectLength(t.el.slider.value),
                        ga("send", "event", "slider", "slide", "project length change", t.el.slider.value, {
                            nonInteraction: 1
                        })
                    }
                }(this)),
                this.el.currencySelector.addEventListener("change", function(t) {
                    return function() {
                        return t.updateCurrency(t.el.currencySelector.value),
                        ga("send", "event", "select", "selection", "currency change", t.el.currencySelector.value, {
                            nonInteraction: 1
                        })
                    }
                }(this))
            }
            ,
            t.prototype.calculateRates = function(t) {
                var e, n, r;
                return n = this.config.rates[t],
                e = n * this.config.discountRate / (this.config.discountTime - 1),
                r = {
                    hourly: Math.floor((n - e * (this.el.slider.value - 1)) / 40),
                    minimum: Math.floor(n - e * (this.config.discountTime - 1)),
                    weekly: Math.floor(n - e * (this.el.slider.value - 1))
                }
            }
            ,
            t.prototype.formatNumber = function(t) {
                return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            ,
            t.prototype.getRates = function() {
                var t;
                return t = i.getURL("currency"),
                fetch(t).then(function(t) {
                    return t.json()
                }).then(function(t) {
                    return function(e) {
                        return t.handleData(e)
                    }
                }(this))["catch"](function(t) {
                    return function(e) {
                        return t.handleFailure()
                    }
                }(this))
            }
            ,
            t.prototype.handleData = function(t) {
                return this.config.rates = {
                    usd: this.config.baseRate,
                    gbp: Math.ceil(t.GBP * this.config.baseRate),
                    eur: Math.ceil(t.EUR * this.config.baseRate),
                    cny: Math.ceil(t.CNY * this.config.baseRate),
                    jpy: Math.ceil(t.JPY * this.config.baseRate)
                },
                this.updateRateValues(this.calculateRates(this.config.currency))
            }
            ,
            t.prototype.handleFailure = function() {
                return console.error("Failed to get exchange rates"),
                this.updateRateValues(this.calculateRates(this.config.currency))
            }
            ,
            t.prototype.hideNotice = function() {
                return parseInt(this.el.slider.value) < this.config.discountTime ? this.el.sliderNotice.classList.remove("is-shown") : void 0
            }
            ,
            t.prototype.setSymbol = function(t) {
                var e, n, r, i, o;
                for (i = this.el.currencySymbols,
                o = [],
                n = 0,
                r = i.length; r > n; n++)
                    e = i[n],
                    o.push(e.textContent = t);
                return o
            }
            ,
            t.prototype.showNotice = function() {
                return this.el.slider.value === this.config.discountTime.toString() ? this.el.sliderNotice.classList.add("is-shown") : void 0
            }
            ,
            t.prototype.updateCurrency = function(t) {
                switch (this.config.currency = t,
                this.updateRateValues(this.calculateRates(this.config.currency)),
                this.config.currency) {
                case "usd":
                    return this.setSymbol("$");
                case "gbp":
                    return this.setSymbol("£");
                case "eur":
                    return this.setSymbol("€");
                case "cny":
                    return this.setSymbol("¥");
                case "jpy":
                    return this.setSymbol("¥")
                }
            }
            ,
            t.prototype.updateProjectLength = function(t) {
                return this.el.sliderTime.textContent = t,
                t > 1 ? this.el.sliderLabel.textContent = "weeks" : this.el.sliderLabel.textContent = "week",
                "12" === t ? this.showNotice() : this.hideNotice(),
                this.updateRateValues(this.calculateRates(this.config.currency))
            }
            ,
            t.prototype.updateRateValues = function(t) {
                return this.el.hourlyRate.textContent = this.formatNumber(t.hourly),
                this.el.minRate.textContent = this.formatNumber(t.minimum),
                this.el.weeklyRate.textContent = this.formatNumber(t.weekly)
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../api/api.coffee": 1
    }],
    13: [function(t, e, n) {
        var r, i, o, s;
        r = t("../navigation/navigation.coffee"),
        s = t("scrollmonitor"),
        o = t("../waypoints/waypoints.coffee"),
        i = function() {
            function t() {
                var t, e, n, r, i;
                if (this.el = {
                    scrollPoints: document.querySelectorAll(".js-scroll-point")
                },
                this.el.scrollPoints.length)
                    for (r = this.el.scrollPoints,
                    e = t = 0,
                    n = r.length; n > t; e = ++t)
                        i = r[e],
                        this.setupNavigation(i, e),
                        this.attachScrollEventListeners(i, s.create(i))
            }
            return t.prototype.attachScrollEventListeners = function(t, e) {
                return e.fullyEnterViewport(function(e) {
                    return function() {
                        return e.scrolledIntoView(t)
                    }
                }(this)),
                e.exitViewport(function(e) {
                    return function() {
                        return e.scrolledOutOfView(t)
                    }
                }(this))
            }
            ,
            t.prototype.runInViewFunction = function(t) {
                var e;
                return e = t.dataset.whenInView,
                e ? o.run(e) : void 0
            }
            ,
            t.prototype.setupNavigation = function(t, e) {
                return r.addItem(t),
                0 === e ? r.activateItem(t) : void 0
            }
            ,
            t.prototype.scrolledIntoView = function(t) {
                return t.classList.add("is-in-view"),
                r.activateItem(t),
                this.runInViewFunction(t)
            }
            ,
            t.prototype.scrolledOutOfView = function(t) {
                return t.classList.remove("is-in-view")
            }
            ,
            t
        }(),
        e.exports = new i
    }
    , {
        "../navigation/navigation.coffee": 10,
        "../waypoints/waypoints.coffee": 17,
        scrollmonitor: 31
    }],
    14: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                this.initiateServicWorker()
            }
            return t.prototype.initiateServicWorker = function() {
                return "serviceWorker"in navigator ? navigator.serviceWorker.register("/service-worker.js").then(function(t) {
                    return console.info("ServiceWorker registration successful with scope: ", t.scope)
                })["catch"](function(t) {
                    return console.warn("ServiceWorker registration failed: ", t)
                }) : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    15: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                this.checkmarks = Array.prototype.slice.call(document.querySelectorAll(".js-checkmark")),
                this.checked = !1,
                this.config = {
                    delay: 200
                }
            }
            return t.prototype.checkCheckmarks = function() {
                var t, e;
                return !this.checked && this.checkmarks.length ? (t = this.checkmarks.length,
                e = this.checkmarks.slice(0),
                this.interval = setInterval(function(n) {
                    return function() {
                        var r;
                        return 0 === t ? clearInterval(n.interval) : (r = e.shift(),
                        r.setAttribute("class", r.getAttribute("class") + " is-checked"),
                        t--)
                    }
                }(this), this.config.delay),
                this.checked = !0) : void 0
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    16: [function(t, e, n) {
        var r;
        !function(t) {
            var e, n, r, i, o, s;
            n = function(t) {
                return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
            }
            ,
            s = function(t, n) {
                var r;
                (r = i(t, n) ? o : e)(t, n)
            }
            ,
            i = void 0,
            e = void 0,
            o = void 0,
            "classList"in document.documentElement ? (i = function(t, e) {
                return t.classList.contains(e)
            }
            ,
            e = function(t, e) {
                t.classList.add(e)
            }
            ,
            o = function(t, e) {
                t.classList.remove(e)
            }
            ) : (i = function(t, e) {
                return n(e).test(t.className)
            }
            ,
            e = function(t, e) {
                i(t, e) || (t.className = t.className + " " + e)
            }
            ,
            o = function(t, e) {
                t.className = t.className.replace(n(e), " ")
            }
            ),
            r = {
                hasClass: i,
                addClass: e,
                removeClass: o,
                toggleClass: s,
                has: i,
                add: e,
                remove: o,
                toggle: s
            },
            "function" == typeof define && define.amd ? define(r) : t.classie = r
        }(window),
        r = t("snapsvg-cjs"),
        function(t) {
            var e, n;
            n = function(t, e) {
                var n;
                for (n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }
            ,
            e = function(t, e) {
                this.el = t,
                this.options = n({}, this.options),
                n(this.options, e),
                this._init()
            }
            ,
            e.prototype.options = {
                speedIn: 500,
                easingIn: mina.linear
            },
            e.prototype._init = function() {
                var t, e, n;
                n = r(this.el.querySelector("svg")),
                this.path = n.select("path"),
                this.initialPath = this.path.attr("d"),
                e = this.el.getAttribute("data-opening"),
                this.openingSteps = e ? e.split(";") : "",
                this.openingStepsTotal = e ? this.openingSteps.length : 0,
                0 !== this.openingStepsTotal && (t = this.el.getAttribute("data-closing") ? this.el.getAttribute("data-closing") : this.initialPath,
                this.closingSteps = t ? t.split(";") : "",
                this.closingStepsTotal = t ? this.closingSteps.length : 0,
                this.isAnimating = !1,
                this.options.speedOut || (this.options.speedOut = this.options.speedIn),
                this.options.easingOut || (this.options.easingOut = this.options.easingIn))
            }
            ,
            e.prototype.show = function() {
                var t, e;
                return this.isAnimating ? !1 : (this.isAnimating = !0,
                e = this,
                t = function() {
                    classie.addClass(e.el, "is-loading")
                }
                ,
                this._animateSVG("in", t),
                void classie.add(this.el, "show"))
            }
            ,
            e.prototype.hide = function() {
                var t;
                t = this,
                classie.removeClass(this.el, "is-loading"),
                this._animateSVG("out", function() {
                    t.path.attr("d", t.initialPath),
                    classie.removeClass(t.el, "show"),
                    t.isAnimating = !1
                })
            }
            ,
            e.prototype._animateSVG = function(t, e) {
                var n, r, i, o, s, a, u;
                o = this,
                i = 0,
                a = "out" === t ? this.closingSteps : this.openingSteps,
                u = "out" === t ? this.closingStepsTotal : this.openingStepsTotal,
                s = "out" === t ? o.options.speedOut : o.options.speedIn,
                n = "out" === t ? o.options.easingOut : o.options.easingIn,
                (r = function(t) {
                    return t > u - 1 ? void (e && "function" == typeof e && e()) : (o.path.animate({
                        path: a[t]
                    }, s, n, function() {
                        r(t)
                    }),
                    void t++)
                }
                )(i)
            }
            ,
            t.SVGLoader = e
        }(window)
    }
    , {
        "snapsvg-cjs": 33
    }],
    17: [function(t, e, n) {
        var r, i, o, s;
        i = t("../clients/clients.coffee"),
        o = t("../map/map.coffee"),
        s = t("../services/services.coffee"),
        r = function() {
            function t() {}
            return t.prototype.run = function(t) {
                switch (t) {
                case "check-checkmarks":
                    return s.checkCheckmarks();
                case "show-logos":
                    return i.showLogos();
                case "zoom-in-map":
                    return o.zoom()
                }
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {
        "../clients/clients.coffee": 3,
        "../map/map.coffee": 8,
        "../services/services.coffee": 15
    }],
    18: [function(t, e, n) {
        var r;
        r = function() {
            function t() {
                this.el = {
                    inputs: document.querySelectorAll("input, select, textarea"),
                    metaTag: document.querySelector("meta[name=viewport]")
                },
                this.el.inputs.length && this.addEventListeners()
            }
            return t.prototype.addEventListeners = function() {
                var t, e, n, r, i;
                for (r = this.el.inputs,
                i = [],
                t = 0,
                n = r.length; n > t; t++)
                    e = r[t],
                    e.addEventListener("blur", function(t) {
                        return function(e) {
                            return t.el.metaTag.setAttribute("content", "width=device-width,initial-scale=1,maximum-scale=10")
                        }
                    }(this)),
                    i.push(e.addEventListener("focus", function(t) {
                        return function(e) {
                            return t.el.metaTag.setAttribute("content", "width=device-width,initial-scale=1,maximum-scale=1")
                        }
                    }(this)));
                return i
            }
            ,
            t
        }(),
        e.exports = new r
    }
    , {}],
    19: [function(t, e, n) {
        var r, i, o, s, a, u, c, l, h, f, p;
        console.log("%c Welcome to YourWeb.Expert ", "background: #243342;\ncolor: #ffffcb;\nfont-size: 18px;\nfont-family: 'Helvetica Neue';\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px"),
        console.log("%c darryl@yourweb.expert ", "background: #243342;\ncolor: #ffffcb;\nfont-size: 13px;\nfont-family: 'Helvetica Neue';\nfont-weight: 300;\nline-height: 14px;\nheight: 30px;\npadding: 5px 55px;"),
        void 0 === window.fetch && t("whatwg-fetch"),
        r = t("./components/blog/blog.coffee"),
        i = t("./components/error-page/error-page.coffee"),
        o = t("./components/form-validation/form-validation.coffee"),
        s = t("./components/full-height-section/full-height-section.coffee"),
        a = t("./components/local-conditions/local-conditions.coffee"),
        u = t("./components/morph-button/morph-button.coffee"),
        c = t("./components/page-transition/page-transition.coffee"),
        l = t("./components/rate-calculator/rate-calculator.coffee"),
        h = t("./components/scroll-watcher/scroll-watcher.coffee"),
        f = t("./components/service-worker/service-worker.coffee"),
        p = t("./components/zoom-reset/zoom-reset.coffee")
    }
    , {
        "./components/blog/blog.coffee": 2,
        "./components/error-page/error-page.coffee": 4,
        "./components/form-validation/form-validation.coffee": 5,
        "./components/full-height-section/full-height-section.coffee": 6,
        "./components/local-conditions/local-conditions.coffee": 7,
        "./components/morph-button/morph-button.coffee": 9,
        "./components/page-transition/page-transition.coffee": 11,
        "./components/rate-calculator/rate-calculator.coffee": 12,
        "./components/scroll-watcher/scroll-watcher.coffee": 13,
        "./components/service-worker/service-worker.coffee": 14,
        "./components/zoom-reset/zoom-reset.coffee": 18,
        "whatwg-fetch": 35
    }],
    20: [function(t, e, n) {
        e.exports = Array.isArray || function(t) {
            return "[object Array]" == Object.prototype.toString.call(t)
        }
    }
    , {}],
    21: [function(t, e, n) {
        var r = t("../internal/getNative")
          , i = r(Date, "now")
          , o = i || function() {
            return (new Date).getTime()
        }
        ;
        e.exports = o
    }
    , {
        "../internal/getNative": 23
    }],
    22: [function(t, e, n) {
        function r(t, e, n) {
            function r() {
                v && clearTimeout(v),
                p && clearTimeout(p),
                b = 0,
                p = v = y = void 0
            }
            function u(e, n) {
                n && clearTimeout(n),
                p = v = y = void 0,
                e && (b = o(),
                d = t.apply(g, f),
                v || p || (f = g = void 0))
            }
            function c() {
                var t = e - (o() - m);
                0 >= t || t > e ? u(y, p) : v = setTimeout(c, t)
            }
            function l() {
                u(x, v)
            }
            function h() {
                if (f = arguments,
                m = o(),
                g = this,
                y = x && (v || !k),
                w === !1)
                    var n = k && !v;
                else {
                    p || k || (b = m);
                    var r = w - (m - b)
                      , i = 0 >= r || r > w;
                    i ? (p && (p = clearTimeout(p)),
                    b = m,
                    d = t.apply(g, f)) : p || (p = setTimeout(l, r))
                }
                return i && v ? v = clearTimeout(v) : v || e === w || (v = setTimeout(c, e)),
                n && (i = !0,
                d = t.apply(g, f)),
                !i || v || p || (f = g = void 0),
                d
            }
            var f, p, d, m, g, v, y, b = 0, w = !1, x = !0;
            if ("function" != typeof t)
                throw new TypeError(s);
            if (e = 0 > e ? 0 : +e || 0,
            n === !0) {
                var k = !0;
                x = !1
            } else
                i(n) && (k = !!n.leading,
                w = "maxWait"in n && a(+n.maxWait || 0, e),
                x = "trailing"in n ? !!n.trailing : x);
            return h.cancel = r,
            h
        }
        var i = t("../lang/isObject")
          , o = t("../date/now")
          , s = "Expected a function"
          , a = Math.max;
        e.exports = r
    }
    , {
        "../date/now": 21,
        "../lang/isObject": 27
    }],
    23: [function(t, e, n) {
        function r(t, e) {
            var n = null == t ? void 0 : t[e];
            return i(n) ? n : void 0
        }
        var i = t("../lang/isNative");
        e.exports = r
    }
    , {
        "../lang/isNative": 26
    }],
    24: [function(t, e, n) {
        function r(t) {
            return !!t && "object" == typeof t
        }
        e.exports = r
    }
    , {}],
    25: [function(t, e, n) {
        function r(t) {
            return i(t) && a.call(t) == o
        }
        var i = t("./isObject")
          , o = "[object Function]"
          , s = Object.prototype
          , a = s.toString;
        e.exports = r
    }
    , {
        "./isObject": 27
    }],
    26: [function(t, e, n) {
        function r(t) {
            return null == t ? !1 : i(t) ? l.test(u.call(t)) : o(t) && s.test(t)
        }
        var i = t("./isFunction")
          , o = t("../internal/isObjectLike")
          , s = /^\[object .+?Constructor\]$/
          , a = Object.prototype
          , u = Function.prototype.toString
          , c = a.hasOwnProperty
          , l = RegExp("^" + u.call(c).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = r
    }
    , {
        "../internal/isObjectLike": 24,
        "./isFunction": 25
    }],
    27: [function(t, e, n) {
        function r(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }
        e.exports = r
    }
    , {}],
    28: [function(t, e, n) {
        (function(n) {
            "use strict";
            function r(t, e) {
                if ("function" == typeof t)
                    return r("*", t);
                if ("function" == typeof e)
                    for (var n = new a(t), i = 1; i < arguments.length; ++i)
                        r.callbacks.push(n.middleware(arguments[i]));
                else
                    "string" == typeof t ? r["string" == typeof e ? "redirect" : "show"](t, e) : r.start(t)
            }
            function i(t) {
                if (!t.handled) {
                    var e;
                    e = b ? y + m.hash.replace("#!", "") : m.pathname + m.search,
                    e !== t.canonicalPath && (r.stop(),
                    t.handled = !1,
                    m.href = t.canonicalPath)
                }
            }
            function o(t) {
                return "string" != typeof t ? t : v ? decodeURIComponent(t.replace(/\+/g, " ")) : t
            }
            function s(t, e) {
                "/" === t[0] && 0 !== t.indexOf(y) && (t = y + (b ? "#!" : "") + t);
                var n = t.indexOf("?");
                if (this.canonicalPath = t,
                this.path = t.replace(y, "") || "/",
                b && (this.path = this.path.replace("#!", "") || "/"),
                this.title = document.title,
                this.state = e || {},
                this.state.path = t,
                this.querystring = ~n ? o(t.slice(n + 1)) : "",
                this.pathname = o(~n ? t.slice(0, n) : t),
                this.params = {},
                this.hash = "",
                !b) {
                    if (!~this.path.indexOf("#"))
                        return;
                    var r = this.path.split("#");
                    this.path = r[0],
                    this.hash = o(r[1]) || "",
                    this.querystring = this.querystring.split("#")[0]
                }
            }
            function a(t, e) {
                e = e || {},
                this.path = "*" === t ? "(.*)" : t,
                this.method = "GET",
                this.regexp = h(this.path, this.keys = [], e.sensitive, e.strict)
            }
            function u(t) {
                if (1 === c(t) && !(t.metaKey || t.ctrlKey || t.shiftKey || t.defaultPrevented)) {
                    for (var e = t.target; e && "A" !== e.nodeName; )
                        e = e.parentNode;
                    if (e && "A" === e.nodeName && !e.hasAttribute("download") && "external" !== e.getAttribute("rel")) {
                        var i = e.getAttribute("href");
                        if ((b || e.pathname !== m.pathname || !e.hash && "#" !== i) && !(i && i.indexOf("mailto:") > -1) && !e.target && l(e.href)) {
                            var o = e.pathname + e.search + (e.hash || "");
                            "undefined" != typeof n && o.match(/^\/[a-zA-Z]:\//) && (o = o.replace(/^\/[a-zA-Z]:\//, "/"));
                            var s = o;
                            0 === o.indexOf(y) && (o = o.substr(y.length)),
                            b && (o = o.replace("#!", "")),
                            y && s === o || (t.preventDefault(),
                            r.show(s))
                        }
                    }
                }
            }
            function c(t) {
                return t = t || window.event,
                null === t.which ? t.button : t.which
            }
            function l(t) {
                var e = m.protocol + "//" + m.hostname;
                return m.port && (e += ":" + m.port),
                t && 0 === t.indexOf(e)
            }
            var h = t("path-to-regexp");
            e.exports = r;
            var f, p, d = "undefined" != typeof document && document.ontouchstart ? "touchstart" : "click", m = "undefined" != typeof window && (window.history.location || window.location), g = !0, v = !0, y = "", b = !1;
            r.callbacks = [],
            r.exits = [],
            r.current = "",
            r.len = 0,
            r.base = function(t) {
                return 0 === arguments.length ? y : void (y = t)
            }
            ,
            r.start = function(t) {
                if (t = t || {},
                !f && (f = !0,
                !1 === t.dispatch && (g = !1),
                !1 === t.decodeURLComponents && (v = !1),
                !1 !== t.popstate && window.addEventListener("popstate", w, !1),
                !1 !== t.click && document.addEventListener(d, u, !1),
                !0 === t.hashbang && (b = !0),
                g)) {
                    var e = b && ~m.hash.indexOf("#!") ? m.hash.substr(2) + m.search : m.pathname + m.search + m.hash;
                    r.replace(e, null , !0, g)
                }
            }
            ,
            r.stop = function() {
                f && (r.current = "",
                r.len = 0,
                f = !1,
                document.removeEventListener(d, u, !1),
                window.removeEventListener("popstate", w, !1))
            }
            ,
            r.show = function(t, e, n, i) {
                var o = new s(t,e);
                return r.current = o.path,
                !1 !== n && r.dispatch(o),
                !1 !== o.handled && !1 !== i && o.pushState(),
                o
            }
            ,
            r.back = function(t, e) {
                r.len > 0 ? (history.back(),
                r.len--) : t ? setTimeout(function() {
                    r.show(t, e)
                }) : setTimeout(function() {
                    r.show(y, e)
                })
            }
            ,
            r.redirect = function(t, e) {
                "string" == typeof t && "string" == typeof e && r(t, function(t) {
                    setTimeout(function() {
                        r.replace(e)
                    }, 0)
                }),
                "string" == typeof t && "undefined" == typeof e && setTimeout(function() {
                    r.replace(t)
                }, 0)
            }
            ,
            r.replace = function(t, e, n, i) {
                var o = new s(t,e);
                return r.current = o.path,
                o.init = n,
                o.save(),
                !1 !== i && r.dispatch(o),
                o
            }
            ,
            r.dispatch = function(t) {
                function e() {
                    var t = r.exits[a++];
                    return t ? void t(o, e) : n()
                }
                function n() {
                    var e = r.callbacks[s++];
                    return t.path !== r.current ? void (t.handled = !1) : e ? void e(t, n) : i(t)
                }
                var o = p
                  , s = 0
                  , a = 0;
                p = t,
                o ? e() : n()
            }
            ,
            r.exit = function(t, e) {
                if ("function" == typeof t)
                    return r.exit("*", t);
                for (var n = new a(t), i = 1; i < arguments.length; ++i)
                    r.exits.push(n.middleware(arguments[i]))
            }
            ,
            r.Context = s,
            s.prototype.pushState = function() {
                r.len++,
                history.pushState(this.state, this.title, b && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
            }
            ,
            s.prototype.save = function() {
                history.replaceState(this.state, this.title, b && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
            }
            ,
            r.Route = a,
            a.prototype.middleware = function(t) {
                var e = this;
                return function(n, r) {
                    return e.match(n.path, n.params) ? t(n, r) : void r()
                }
            }
            ,
            a.prototype.match = function(t, e) {
                var n = this.keys
                  , r = t.indexOf("?")
                  , i = ~r ? t.slice(0, r) : t
                  , s = this.regexp.exec(decodeURIComponent(i));
                if (!s)
                    return !1;
                for (var a = 1, u = s.length; u > a; ++a) {
                    var c = n[a - 1]
                      , l = o(s[a]);
                    void 0 === l && hasOwnProperty.call(e, c.name) || (e[c.name] = l)
                }
                return !0
            }
            ;
            var w = function() {
                var t = !1;
                if ("undefined" != typeof window)
                    return "complete" === document.readyState ? t = !0 : window.addEventListener("load", function() {
                        setTimeout(function() {
                            t = !0
                        }, 0)
                    }),
                    function(e) {
                        if (t)
                            if (e.state) {
                                var n = e.state.path;
                                r.replace(n, e.state)
                            } else
                                r.show(m.pathname + m.hash, void 0, void 0, !1)
                    }
            }();
            r.sameOrigin = l
        }
        ).call(this, t("_process"))
    }
    , {
        _process: 30,
        "path-to-regexp": 29
    }],
    29: [function(t, e, n) {
        function r(t) {
            for (var e, n = [], r = 0, i = 0, o = ""; null != (e = g.exec(t)); ) {
                var s = e[0]
                  , u = e[1]
                  , c = e.index;
                if (o += t.slice(i, c),
                i = c + s.length,
                u)
                    o += u[1];
                else {
                    o && (n.push(o),
                    o = "");
                    var l = e[2]
                      , h = e[3]
                      , f = e[4]
                      , p = e[5]
                      , d = e[6]
                      , m = e[7]
                      , v = "+" === d || "*" === d
                      , y = "?" === d || "*" === d
                      , b = l || "/"
                      , w = f || p || (m ? ".*" : "[^" + b + "]+?");
                    n.push({
                        name: h || r++,
                        prefix: l || "",
                        delimiter: b,
                        optional: y,
                        repeat: v,
                        pattern: a(w)
                    })
                }
            }
            return i < t.length && (o += t.substr(i)),
            o && n.push(o),
            n
        }
        function i(t) {
            return o(r(t))
        }
        function o(t) {
            for (var e = new Array(t.length), n = 0; n < t.length; n++)
                "object" == typeof t[n] && (e[n] = new RegExp("^" + t[n].pattern + "$"));
            return function(n) {
                for (var r = "", i = n || {}, o = 0; o < t.length; o++) {
                    var s = t[o];
                    if ("string" != typeof s) {
                        var a, u = i[s.name];
                        if (null == u) {
                            if (s.optional)
                                continue;throw new TypeError('Expected "' + s.name + '" to be defined')
                        }
                        if (m(u)) {
                            if (!s.repeat)
                                throw new TypeError('Expected "' + s.name + '" to not repeat, but received "' + u + '"');
                            if (0 === u.length) {
                                if (s.optional)
                                    continue;throw new TypeError('Expected "' + s.name + '" to not be empty')
                            }
                            for (var c = 0; c < u.length; c++) {
                                if (a = encodeURIComponent(u[c]),
                                !e[o].test(a))
                                    throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '", but received "' + a + '"');
                                r += (0 === c ? s.prefix : s.delimiter) + a
                            }
                        } else {
                            if (a = encodeURIComponent(u),
                            !e[o].test(a))
                                throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but received "' + a + '"');
                            r += s.prefix + a
                        }
                    } else
                        r += s
                }
                return r
            }
        }
        function s(t) {
            return t.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1")
        }
        function a(t) {
            return t.replace(/([=!:$\/()])/g, "\\$1")
        }
        function u(t, e) {
            return t.keys = e,
            t
        }
        function c(t) {
            return t.sensitive ? "" : "i"
        }
        function l(t, e) {
            var n = t.source.match(/\((?!\?)/g);
            if (n)
                for (var r = 0; r < n.length; r++)
                    e.push({
                        name: r,
                        prefix: null ,
                        delimiter: null ,
                        optional: !1,
                        repeat: !1,
                        pattern: null
                    });
            return u(t, e)
        }
        function h(t, e, n) {
            for (var r = [], i = 0; i < t.length; i++)
                r.push(d(t[i], e, n).source);
            var o = new RegExp("(?:" + r.join("|") + ")",c(n));
            return u(o, e)
        }
        function f(t, e, n) {
            for (var i = r(t), o = p(i, n), s = 0; s < i.length; s++)
                "string" != typeof i[s] && e.push(i[s]);
            return u(o, e)
        }
        function p(t, e) {
            e = e || {};
            for (var n = e.strict, r = e.end !== !1, i = "", o = t[t.length - 1], a = "string" == typeof o && /\/$/.test(o), u = 0; u < t.length; u++) {
                var l = t[u];
                if ("string" == typeof l)
                    i += s(l);
                else {
                    var h = s(l.prefix)
                      , f = l.pattern;
                    l.repeat && (f += "(?:" + h + f + ")*"),
                    f = l.optional ? h ? "(?:" + h + "(" + f + "))?" : "(" + f + ")?" : h + "(" + f + ")",
                    i += f
                }
            }
            return n || (i = (a ? i.slice(0, -2) : i) + "(?:\\/(?=$))?"),
            i += r ? "$" : n && a ? "" : "(?=\\/|$)",
            new RegExp("^" + i,c(e))
        }
        function d(t, e, n) {
            return e = e || [],
            m(e) ? n || (n = {}) : (n = e,
            e = []),
            t instanceof RegExp ? l(t, e, n) : m(t) ? h(t, e, n) : f(t, e, n)
        }
        var m = t("isarray");
        e.exports = d,
        e.exports.parse = r,
        e.exports.compile = i,
        e.exports.tokensToFunction = o,
        e.exports.tokensToRegExp = p;
        var g = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g")
    }
    , {
        isarray: 20
    }],
    30: [function(t, e, n) {
        function r() {
            l = !1,
            a.length ? c = a.concat(c) : h = -1,
            c.length && i()
        }
        function i() {
            if (!l) {
                var t = setTimeout(r);
                l = !0;
                for (var e = c.length; e; ) {
                    for (a = c,
                    c = []; ++h < e; )
                        a && a[h].run();
                    h = -1,
                    e = c.length
                }
                a = null ,
                l = !1,
                clearTimeout(t)
            }
        }
        function o(t, e) {
            this.fun = t,
            this.array = e
        }
        function s() {}
        var a, u = e.exports = {}, c = [], l = !1, h = -1;
        u.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    e[n - 1] = arguments[n];
            c.push(new o(t,e)),
            1 !== c.length || l || setTimeout(i, 0)
        }
        ,
        o.prototype.run = function() {
            this.fun.apply(null , this.array)
        }
        ,
        u.title = "browser",
        u.browser = !0,
        u.env = {},
        u.argv = [],
        u.version = "",
        u.versions = {},
        u.on = s,
        u.addListener = s,
        u.once = s,
        u.off = s,
        u.removeListener = s,
        u.removeAllListeners = s,
        u.emit = s,
        u.binding = function(t) {
            throw new Error("process.binding is not supported")
        }
        ,
        u.cwd = function() {
            return "/"
        }
        ,
        u.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }
        ,
        u.umask = function() {
            return 0
        }
    }
    , {}],
    31: [function(t, e, n) {
        !function(t) {
            "undefined" != typeof define && define.amd ? define([], t) : "undefined" != typeof e && e.exports ? e.exports = t() : window.scrollMonitor = t()
        }(function() {
            function t() {
                if (a.viewportTop = s(),
                a.viewportBottom = a.viewportTop + a.viewportHeight,
                a.documentHeight = b(),
                a.documentHeight !== w) {
                    for (k = u.length; k--; )
                        u[k].recalculateLocation();
                    w = a.documentHeight
                }
            }
            function e() {
                a.viewportHeight = y(),
                t(),
                r()
            }
            function n() {
                clearTimeout(S),
                S = setTimeout(e, 100)
            }
            function r() {
                for (L = u.length; L--; )
                    u[L].update();
                for (L = u.length; L--; )
                    u[L].triggerCallbacks()
            }
            function i(t, e) {
                function n(t) {
                    if (0 !== t.length)
                        for (w = t.length; w--; )
                            k = t[w],
                            k.callback.call(r, x),
                            k.isOne && t.splice(w, 1)
                }
                var r = this;
                this.watchItem = t,
                e ? e === +e ? this.offsets = {
                    top: e,
                    bottom: e
                } : this.offsets = {
                    top: e.top || v.top,
                    bottom: e.bottom || v.bottom
                } : this.offsets = v,
                this.callbacks = {};
                for (var i = 0, o = g.length; o > i; i++)
                    r.callbacks[g[i]] = [];
                this.locked = !1;
                var s, u, y, b, w, k;
                this.triggerCallbacks = function() {
                    switch (this.isInViewport && !s && n(this.callbacks[l]),
                    this.isFullyInViewport && !u && n(this.callbacks[h]),
                    this.isAboveViewport !== y && this.isBelowViewport !== b && (n(this.callbacks[c]),
                    u || this.isFullyInViewport || (n(this.callbacks[h]),
                    n(this.callbacks[p])),
                    s || this.isInViewport || (n(this.callbacks[l]),
                    n(this.callbacks[f]))),
                    !this.isFullyInViewport && u && n(this.callbacks[p]),
                    !this.isInViewport && s && n(this.callbacks[f]),
                    this.isInViewport !== s && n(this.callbacks[c]),
                    !0) {
                    case s !== this.isInViewport:
                    case u !== this.isFullyInViewport:
                    case y !== this.isAboveViewport:
                    case b !== this.isBelowViewport:
                        n(this.callbacks[m])
                    }
                    s = this.isInViewport,
                    u = this.isFullyInViewport,
                    y = this.isAboveViewport,
                    b = this.isBelowViewport
                }
                ,
                this.recalculateLocation = function() {
                    if (!this.locked) {
                        var t = this.top
                          , e = this.bottom;
                        if (this.watchItem.nodeName) {
                            var r = this.watchItem.style.display;
                            "none" === r && (this.watchItem.style.display = "");
                            var i = this.watchItem.getBoundingClientRect();
                            this.top = i.top + a.viewportTop,
                            this.bottom = i.bottom + a.viewportTop,
                            "none" === r && (this.watchItem.style.display = r)
                        } else
                            this.watchItem === +this.watchItem ? this.watchItem > 0 ? this.top = this.bottom = this.watchItem : this.top = this.bottom = a.documentHeight - this.watchItem : (this.top = this.watchItem.top,
                            this.bottom = this.watchItem.bottom);
                        this.top -= this.offsets.top,
                        this.bottom += this.offsets.bottom,
                        this.height = this.bottom - this.top,
                        void 0 === t && void 0 === e || this.top === t && this.bottom === e || n(this.callbacks[d])
                    }
                }
                ,
                this.recalculateLocation(),
                this.update(),
                s = this.isInViewport,
                u = this.isFullyInViewport,
                y = this.isAboveViewport,
                b = this.isBelowViewport
            }
            function o(e) {
                x = e,
                t(),
                r()
            }
            var s = function() {
                return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop
            }
              , a = {}
              , u = []
              , c = "visibilityChange"
              , l = "enterViewport"
              , h = "fullyEnterViewport"
              , f = "exitViewport"
              , p = "partiallyExitViewport"
              , d = "locationChange"
              , m = "stateChange"
              , g = [c, l, h, f, p, d, m]
              , v = {
                top: 0,
                bottom: 0
            }
              , y = function() {
                return window.innerHeight || document.documentElement.clientHeight
            }
              , b = function() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight)
            }
            ;
            a.viewportTop = null ,
            a.viewportBottom = null ,
            a.documentHeight = null ,
            a.viewportHeight = y();
            var w, x, k, S, L;
            i.prototype = {
                on: function(t, e, n) {
                    switch (!0) {
                    case t === c && !this.isInViewport && this.isAboveViewport:
                    case t === l && this.isInViewport:
                    case t === h && this.isFullyInViewport:
                    case t === f && this.isAboveViewport && !this.isInViewport:
                    case t === p && this.isAboveViewport:
                        if (e.call(this, x),
                        n)
                            return
                    }
                    if (!this.callbacks[t])
                        throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + g.join(", "));
                    this.callbacks[t].push({
                        callback: e,
                        isOne: n || !1
                    })
                },
                off: function(t, e) {
                    if (!this.callbacks[t])
                        throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + g.join(", "));
                    for (var n, r = 0; n = this.callbacks[t][r]; r++)
                        if (n.callback === e) {
                            this.callbacks[t].splice(r, 1);
                            break
                        }
                },
                one: function(t, e) {
                    this.on(t, e, !0)
                },
                recalculateSize: function() {
                    this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom,
                    this.bottom = this.top + this.height
                },
                update: function() {
                    this.isAboveViewport = this.top < a.viewportTop,
                    this.isBelowViewport = this.bottom > a.viewportBottom,
                    this.isInViewport = this.top <= a.viewportBottom && this.bottom >= a.viewportTop,
                    this.isFullyInViewport = this.top >= a.viewportTop && this.bottom <= a.viewportBottom || this.isAboveViewport && this.isBelowViewport
                },
                destroy: function() {
                    var t = u.indexOf(this)
                      , e = this;
                    u.splice(t, 1);
                    for (var n = 0, r = g.length; r > n; n++)
                        e.callbacks[g[n]].length = 0
                },
                lock: function() {
                    this.locked = !0
                },
                unlock: function() {
                    this.locked = !1
                }
            };
            for (var C = function(t) {
                return function(e, n) {
                    this.on.call(this, t, e, n)
                }
            }
            , T = 0, E = g.length; E > T; T++) {
                var F = g[T];
                i.prototype[F] = C(F)
            }
            try {
                t()
            } catch (j) {
                try {
                    window.$(t)
                } catch (j) {
                    throw new Error("If you must put scrollMonitor in the <head>, you must use jQuery.")
                }
            }
            return window.addEventListener ? (window.addEventListener("scroll", o),
            window.addEventListener("resize", n)) : (window.attachEvent("onscroll", o),
            window.attachEvent("onresize", n)),
            a.beget = a.create = function(t, e) {
                "string" == typeof t ? t = document.querySelector(t) : t && t.length > 0 && (t = t[0]);
                var n = new i(t,e);
                return u.push(n),
                n.update(),
                n
            }
            ,
            a.update = function() {
                x = null ,
                t(),
                r()
            }
            ,
            a.recalculateLocations = function() {
                a.documentHeight = 0,
                a.update()
            }
            ,
            a
        })
    }
    , {}],
    32: [function(t, e, n) {
        !function(t, r) {
            "use strict";
            "function" == typeof define && define.amd ? define(r) : "object" == typeof n && "object" == typeof e ? e.exports = r() : t.smoothScroll = r()
        }(this, function() {
            "use strict";
            if ("object" == typeof window && void 0 !== document.querySelectorAll && void 0 !== window.pageYOffset && void 0 !== history.pushState) {
                var t = function(t) {
                    return "HTML" === t.nodeName ? -window.pageYOffset : t.getBoundingClientRect().top + window.pageYOffset
                }
                  , e = function(t) {
                    return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }
                  , n = function(t, n, r, i) {
                    return r > i ? n : t + (n - t) * e(r / i)
                }
                  , r = function(e, r, i, o) {
                    r = r || 500,
                    o = o || window;
                    var s = window.pageYOffset;
                    if ("number" == typeof e)
                        var a = parseInt(e);
                    else
                        var a = t(e);
                    var u = Date.now()
                      , c = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
                        window.setTimeout(t, 15)
                    }
                      , l = function() {
                        var t = Date.now() - u;
                        o !== window ? o.scrollTop = n(s, a, t, r) : window.scroll(0, n(s, a, t, r)),
                        t > r ? "function" == typeof i && i(e) : c(l)
                    }
                    ;
                    l()
                }
                  , i = function(t) {
                    t.preventDefault(),
                    location.hash !== this.hash && window.history.pushState(null , null , this.hash),
                    r(document.getElementById(this.hash.substring(1)), 500, function(t) {
                        location.replace("#" + t.id)
                    })
                }
                ;
                return document.addEventListener("DOMContentLoaded", function() {
                    for (var t, e = document.querySelectorAll('a[href^="#"]:not([href="#"])'), n = e.length; t = e[--n]; )
                        t.addEventListener("click", i, !1)
                }),
                r
            }
        })
    }
    , {}],
    33: [function(t, e, n) {
        window.eve = t("snapsvg/node_modules/eve");
        var r = function(t) {
            var e = {}
              , n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                setTimeout(t, 16)
            }
              , r = Array.isArray || function(t) {
                return t instanceof Array || "[object Array]" == Object.prototype.toString.call(t)
            }
              , i = 0
              , o = "M" + (+new Date).toString(36)
              , s = function() {
                return o + (i++).toString(36)
            }
              , a = Date.now || function() {
                return +new Date
            }
              , u = function(t) {
                var e = this;
                if (null == t)
                    return e.s;
                var n = e.s - t;
                e.b += e.dur * n,
                e.B += e.dur * n,
                e.s = t
            }
              , c = function(t) {
                var e = this;
                return null == t ? e.spd : void (e.spd = t)
            }
              , l = function(t) {
                var e = this;
                return null == t ? e.dur : (e.s = e.s * t / e.dur,
                void (e.dur = t))
            }
              , h = function() {
                var n = this;
                delete e[n.id],
                n.update(),
                t("mina.stop." + n.id, n)
            }
              , f = function() {
                var t = this;
                t.pdif || (delete e[t.id],
                t.update(),
                t.pdif = t.get() - t.b)
            }
              , p = function() {
                var t = this;
                t.pdif && (t.b = t.get() - t.pdif,
                delete t.pdif,
                e[t.id] = t)
            }
              , d = function() {
                var t, e = this;
                if (r(e.start)) {
                    t = [];
                    for (var n = 0, i = e.start.length; i > n; n++)
                        t[n] = +e.start[n] + (e.end[n] - e.start[n]) * e.easing(e.s)
                } else
                    t = +e.start + (e.end - e.start) * e.easing(e.s);
                e.set(t)
            }
              , m = function() {
                var r = 0;
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var o = e[i]
                          , s = o.get();
                        r++,
                        o.s = (s - o.b) / (o.dur / o.spd),
                        o.s >= 1 && (delete e[i],
                        o.s = 1,
                        r--,
                        function(e) {
                            setTimeout(function() {
                                t("mina.finish." + e.id, e)
                            })
                        }(o)),
                        o.update()
                    }
                r && n(m)
            }
              , g = function(t, r, i, o, a, v, y) {
                var b = {
                    id: s(),
                    start: t,
                    end: r,
                    b: i,
                    s: 0,
                    dur: o - i,
                    spd: 1,
                    get: a,
                    set: v,
                    easing: y || g.linear,
                    status: u,
                    speed: c,
                    duration: l,
                    stop: h,
                    pause: f,
                    resume: p,
                    update: d
                };
                e[b.id] = b;
                var w, x = 0;
                for (w in e)
                    if (e.hasOwnProperty(w) && (x++,
                    2 == x))
                        break;
                return 1 == x && n(m),
                b
            }
            ;
            return g.time = a,
            g.getById = function(t) {
                return e[t] || null
            }
            ,
            g.linear = function(t) {
                return t
            }
            ,
            g.easeout = function(t) {
                return Math.pow(t, 1.7)
            }
            ,
            g.easein = function(t) {
                return Math.pow(t, .48)
            }
            ,
            g.easeinout = function(t) {
                if (1 == t)
                    return 1;
                if (0 == t)
                    return 0;
                var e = .48 - t / 1.04
                  , n = Math.sqrt(.1734 + e * e)
                  , r = n - e
                  , i = Math.pow(Math.abs(r), 1 / 3) * (0 > r ? -1 : 1)
                  , o = -n - e
                  , s = Math.pow(Math.abs(o), 1 / 3) * (0 > o ? -1 : 1)
                  , a = i + s + .5;
                return 3 * (1 - a) * a * a + a * a * a
            }
            ,
            g.backin = function(t) {
                if (1 == t)
                    return 1;
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }
            ,
            g.backout = function(t) {
                if (0 == t)
                    return 0;
                t -= 1;
                var e = 1.70158;
                return t * t * ((e + 1) * t + e) + 1
            }
            ,
            g.elastic = function(t) {
                return t == !!t ? t : Math.pow(2, -10 * t) * Math.sin((t - .075) * (2 * Math.PI) / .3) + 1
            }
            ,
            g.bounce = function(t) {
                var e, n = 7.5625, r = 2.75;
                return 1 / r > t ? e = n * t * t : 2 / r > t ? (t -= 1.5 / r,
                e = n * t * t + .75) : 2.5 / r > t ? (t -= 2.25 / r,
                e = n * t * t + .9375) : (t -= 2.625 / r,
                e = n * t * t + .984375),
                e
            }
            ,
            window.mina = g,
            g
        }("undefined" == typeof eve ? function() {}
        : eve)
          , i = function(t) {
            function e(t, n) {
                if (t) {
                    if (t.nodeType)
                        return x(t);
                    if (r(t, "array") && e.set)
                        return e.set.apply(e, t);
                    if (t instanceof v)
                        return t;
                    if (null == n)
                        return t = S.doc.querySelector(String(t)),
                        x(t)
                }
                return t = null == t ? "100%" : t,
                n = null == n ? "100%" : n,
                new w(t,n)
            }
            function n(t, e) {
                if (e) {
                    if ("#text" == t && (t = S.doc.createTextNode(e.text || e["#text"] || "")),
                    "#comment" == t && (t = S.doc.createComment(e.text || e["#text"] || "")),
                    "string" == typeof t && (t = n(t)),
                    "string" == typeof e)
                        return 1 == t.nodeType ? "xlink:" == e.substring(0, 6) ? t.getAttributeNS(G, e.substring(6)) : "xml:" == e.substring(0, 4) ? t.getAttributeNS(H, e.substring(4)) : t.getAttribute(e) : "text" == e ? t.nodeValue : null ;
                    if (1 == t.nodeType) {
                        for (var r in e)
                            if (e[L](r)) {
                                var i = C(e[r]);
                                i ? "xlink:" == r.substring(0, 6) ? t.setAttributeNS(G, r.substring(6), i) : "xml:" == r.substring(0, 4) ? t.setAttributeNS(H, r.substring(4), i) : t.setAttribute(r, i) : t.removeAttribute(r)
                            }
                    } else
                        "text"in e && (t.nodeValue = e.text)
                } else
                    t = S.doc.createElementNS(H, t);
                return t
            }
            function r(t, e) {
                return e = C.prototype.toLowerCase.call(e),
                "finite" == e ? isFinite(t) : "array" == e && (t instanceof Array || Array.isArray && Array.isArray(t)) ? !0 : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || N.call(t).slice(8, -1).toLowerCase() == e
            }
            function i(t) {
                if ("function" == typeof t || Object(t) !== t)
                    return t;
                var e = new t.constructor;
                for (var n in t)
                    t[L](n) && (e[n] = i(t[n]));
                return e
            }
            function o(t, e) {
                for (var n = 0, r = t.length; r > n; n++)
                    if (t[n] === e)
                        return t.push(t.splice(n, 1)[0])
            }
            function s(t, e, n) {
                function r() {
                    var i = Array.prototype.slice.call(arguments, 0)
                      , s = i.join("␀")
                      , a = r.cache = r.cache || {}
                      , u = r.count = r.count || [];
                    return a[L](s) ? (o(u, s),
                    n ? n(a[s]) : a[s]) : (u.length >= 1e3 && delete a[u.shift()],
                    u.push(s),
                    a[s] = t.apply(e, i),
                    n ? n(a[s]) : a[s])
                }
                return r
            }
            function a(t, e, n, r, i, o) {
                if (null == i) {
                    var s = t - n
                      , u = e - r;
                    return s || u ? (180 + 180 * F.atan2(-u, -s) / I + 360) % 360 : 0
                }
                return a(t, e, i, o) - a(n, r, i, o)
            }
            function u(t) {
                return t % 360 * I / 180
            }
            function c(t) {
                return 180 * t / I % 360
            }
            function l(t) {
                var e = [];
                return t = t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(t, n, r) {
                    return r = r.split(/\s*,\s*|\s+/),
                    "rotate" == n && 1 == r.length && r.push(0, 0),
                    "scale" == n && (r.length > 2 ? r = r.slice(0, 2) : 2 == r.length && r.push(0, 0),
                    1 == r.length && r.push(r[0], 0, 0)),
                    "skewX" == n ? e.push(["m", 1, 0, F.tan(u(r[0])), 1, 0, 0]) : "skewY" == n ? e.push(["m", 1, F.tan(u(r[0])), 0, 1, 0, 0]) : e.push([n.charAt(0)].concat(r)),
                    t
                }),
                e
            }
            function h(t, n) {
                var r = Q(t)
                  , i = new e.Matrix;
                if (r)
                    for (var o = 0, s = r.length; s > o; o++) {
                        var a, u, c, l, h, f = r[o], p = f.length, d = C(f[0]).toLowerCase(), m = f[0] != d, g = m ? i.invert() : 0;
                        "t" == d && 2 == p ? i.translate(f[1], 0) : "t" == d && 3 == p ? m ? (a = g.x(0, 0),
                        u = g.y(0, 0),
                        c = g.x(f[1], f[2]),
                        l = g.y(f[1], f[2]),
                        i.translate(c - a, l - u)) : i.translate(f[1], f[2]) : "r" == d ? 2 == p ? (h = h || n,
                        i.rotate(f[1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p && (m ? (c = g.x(f[2], f[3]),
                        l = g.y(f[2], f[3]),
                        i.rotate(f[1], c, l)) : i.rotate(f[1], f[2], f[3])) : "s" == d ? 2 == p || 3 == p ? (h = h || n,
                        i.scale(f[1], f[p - 1], h.x + h.width / 2, h.y + h.height / 2)) : 4 == p ? m ? (c = g.x(f[2], f[3]),
                        l = g.y(f[2], f[3]),
                        i.scale(f[1], f[1], c, l)) : i.scale(f[1], f[1], f[2], f[3]) : 5 == p && (m ? (c = g.x(f[3], f[4]),
                        l = g.y(f[3], f[4]),
                        i.scale(f[1], f[2], c, l)) : i.scale(f[1], f[2], f[3], f[4])) : "m" == d && 7 == p && i.add(f[1], f[2], f[3], f[4], f[5], f[6])
                    }
                return i
            }
            function f(t) {
                var n = t.node.ownerSVGElement && x(t.node.ownerSVGElement) || t.node.parentNode && x(t.node.parentNode) || e.select("svg") || e(0, 0)
                  , r = n.select("defs")
                  , i = null == r ? !1 : r.node;
                return i || (i = b("defs", n.node).node),
                i
            }
            function p(t) {
                return t.node.ownerSVGElement && x(t.node.ownerSVGElement) || e.select("svg")
            }
            function d(t, e, r) {
                function i(t) {
                    if (null == t)
                        return B;
                    if (t == +t)
                        return t;
                    n(c, {
                        width: t
                    });
                    try {
                        return c.getBBox().width
                    } catch (e) {
                        return 0
                    }
                }
                function o(t) {
                    if (null == t)
                        return B;
                    if (t == +t)
                        return t;
                    n(c, {
                        height: t
                    });
                    try {
                        return c.getBBox().height
                    } catch (e) {
                        return 0
                    }
                }
                function s(n, i) {
                    null == e ? u[n] = i(t.attr(n) || 0) : n == e && (u = i(null == r ? t.attr(n) || 0 : r))
                }
                var a = p(t).node
                  , u = {}
                  , c = a.querySelector(".svg---mgr");
                switch (c || (c = n("rect"),
                n(c, {
                    x: -9e9,
                    y: -9e9,
                    width: 10,
                    height: 10,
                    "class": "svg---mgr",
                    fill: "none"
                }),
                a.appendChild(c)),
                t.type) {
                case "rect":
                    s("rx", i),
                    s("ry", o);
                case "image":
                    s("width", i),
                    s("height", o);
                case "text":
                    s("x", i),
                    s("y", o);
                    break;
                case "circle":
                    s("cx", i),
                    s("cy", o),
                    s("r", i);
                    break;
                case "ellipse":
                    s("cx", i),
                    s("cy", o),
                    s("rx", i),
                    s("ry", o);
                    break;
                case "line":
                    s("x1", i),
                    s("x2", i),
                    s("y1", o),
                    s("y2", o);
                    break;
                case "marker":
                    s("refX", i),
                    s("markerWidth", i),
                    s("refY", o),
                    s("markerHeight", o);
                    break;
                case "radialGradient":
                    s("fx", i),
                    s("fy", o);
                    break;
                case "tspan":
                    s("dx", i),
                    s("dy", o);
                    break;
                default:
                    s(e, i)
                }
                return a.removeChild(c),
                u
            }
            function m(t) {
                r(t, "array") || (t = Array.prototype.slice.call(arguments, 0));
                for (var e = 0, n = 0, i = this.node; this[e]; )
                    delete this[e++];
                for (e = 0; e < t.length; e++)
                    "set" == t[e].type ? t[e].forEach(function(t) {
                        i.appendChild(t.node)
                    }) : i.appendChild(t[e].node);
                var o = i.childNodes;
                for (e = 0; e < o.length; e++)
                    this[n++] = x(o[e]);
                return this
            }
            function v(t) {
                if (t.snap in $)
                    return $[t.snap];
                var e;
                try {
                    e = t.ownerSVGElement
                } catch (n) {}
                this.node = t,
                e && (this.paper = new w(e)),
                this.type = t.tagName || t.nodeName;
                var r = this.id = U(this);
                if (this.anims = {},
                this._ = {
                    transform: []
                },
                t.snap = r,
                $[r] = this,
                "g" == this.type && (this.add = m),
                this.type in {
                    g: 1,
                    mask: 1,
                    pattern: 1,
                    symbol: 1
                })
                    for (var i in w.prototype)
                        w.prototype[L](i) && (this[i] = w.prototype[i])
            }
            function y(t) {
                this.node = t
            }
            function b(t, e) {
                var r = n(t);
                e.appendChild(r);
                var i = x(r);
                return i
            }
            function w(t, e) {
                var r, i, o, s = w.prototype;
                if (t && "svg" == t.tagName) {
                    if (t.snap in $)
                        return $[t.snap];
                    var a = t.ownerDocument;
                    r = new v(t),
                    i = t.getElementsByTagName("desc")[0],
                    o = t.getElementsByTagName("defs")[0],
                    i || (i = n("desc"),
                    i.appendChild(a.createTextNode("Created with Snap")),
                    r.node.appendChild(i)),
                    o || (o = n("defs"),
                    r.node.appendChild(o)),
                    r.defs = o;
                    for (var u in s)
                        s[L](u) && (r[u] = s[u]);
                    r.paper = r.root = r
                } else
                    r = b("svg", S.doc.body),
                    n(r.node, {
                        height: e,
                        version: 1.1,
                        width: t,
                        xmlns: H
                    });
                return r
            }
            function x(t) {
                return t ? t instanceof v || t instanceof y ? t : t.tagName && "svg" == t.tagName.toLowerCase() ? new w(t) : t.tagName && "object" == t.tagName.toLowerCase() && "image/svg+xml" == t.type ? new w(t.contentDocument.getElementsByTagName("svg")[0]) : new v(t) : t
            }
            function k(t, e) {
                for (var n = 0, r = t.length; r > n; n++) {
                    var i = {
                        type: t[n].type,
                        attr: t[n].attr()
                    }
                      , o = t[n].children();
                    e.push(i),
                    o.length && k(o, i.childNodes = [])
                }
            }
            e.version = "0.4.0",
            e.toString = function() {
                return "Snap v" + this.version
            }
            ,
            e._ = {};
            var S = {
                win: t.window,
                doc: t.window.document
            };
            e._.glob = S;
            var L = "hasOwnProperty"
              , C = String
              , T = parseFloat
              , E = parseInt
              , F = Math
              , j = F.max
              , _ = F.min
              , A = F.abs
              , I = (F.pow,
            F.PI)
              , B = (F.round,
            "")
              , N = Object.prototype.toString
              , q = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i
              , O = (e._.separator = /[,\s]+/,
            /[\s]*,[\s]*/)
              , P = {
                hs: 1,
                rg: 1
            }
              , M = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi
              , V = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi
              , R = /(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi
              , D = 0
              , z = "S" + (+new Date).toString(36)
              , U = function(t) {
                return (t && t.type ? t.type : B) + z + (D++).toString(36)
            }
              , G = "http://www.w3.org/1999/xlink"
              , H = "http://www.w3.org/2000/svg"
              , $ = {};
            e.url = function(t) {
                return "url('#" + t + "')"
            }
            ;
            e._.$ = n,
            e._.id = U,
            e.format = function() {
                var t = /\{([^\}]+)\}/g
                  , e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g
                  , n = function(t, n, r) {
                    var i = r;
                    return n.replace(e, function(t, e, n, r, o) {
                        e = e || r,
                        i && (e in i && (i = i[e]),
                        "function" == typeof i && o && (i = i()))
                    }),
                    i = (null == i || i == r ? t : i) + ""
                }
                ;
                return function(e, r) {
                    return C(e).replace(t, function(t, e) {
                        return n(t, e, r)
                    })
                }
            }(),
            e._.clone = i,
            e._.cacher = s,
            e.rad = u,
            e.deg = c,
            e.sin = function(t) {
                return F.sin(e.rad(t))
            }
            ,
            e.tan = function(t) {
                return F.tan(e.rad(t))
            }
            ,
            e.cos = function(t) {
                return F.cos(e.rad(t))
            }
            ,
            e.asin = function(t) {
                return e.deg(F.asin(t))
            }
            ,
            e.acos = function(t) {
                return e.deg(F.acos(t))
            }
            ,
            e.atan = function(t) {
                return e.deg(F.atan(t))
            }
            ,
            e.atan2 = function(t) {
                return e.deg(F.atan2(t))
            }
            ,
            e.angle = a,
            e.len = function(t, n, r, i) {
                return Math.sqrt(e.len2(t, n, r, i))
            }
            ,
            e.len2 = function(t, e, n, r) {
                return (t - n) * (t - n) + (e - r) * (e - r)
            }
            ,
            e.closestPoint = function(t, e, n) {
                function r(t) {
                    var r = t.x - e
                      , i = t.y - n;
                    return r * r + i * i
                }
                for (var i, o, s, a, u = t.node, c = u.getTotalLength(), l = c / u.pathSegList.numberOfItems * .125, h = 1 / 0, f = 0; c >= f; f += l)
                    (a = r(s = u.getPointAtLength(f))) < h && (i = s,
                    o = f,
                    h = a);
                for (l *= .5; l > .5; ) {
                    var p, d, m, g, v, y;
                    (m = o - l) >= 0 && (v = r(p = u.getPointAtLength(m))) < h ? (i = p,
                    o = m,
                    h = v) : (g = o + l) <= c && (y = r(d = u.getPointAtLength(g))) < h ? (i = d,
                    o = g,
                    h = y) : l *= .5
                }
                return i = {
                    x: i.x,
                    y: i.y,
                    length: o,
                    distance: Math.sqrt(h)
                }
            }
            ,
            e.is = r,
            e.snapTo = function(t, e, n) {
                if (n = r(n, "finite") ? n : 10,
                r(t, "array")) {
                    for (var i = t.length; i--; )
                        if (A(t[i] - e) <= n)
                            return t[i]
                } else {
                    t = +t;
                    var o = e % t;
                    if (n > o)
                        return e - o;
                    if (o > t - n)
                        return e - o + t
                }
                return e
            }
            ,
            e.getRGB = s(function(t) {
                if (!t || (t = C(t)).indexOf("-") + 1)
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: J
                    };
                if ("none" == t)
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        toString: J
                    };
                if (!(P[L](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = X(t)),
                !t)
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: J
                    };
                var n, i, o, s, a, u, c = t.match(q);
                return c ? (c[2] && (o = E(c[2].substring(5), 16),
                i = E(c[2].substring(3, 5), 16),
                n = E(c[2].substring(1, 3), 16)),
                c[3] && (o = E((a = c[3].charAt(3)) + a, 16),
                i = E((a = c[3].charAt(2)) + a, 16),
                n = E((a = c[3].charAt(1)) + a, 16)),
                c[4] && (u = c[4].split(O),
                n = T(u[0]),
                "%" == u[0].slice(-1) && (n *= 2.55),
                i = T(u[1]),
                "%" == u[1].slice(-1) && (i *= 2.55),
                o = T(u[2]),
                "%" == u[2].slice(-1) && (o *= 2.55),
                "rgba" == c[1].toLowerCase().slice(0, 4) && (s = T(u[3])),
                u[3] && "%" == u[3].slice(-1) && (s /= 100)),
                c[5] ? (u = c[5].split(O),
                n = T(u[0]),
                "%" == u[0].slice(-1) && (n /= 100),
                i = T(u[1]),
                "%" == u[1].slice(-1) && (i /= 100),
                o = T(u[2]),
                "%" == u[2].slice(-1) && (o /= 100),
                ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (n /= 360),
                "hsba" == c[1].toLowerCase().slice(0, 4) && (s = T(u[3])),
                u[3] && "%" == u[3].slice(-1) && (s /= 100),
                e.hsb2rgb(n, i, o, s)) : c[6] ? (u = c[6].split(O),
                n = T(u[0]),
                "%" == u[0].slice(-1) && (n /= 100),
                i = T(u[1]),
                "%" == u[1].slice(-1) && (i /= 100),
                o = T(u[2]),
                "%" == u[2].slice(-1) && (o /= 100),
                ("deg" == u[0].slice(-3) || "°" == u[0].slice(-1)) && (n /= 360),
                "hsla" == c[1].toLowerCase().slice(0, 4) && (s = T(u[3])),
                u[3] && "%" == u[3].slice(-1) && (s /= 100),
                e.hsl2rgb(n, i, o, s)) : (n = _(F.round(n), 255),
                i = _(F.round(i), 255),
                o = _(F.round(o), 255),
                s = _(j(s, 0), 1),
                c = {
                    r: n,
                    g: i,
                    b: o,
                    toString: J
                },
                c.hex = "#" + (16777216 | o | i << 8 | n << 16).toString(16).slice(1),
                c.opacity = r(s, "finite") ? s : 1,
                c)) : {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1,
                    toString: J
                }
            }, e),
            e.hsb = s(function(t, n, r) {
                return e.hsb2rgb(t, n, r).hex
            }),
            e.hsl = s(function(t, n, r) {
                return e.hsl2rgb(t, n, r).hex
            }),
            e.rgb = s(function(t, e, n, i) {
                if (r(i, "finite")) {
                    var o = F.round;
                    return "rgba(" + [o(t), o(e), o(n), +i.toFixed(2)] + ")"
                }
                return "#" + (16777216 | n | e << 8 | t << 16).toString(16).slice(1)
            });
            var X = function(t) {
                var e = S.doc.getElementsByTagName("head")[0] || S.doc.getElementsByTagName("svg")[0]
                  , n = "rgb(255, 0, 0)";
                return (X = s(function(t) {
                    if ("red" == t.toLowerCase())
                        return n;
                    e.style.color = n,
                    e.style.color = t;
                    var r = S.doc.defaultView.getComputedStyle(e, B).getPropertyValue("color");
                    return r == n ? null : r
                }))(t)
            }
              , Y = function() {
                return "hsb(" + [this.h, this.s, this.b] + ")"
            }
              , W = function() {
                return "hsl(" + [this.h, this.s, this.l] + ")"
            }
              , J = function() {
                return 1 == this.opacity || null == this.opacity ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
            }
              , Z = function(t, n, i) {
                if (null == n && r(t, "object") && "r"in t && "g"in t && "b"in t && (i = t.b,
                n = t.g,
                t = t.r),
                null == n && r(t, string)) {
                    var o = e.getRGB(t);
                    t = o.r,
                    n = o.g,
                    i = o.b
                }
                return (t > 1 || n > 1 || i > 1) && (t /= 255,
                n /= 255,
                i /= 255),
                [t, n, i]
            }
              , K = function(t, n, i, o) {
                t = F.round(255 * t),
                n = F.round(255 * n),
                i = F.round(255 * i);
                var s = {
                    r: t,
                    g: n,
                    b: i,
                    opacity: r(o, "finite") ? o : 1,
                    hex: e.rgb(t, n, i),
                    toString: J
                };
                return r(o, "finite") && (s.opacity = o),
                s
            }
            ;
            e.color = function(t) {
                var n;
                return r(t, "object") && "h"in t && "s"in t && "b"in t ? (n = e.hsb2rgb(t),
                t.r = n.r,
                t.g = n.g,
                t.b = n.b,
                t.opacity = 1,
                t.hex = n.hex) : r(t, "object") && "h"in t && "s"in t && "l"in t ? (n = e.hsl2rgb(t),
                t.r = n.r,
                t.g = n.g,
                t.b = n.b,
                t.opacity = 1,
                t.hex = n.hex) : (r(t, "string") && (t = e.getRGB(t)),
                r(t, "object") && "r"in t && "g"in t && "b"in t && !("error"in t) ? (n = e.rgb2hsl(t),
                t.h = n.h,
                t.s = n.s,
                t.l = n.l,
                n = e.rgb2hsb(t),
                t.v = n.b) : (t = {
                    hex: "none"
                },
                t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1,
                t.error = 1)),
                t.toString = J,
                t
            }
            ,
            e.hsb2rgb = function(t, e, n, i) {
                r(t, "object") && "h"in t && "s"in t && "b"in t && (n = t.b,
                e = t.s,
                i = t.o,
                t = t.h),
                t *= 360;
                var o, s, a, u, c;
                return t = t % 360 / 60,
                c = n * e,
                u = c * (1 - A(t % 2 - 1)),
                o = s = a = n - c,
                t = ~~t,
                o += [c, u, 0, 0, u, c][t],
                s += [u, c, c, u, 0, 0][t],
                a += [0, 0, u, c, c, u][t],
                K(o, s, a, i)
            }
            ,
            e.hsl2rgb = function(t, e, n, i) {
                r(t, "object") && "h"in t && "s"in t && "l"in t && (n = t.l,
                e = t.s,
                t = t.h),
                (t > 1 || e > 1 || n > 1) && (t /= 360,
                e /= 100,
                n /= 100),
                t *= 360;
                var o, s, a, u, c;
                return t = t % 360 / 60,
                c = 2 * e * (.5 > n ? n : 1 - n),
                u = c * (1 - A(t % 2 - 1)),
                o = s = a = n - c / 2,
                t = ~~t,
                o += [c, u, 0, 0, u, c][t],
                s += [u, c, c, u, 0, 0][t],
                a += [0, 0, u, c, c, u][t],
                K(o, s, a, i)
            }
            ,
            e.rgb2hsb = function(t, e, n) {
                n = Z(t, e, n),
                t = n[0],
                e = n[1],
                n = n[2];
                var r, i, o, s;
                return o = j(t, e, n),
                s = o - _(t, e, n),
                r = 0 == s ? null : o == t ? (e - n) / s : o == e ? (n - t) / s + 2 : (t - e) / s + 4,
                r = (r + 360) % 6 * 60 / 360,
                i = 0 == s ? 0 : s / o,
                {
                    h: r,
                    s: i,
                    b: o,
                    toString: Y
                }
            }
            ,
            e.rgb2hsl = function(t, e, n) {
                n = Z(t, e, n),
                t = n[0],
                e = n[1],
                n = n[2];
                var r, i, o, s, a, u;
                return s = j(t, e, n),
                a = _(t, e, n),
                u = s - a,
                r = 0 == u ? null : s == t ? (e - n) / u : s == e ? (n - t) / u + 2 : (t - e) / u + 4,
                r = (r + 360) % 6 * 60 / 360,
                o = (s + a) / 2,
                i = 0 == u ? 0 : .5 > o ? u / (2 * o) : u / (2 - 2 * o),
                {
                    h: r,
                    s: i,
                    l: o,
                    toString: W
                }
            }
            ,
            e.parsePathString = function(t) {
                if (!t)
                    return null ;
                var n = e.path(t);
                if (n.arr)
                    return e.path.clone(n.arr);
                var i = {
                    a: 7,
                    c: 6,
                    o: 2,
                    h: 1,
                    l: 2,
                    m: 2,
                    r: 4,
                    q: 4,
                    s: 4,
                    t: 2,
                    v: 1,
                    u: 3,
                    z: 0
                }
                  , o = [];
                return r(t, "array") && r(t[0], "array") && (o = e.path.clone(t)),
                o.length || C(t).replace(M, function(t, e, n) {
                    var r = []
                      , s = e.toLowerCase();
                    if (n.replace(R, function(t, e) {
                        e && r.push(+e)
                    }),
                    "m" == s && r.length > 2 && (o.push([e].concat(r.splice(0, 2))),
                    s = "l",
                    e = "m" == e ? "l" : "L"),
                    "o" == s && 1 == r.length && o.push([e, r[0]]),
                    "r" == s)
                        o.push([e].concat(r));
                    else
                        for (; r.length >= i[s] && (o.push([e].concat(r.splice(0, i[s]))),
                        i[s]); )
                            ;
                }),
                o.toString = e.path.toString,
                n.arr = e.path.clone(o),
                o
            }
            ;
            var Q = e.parseTransformString = function(t) {
                if (!t)
                    return null ;
                var n = [];
                return r(t, "array") && r(t[0], "array") && (n = e.path.clone(t)),
                n.length || C(t).replace(V, function(t, e, r) {
                    var i = [];
                    e.toLowerCase();
                    r.replace(R, function(t, e) {
                        e && i.push(+e)
                    }),
                    n.push([e].concat(i))
                }),
                n.toString = e.path.toString,
                n
            }
            ;
            e._.svgTransform2string = l,
            e._.rgTransform = /^[a-z][\s]*-?\.?\d/i,
            e._.transform2matrix = h,
            e._unit2px = d;
            S.doc.contains || S.doc.compareDocumentPosition ? function(t, e) {
                var n = 9 == t.nodeType ? t.documentElement : t
                  , r = e && e.parentNode;
                return t == r || !(!r || 1 != r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
            }
            : function(t, e) {
                if (e)
                    for (; e; )
                        if (e = e.parentNode,
                        e == t)
                            return !0;
                return !1
            }
            ;
            e._.getSomeDefs = f,
            e._.getSomeSVG = p,
            e.select = function(t) {
                return t = C(t).replace(/([^\\]):/g, "$1\\:"),
                x(S.doc.querySelector(t))
            }
            ,
            e.selectAll = function(t) {
                for (var n = S.doc.querySelectorAll(t), r = (e.set || Array)(), i = 0; i < n.length; i++)
                    r.push(x(n[i]));
                return r
            }
            ,
            setInterval(function() {
                for (var t in $)
                    if ($[L](t)) {
                        var e = $[t]
                          , n = e.node;
                        ("svg" != e.type && !n.ownerSVGElement || "svg" == e.type && (!n.parentNode || "ownerSVGElement"in n.parentNode && !n.ownerSVGElement)) && delete $[t]
                    }
            }, 1e4),
            v.prototype.attr = function(t, e) {
                var n = this
                  , i = n.node;
                if (!t) {
                    if (1 != i.nodeType)
                        return {
                            text: i.nodeValue
                        };
                    for (var o = i.attributes, s = {}, a = 0, u = o.length; u > a; a++)
                        s[o[a].nodeName] = o[a].nodeValue;
                    return s
                }
                if (r(t, "string")) {
                    if (!(arguments.length > 1))
                        return eve("snap.util.getattr." + t, n).firstDefined();
                    var c = {};
                    c[t] = e,
                    t = c
                }
                for (var l in t)
                    t[L](l) && eve("snap.util.attr." + l, n, t[l]);
                return n
            }
            ,
            e.parse = function(t) {
                var e = S.doc.createDocumentFragment()
                  , n = !0
                  , r = S.doc.createElement("div");
                if (t = C(t),
                t.match(/^\s*<\s*svg(?:\s|>)/) || (t = "<svg>" + t + "</svg>",
                n = !1),
                r.innerHTML = t,
                t = r.getElementsByTagName("svg")[0])
                    if (n)
                        e = t;
                    else
                        for (; t.firstChild; )
                            e.appendChild(t.firstChild);
                return new y(e)
            }
            ,
            e.fragment = function() {
                for (var t = Array.prototype.slice.call(arguments, 0), n = S.doc.createDocumentFragment(), r = 0, i = t.length; i > r; r++) {
                    var o = t[r];
                    o.node && o.node.nodeType && n.appendChild(o.node),
                    o.nodeType && n.appendChild(o),
                    "string" == typeof o && n.appendChild(e.parse(o).node)
                }
                return new y(n)
            }
            ,
            e._.make = b,
            e._.wrap = x,
            w.prototype.el = function(t, e) {
                var n = b(t, this.node);
                return e && n.attr(e),
                n
            }
            ,
            v.prototype.children = function() {
                for (var t = [], n = this.node.childNodes, r = 0, i = n.length; i > r; r++)
                    t[r] = e(n[r]);
                return t
            }
            ,
            v.prototype.toJSON = function() {
                var t = [];
                return k([this], t),
                t[0]
            }
            ,
            eve.on("snap.util.getattr", function() {
                var t = eve.nt();
                t = t.substring(t.lastIndexOf(".") + 1);
                var e = t.replace(/[A-Z]/g, function(t) {
                    return "-" + t.toLowerCase()
                });
                return tt[L](e) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null ).getPropertyValue(e) : n(this.node, t)
            });
            var tt = {
                "alignment-baseline": 0,
                "baseline-shift": 0,
                clip: 0,
                "clip-path": 0,
                "clip-rule": 0,
                color: 0,
                "color-interpolation": 0,
                "color-interpolation-filters": 0,
                "color-profile": 0,
                "color-rendering": 0,
                cursor: 0,
                direction: 0,
                display: 0,
                "dominant-baseline": 0,
                "enable-background": 0,
                fill: 0,
                "fill-opacity": 0,
                "fill-rule": 0,
                filter: 0,
                "flood-color": 0,
                "flood-opacity": 0,
                font: 0,
                "font-family": 0,
                "font-size": 0,
                "font-size-adjust": 0,
                "font-stretch": 0,
                "font-style": 0,
                "font-variant": 0,
                "font-weight": 0,
                "glyph-orientation-horizontal": 0,
                "glyph-orientation-vertical": 0,
                "image-rendering": 0,
                kerning: 0,
                "letter-spacing": 0,
                "lighting-color": 0,
                marker: 0,
                "marker-end": 0,
                "marker-mid": 0,
                "marker-start": 0,
                mask: 0,
                opacity: 0,
                overflow: 0,
                "pointer-events": 0,
                "shape-rendering": 0,
                "stop-color": 0,
                "stop-opacity": 0,
                stroke: 0,
                "stroke-dasharray": 0,
                "stroke-dashoffset": 0,
                "stroke-linecap": 0,
                "stroke-linejoin": 0,
                "stroke-miterlimit": 0,
                "stroke-opacity": 0,
                "stroke-width": 0,
                "text-anchor": 0,
                "text-decoration": 0,
                "text-rendering": 0,
                "unicode-bidi": 0,
                visibility: 0,
                "word-spacing": 0,
                "writing-mode": 0
            };
            eve.on("snap.util.attr", function(t) {
                var e = eve.nt()
                  , r = {};
                e = e.substring(e.lastIndexOf(".") + 1),
                r[e] = t;
                var i = e.replace(/-(\w)/gi, function(t, e) {
                    return e.toUpperCase()
                })
                  , o = e.replace(/[A-Z]/g, function(t) {
                    return "-" + t.toLowerCase()
                });
                tt[L](o) ? this.node.style[i] = null == t ? B : t : n(this.node, r)
            }),
            function(t) {}(w.prototype),
            e.ajax = function(t, e, n, i) {
                var o = new XMLHttpRequest
                  , s = U();
                if (o) {
                    if (r(e, "function"))
                        i = n,
                        n = e,
                        e = null ;
                    else if (r(e, "object")) {
                        var a = [];
                        for (var u in e)
                            e.hasOwnProperty(u) && a.push(encodeURIComponent(u) + "=" + encodeURIComponent(e[u]));
                        e = a.join("&")
                    }
                    return o.open(e ? "POST" : "GET", t, !0),
                    e && (o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                    o.setRequestHeader("Content-type", "application/x-www-form-urlencoded")),
                    n && (eve.once("snap.ajax." + s + ".0", n),
                    eve.once("snap.ajax." + s + ".200", n),
                    eve.once("snap.ajax." + s + ".304", n)),
                    o.onreadystatechange = function() {
                        4 == o.readyState && eve("snap.ajax." + s + "." + o.status, i, o)
                    }
                    ,
                    4 == o.readyState ? o : (o.send(e),
                    o)
                }
            }
            ,
            e.load = function(t, n, r) {
                e.ajax(t, function(t) {
                    var i = e.parse(t.responseText);
                    r ? n.call(r, i) : n(i)
                })
            }
            ;
            var et = function(t) {
                var e = t.getBoundingClientRect()
                  , n = t.ownerDocument
                  , r = n.body
                  , i = n.documentElement
                  , o = i.clientTop || r.clientTop || 0
                  , s = i.clientLeft || r.clientLeft || 0
                  , a = e.top + (g.win.pageYOffset || i.scrollTop || r.scrollTop) - o
                  , u = e.left + (g.win.pageXOffset || i.scrollLeft || r.scrollLeft) - s;
                return {
                    y: a,
                    x: u
                }
            }
            ;
            return e.getElementByPoint = function(t, e) {
                var n = this
                  , r = (n.canvas,
                S.doc.elementFromPoint(t, e));
                if (S.win.opera && "svg" == r.tagName) {
                    var i = et(r)
                      , o = r.createSVGRect();
                    o.x = t - i.x,
                    o.y = e - i.y,
                    o.width = o.height = 1;
                    var s = r.getIntersectionList(o, null );
                    s.length && (r = s[s.length - 1])
                }
                return r ? x(r) : null
            }
            ,
            e.plugin = function(t) {
                t(e, v, w, S, y)
            }
            ,
            S.win.Snap = e,
            e
        }(window || this);
        i.plugin(function(t, e, n, i, o) {
            function s(e, n) {
                if (null == n) {
                    var r = !0;
                    if (n = "linearGradient" == e.type || "radialGradient" == e.type ? e.node.getAttribute("gradientTransform") : "pattern" == e.type ? e.node.getAttribute("patternTransform") : e.node.getAttribute("transform"),
                    !n)
                        return new t.Matrix;
                    n = t._.svgTransform2string(n)
                } else
                    n = t._.rgTransform.test(n) ? f(n).replace(/\.{3}|\u2026/g, e._.transform || E) : t._.svgTransform2string(n),
                    h(n, "array") && (n = t.path ? t.path.toString.call(n) : f(n)),
                    e._.transform = n;
                var i = t._.transform2matrix(n, e.getBBox(1));
                return r ? i : void (e.matrix = i)
            }
            function a(t) {
                function e(t, e) {
                    var n = d(t.node, e);
                    n = n && n.match(o),
                    n = n && n[2],
                    n && "#" == n.charAt() && (n = n.substring(1),
                    n && (a[n] = (a[n] || []).concat(function(n) {
                        var r = {};
                        r[e] = URL(n),
                        d(t.node, r)
                    })))
                }
                function n(t) {
                    var e = d(t.node, "xlink:href");
                    e && "#" == e.charAt() && (e = e.substring(1),
                    e && (a[e] = (a[e] || []).concat(function(e) {
                        t.attr("xlink:href", "#" + e)
                    })))
                }
                for (var r, i = t.selectAll("*"), o = /^\s*url\(("|'|)(.*)\1\)\s*$/, s = [], a = {}, u = 0, c = i.length; c > u; u++) {
                    r = i[u],
                    e(r, "fill"),
                    e(r, "stroke"),
                    e(r, "filter"),
                    e(r, "mask"),
                    e(r, "clip-path"),
                    n(r);
                    var l = d(r.node, "id");
                    l && (d(r.node, {
                        id: r.id
                    }),
                    s.push({
                        old: l,
                        id: r.id
                    }))
                }
                for (u = 0,
                c = s.length; c > u; u++) {
                    var h = a[s[u].old];
                    if (h)
                        for (var f = 0, p = h.length; p > f; f++)
                            h[f](s[u].id)
                }
            }
            function u(t, e, n) {
                return function(r) {
                    var i = r.slice(t, e);
                    return 1 == i.length && (i = i[0]),
                    n ? n(i) : i
                }
            }
            function c(t) {
                return function() {
                    var e = t ? "<" + this.type : ""
                      , n = this.node.attributes
                      , r = this.node.childNodes;
                    if (t)
                        for (var i = 0, o = n.length; o > i; i++)
                            e += " " + n[i].name + '="' + n[i].value.replace(/"/g, '\\"') + '"';
                    if (r.length) {
                        for (t && (e += ">"),
                        i = 0,
                        o = r.length; o > i; i++)
                            3 == r[i].nodeType ? e += r[i].nodeValue : 1 == r[i].nodeType && (e += y(r[i]).toString());
                        t && (e += "</" + this.type + ">")
                    } else
                        t && (e += "/>");
                    return e
                }
            }
            var l = e.prototype
              , h = t.is
              , f = String
              , p = t._unit2px
              , d = t._.$
              , m = t._.make
              , g = t._.getSomeDefs
              , v = "hasOwnProperty"
              , y = t._.wrap;
            l.getBBox = function(e) {
                if (!t.Matrix || !t.path)
                    return this.node.getBBox();
                var n = this
                  , r = new t.Matrix;
                if (n.removed)
                    return t._.box();
                for (; "use" == n.type; )
                    if (e || (r = r.add(n.transform().localMatrix.translate(n.attr("x") || 0, n.attr("y") || 0))),
                    n.original)
                        n = n.original;
                    else {
                        var i = n.attr("xlink:href");
                        n = n.original = n.node.ownerDocument.getElementById(i.substring(i.indexOf("#") + 1))
                    }
                var o = n._
                  , s = t.path.get[n.type] || t.path.get.deflt;
                try {
                    return e ? (o.bboxwt = s ? t.path.getBBox(n.realPath = s(n)) : t._.box(n.node.getBBox()),
                    t._.box(o.bboxwt)) : (n.realPath = s(n),
                    n.matrix = n.transform().localMatrix,
                    o.bbox = t.path.getBBox(t.path.map(n.realPath, r.add(n.matrix))),
                    t._.box(o.bbox))
                } catch (a) {
                    return t._.box()
                }
            }
            ;
            var b = function() {
                return this.string
            }
            ;
            l.transform = function(e) {
                var n = this._;
                if (null == e) {
                    for (var r, i = this, o = new t.Matrix(this.node.getCTM()), a = s(this), u = [a], c = new t.Matrix, l = a.toTransformString(), h = f(a) == f(this.matrix) ? f(n.transform) : l; "svg" != i.type && (i = i.parent()); )
                        u.push(s(i));
                    for (r = u.length; r--; )
                        c.add(u[r]);
                    return {
                        string: h,
                        globalMatrix: o,
                        totalMatrix: c,
                        localMatrix: a,
                        diffMatrix: o.clone().add(a.invert()),
                        global: o.toTransformString(),
                        total: c.toTransformString(),
                        local: l,
                        toString: b
                    }
                }
                return e instanceof t.Matrix ? (this.matrix = e,
                this._.transform = e.toTransformString()) : s(this, e),
                this.node && ("linearGradient" == this.type || "radialGradient" == this.type ? d(this.node, {
                    gradientTransform: this.matrix
                }) : "pattern" == this.type ? d(this.node, {
                    patternTransform: this.matrix
                }) : d(this.node, {
                    transform: this.matrix
                })),
                this
            }
            ,
            l.parent = function() {
                return y(this.node.parentNode)
            }
            ,
            l.append = l.add = function(t) {
                if (t) {
                    if ("set" == t.type) {
                        var e = this;
                        return t.forEach(function(t) {
                            e.add(t)
                        }),
                        this
                    }
                    t = y(t),
                    this.node.appendChild(t.node),
                    t.paper = this.paper
                }
                return this
            }
            ,
            l.appendTo = function(t) {
                return t && (t = y(t),
                t.append(this)),
                this
            }
            ,
            l.prepend = function(t) {
                if (t) {
                    if ("set" == t.type) {
                        var e, n = this;
                        return t.forEach(function(t) {
                            e ? e.after(t) : n.prepend(t),
                            e = t
                        }),
                        this
                    }
                    t = y(t);
                    var r = t.parent();
                    this.node.insertBefore(t.node, this.node.firstChild),
                    this.add && this.add(),
                    t.paper = this.paper,
                    this.parent() && this.parent().add(),
                    r && r.add()
                }
                return this
            }
            ,
            l.prependTo = function(t) {
                return t = y(t),
                t.prepend(this),
                this
            }
            ,
            l.before = function(t) {
                if ("set" == t.type) {
                    var e = this;
                    return t.forEach(function(t) {
                        var n = t.parent();
                        e.node.parentNode.insertBefore(t.node, e.node),
                        n && n.add()
                    }),
                    this.parent().add(),
                    this
                }
                t = y(t);
                var n = t.parent();
                return this.node.parentNode.insertBefore(t.node, this.node),
                this.parent() && this.parent().add(),
                n && n.add(),
                t.paper = this.paper,
                this
            }
            ,
            l.after = function(t) {
                t = y(t);
                var e = t.parent();
                return this.node.nextSibling ? this.node.parentNode.insertBefore(t.node, this.node.nextSibling) : this.node.parentNode.appendChild(t.node),
                this.parent() && this.parent().add(),
                e && e.add(),
                t.paper = this.paper,
                this
            }
            ,
            l.insertBefore = function(t) {
                t = y(t);
                var e = this.parent();
                return t.node.parentNode.insertBefore(this.node, t.node),
                this.paper = t.paper,
                e && e.add(),
                t.parent() && t.parent().add(),
                this
            }
            ,
            l.insertAfter = function(t) {
                t = y(t);
                var e = this.parent();
                return t.node.parentNode.insertBefore(this.node, t.node.nextSibling),
                this.paper = t.paper,
                e && e.add(),
                t.parent() && t.parent().add(),
                this
            }
            ,
            l.remove = function() {
                var t = this.parent();
                return this.node.parentNode && this.node.parentNode.removeChild(this.node),
                delete this.paper,
                this.removed = !0,
                t && t.add(),
                this
            }
            ,
            l.select = function(t) {
                return t = f(t).replace(/([^\\]):/g, "$1\\:"),
                y(this.node.querySelector(t))
            }
            ,
            l.selectAll = function(e) {
                for (var n = this.node.querySelectorAll(e), r = (t.set || Array)(), i = 0; i < n.length; i++)
                    r.push(y(n[i]));
                return r
            }
            ,
            l.asPX = function(t, e) {
                return null == e && (e = this.attr(t)),
                +p(this, t, e)
            }
            ,
            l.use = function() {
                var t, e = this.node.id;
                return e || (e = this.id,
                d(this.node, {
                    id: e
                })),
                t = "linearGradient" == this.type || "radialGradient" == this.type || "pattern" == this.type ? m(this.type, this.node.parentNode) : m("use", this.node.parentNode),
                d(t.node, {
                    "xlink:href": "#" + e
                }),
                t.original = this,
                t
            }
            ,
            l.clone = function() {
                var t = y(this.node.cloneNode(!0));
                return d(t.node, "id") && d(t.node, {
                    id: t.id
                }),
                a(t),
                t.insertAfter(this),
                t
            }
            ,
            l.toDefs = function() {
                var t = g(this);
                return t.appendChild(this.node),
                this
            }
            ,
            l.pattern = l.toPattern = function(t, e, n, r) {
                var i = m("pattern", g(this));
                return null == t && (t = this.getBBox()),
                h(t, "object") && "x"in t && (e = t.y,
                n = t.width,
                r = t.height,
                t = t.x),
                d(i.node, {
                    x: t,
                    y: e,
                    width: n,
                    height: r,
                    patternUnits: "userSpaceOnUse",
                    id: i.id,
                    viewBox: [t, e, n, r].join(" ")
                }),
                i.node.appendChild(this.node),
                i
            }
            ,
            l.marker = function(t, e, n, r, i, o) {
                var s = m("marker", g(this));
                return null == t && (t = this.getBBox()),
                h(t, "object") && "x"in t && (e = t.y,
                n = t.width,
                r = t.height,
                i = t.refX || t.cx,
                o = t.refY || t.cy,
                t = t.x),
                d(s.node, {
                    viewBox: [t, e, n, r].join(" "),
                    markerWidth: n,
                    markerHeight: r,
                    orient: "auto",
                    refX: i || 0,
                    refY: o || 0,
                    id: s.id
                }),
                s.node.appendChild(this.node),
                s
            }
            ;
            var w = function(t, e, n, i) {
                "function" != typeof n || n.length || (i = n,
                n = r.linear),
                this.attr = t,
                this.dur = e,
                n && (this.easing = n),
                i && (this.callback = i)
            }
            ;
            t._.Animation = w,
            t.animation = function(t, e, n, r) {
                return new w(t,e,n,r)
            }
            ,
            l.inAnim = function() {
                var t = this
                  , e = [];
                for (var n in t.anims)
                    t.anims[v](n) && !function(t) {
                        e.push({
                            anim: new w(t._attrs,t.dur,t.easing,t._callback),
                            mina: t,
                            curStatus: t.status(),
                            status: function(e) {
                                return t.status(e)
                            },
                            stop: function() {
                                t.stop()
                            }
                        })
                    }(t.anims[n]);
                return e
            }
            ,
            t.animate = function(t, e, n, i, o, s) {
                "function" != typeof o || o.length || (s = o,
                o = r.linear);
                var a = r.time()
                  , u = r(t, e, a, a + i, r.time, n, o);
                return s && eve.once("mina.finish." + u.id, s),
                u
            }
            ,
            l.stop = function() {
                for (var t = this.inAnim(), e = 0, n = t.length; n > e; e++)
                    t[e].stop();
                return this
            }
            ,
            l.animate = function(t, e, n, i) {
                "function" != typeof n || n.length || (i = n,
                n = r.linear),
                t instanceof w && (i = t.callback,
                n = t.easing,
                e = n.dur,
                t = t.attr);
                var o, s, a, c, l = [], p = [], d = {}, m = this;
                for (var g in t)
                    if (t[v](g)) {
                        m.equal ? (c = m.equal(g, f(t[g])),
                        o = c.from,
                        s = c.to,
                        a = c.f) : (o = +m.attr(g),
                        s = +t[g]);
                        var y = h(o, "array") ? o.length : 1;
                        d[g] = u(l.length, l.length + y, a),
                        l = l.concat(o),
                        p = p.concat(s)
                    }
                var b = r.time()
                  , x = r(l, p, b, b + e, r.time, function(t) {
                    var e = {};
                    for (var n in d)
                        d[v](n) && (e[n] = d[n](t));
                    m.attr(e)
                }, n);
                return m.anims[x.id] = x,
                x._attrs = t,
                x._callback = i,
                eve("snap.animcreated." + m.id, x),
                eve.once("mina.finish." + x.id, function() {
                    delete m.anims[x.id],
                    i && i.call(m)
                }),
                eve.once("mina.stop." + x.id, function() {
                    delete m.anims[x.id]
                }),
                m
            }
            ;
            var x = {};
            l.data = function(e, n) {
                var r = x[this.id] = x[this.id] || {};
                if (0 == arguments.length)
                    return eve("snap.data.get." + this.id, this, r, null ),
                    r;
                if (1 == arguments.length) {
                    if (t.is(e, "object")) {
                        for (var i in e)
                            e[v](i) && this.data(i, e[i]);
                        return this
                    }
                    return eve("snap.data.get." + this.id, this, r[e], e),
                    r[e]
                }
                return r[e] = n,
                eve("snap.data.set." + this.id, this, n, e),
                this
            }
            ,
            l.removeData = function(t) {
                return null == t ? x[this.id] = {} : x[this.id] && delete x[this.id][t],
                this
            }
            ,
            l.outerSVG = l.toString = c(1),
            l.innerSVG = c(),
            l.toDataURL = function() {
                if (window && window.btoa) {
                    var e = this.getBBox()
                      , n = t.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                        x: +e.x.toFixed(3),
                        y: +e.y.toFixed(3),
                        width: +e.width.toFixed(3),
                        height: +e.height.toFixed(3),
                        contents: this.outerSVG()
                    });
                    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
                }
            }
            ,
            o.prototype.select = l.select,
            o.prototype.selectAll = l.selectAll
        }),
        i.plugin(function(t, e, n, r, i) {
            function o(t, e, n, r, i, o) {
                return null == e && "[object SVGMatrix]" == s.call(t) ? (this.a = t.a,
                this.b = t.b,
                this.c = t.c,
                this.d = t.d,
                this.e = t.e,
                void (this.f = t.f)) : void (null != t ? (this.a = +t,
                this.b = +e,
                this.c = +n,
                this.d = +r,
                this.e = +i,
                this.f = +o) : (this.a = 1,
                this.b = 0,
                this.c = 0,
                this.d = 1,
                this.e = 0,
                this.f = 0))
            }
            var s = Object.prototype.toString
              , a = String
              , u = Math
              , c = "";
            !function(e) {
                function n(t) {
                    return t[0] * t[0] + t[1] * t[1]
                }
                function r(t) {
                    var e = u.sqrt(n(t));
                    t[0] && (t[0] /= e),
                    t[1] && (t[1] /= e)
                }
                e.add = function(t, e, n, r, i, s) {
                    var a, u, c, l, h = [[], [], []], f = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], p = [[t, n, i], [e, r, s], [0, 0, 1]];
                    for (t && t instanceof o && (p = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]),
                    a = 0; 3 > a; a++)
                        for (u = 0; 3 > u; u++) {
                            for (l = 0,
                            c = 0; 3 > c; c++)
                                l += f[a][c] * p[c][u];
                            h[a][u] = l
                        }
                    return this.a = h[0][0],
                    this.b = h[1][0],
                    this.c = h[0][1],
                    this.d = h[1][1],
                    this.e = h[0][2],
                    this.f = h[1][2],
                    this
                }
                ,
                e.invert = function() {
                    var t = this
                      , e = t.a * t.d - t.b * t.c;
                    return new o(t.d / e,-t.b / e,-t.c / e,t.a / e,(t.c * t.f - t.d * t.e) / e,(t.b * t.e - t.a * t.f) / e)
                }
                ,
                e.clone = function() {
                    return new o(this.a,this.b,this.c,this.d,this.e,this.f)
                }
                ,
                e.translate = function(t, e) {
                    return this.add(1, 0, 0, 1, t, e)
                }
                ,
                e.scale = function(t, e, n, r) {
                    return null == e && (e = t),
                    (n || r) && this.add(1, 0, 0, 1, n, r),
                    this.add(t, 0, 0, e, 0, 0),
                    (n || r) && this.add(1, 0, 0, 1, -n, -r),
                    this
                }
                ,
                e.rotate = function(e, n, r) {
                    e = t.rad(e),
                    n = n || 0,
                    r = r || 0;
                    var i = +u.cos(e).toFixed(9)
                      , o = +u.sin(e).toFixed(9);
                    return this.add(i, o, -o, i, n, r),
                    this.add(1, 0, 0, 1, -n, -r)
                }
                ,
                e.x = function(t, e) {
                    return t * this.a + e * this.c + this.e
                }
                ,
                e.y = function(t, e) {
                    return t * this.b + e * this.d + this.f
                }
                ,
                e.get = function(t) {
                    return +this[a.fromCharCode(97 + t)].toFixed(4)
                }
                ,
                e.toString = function() {
                    return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
                }
                ,
                e.offset = function() {
                    return [this.e.toFixed(4), this.f.toFixed(4)]
                }
                ,
                e.determinant = function() {
                    return this.a * this.d - this.b * this.c
                }
                ,
                e.split = function() {
                    var e = {};
                    e.dx = this.e,
                    e.dy = this.f;
                    var i = [[this.a, this.c], [this.b, this.d]];
                    e.scalex = u.sqrt(n(i[0])),
                    r(i[0]),
                    e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1],
                    i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear],
                    e.scaley = u.sqrt(n(i[1])),
                    r(i[1]),
                    e.shear /= e.scaley,
                    this.determinant() < 0 && (e.scalex = -e.scalex);
                    var o = -i[0][1]
                      , s = i[1][1];
                    return 0 > s ? (e.rotate = t.deg(u.acos(s)),
                    0 > o && (e.rotate = 360 - e.rotate)) : e.rotate = t.deg(u.asin(o)),
                    e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate),
                    e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate,
                    e.noRotation = !+e.shear.toFixed(9) && !e.rotate,
                    e
                }
                ,
                e.toTransformString = function(t) {
                    var e = t || this.split();
                    return +e.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (e.scalex = +e.scalex.toFixed(4),
                    e.scaley = +e.scaley.toFixed(4),
                    e.rotate = +e.rotate.toFixed(4),
                    (e.dx || e.dy ? "t" + [+e.dx.toFixed(4), +e.dy.toFixed(4)] : c) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : c) + (e.rotate ? "r" + [+e.rotate.toFixed(4), 0, 0] : c))
                }
            }(o.prototype),
            t.Matrix = o,
            t.matrix = function(t, e, n, r, i, s) {
                return new o(t,e,n,r,i,s)
            }
        }),
        i.plugin(function(t, e, n, r, i) {
            function o(n) {
                return function(r) {
                    if (eve.stop(),
                    r instanceof i && 1 == r.node.childNodes.length && ("radialGradient" == r.node.firstChild.tagName || "linearGradient" == r.node.firstChild.tagName || "pattern" == r.node.firstChild.tagName) && (r = r.node.firstChild,
                    f(this).appendChild(r),
                    r = l(r)),
                    r instanceof e)
                        if ("radialGradient" == r.type || "linearGradient" == r.type || "pattern" == r.type) {
                            r.node.id || d(r.node, {
                                id: r.id
                            });
                            var o = m(r.node.id)
                        } else
                            o = r.attr(n);
                    else if (o = t.color(r),
                    o.error) {
                        var s = t(f(this).ownerSVGElement).gradient(r);
                        s ? (s.node.id || d(s.node, {
                            id: s.id
                        }),
                        o = m(s.node.id)) : o = r
                    } else
                        o = g(o);
                    var a = {};
                    a[n] = o,
                    d(this.node, a),
                    this.node.style[n] = y
                }
            }
            function s(t) {
                eve.stop(),
                t == +t && (t += "px"),
                this.node.style.fontSize = t
            }
            function a(t) {
                for (var e = [], n = t.childNodes, r = 0, i = n.length; i > r; r++) {
                    var o = n[r];
                    3 == o.nodeType && e.push(o.nodeValue),
                    "tspan" == o.tagName && (1 == o.childNodes.length && 3 == o.firstChild.nodeType ? e.push(o.firstChild.nodeValue) : e.push(a(o)))
                }
                return e
            }
            function u() {
                return eve.stop(),
                this.node.style.fontSize
            }
            var c = t._.make
              , l = t._.wrap
              , h = t.is
              , f = t._.getSomeDefs
              , p = /^url\(#?([^)]+)\)$/
              , d = t._.$
              , m = t.url
              , g = String
              , v = t._.separator
              , y = "";
            eve.on("snap.util.attr.mask", function(t) {
                if (t instanceof e || t instanceof i) {
                    if (eve.stop(),
                    t instanceof i && 1 == t.node.childNodes.length && (t = t.node.firstChild,
                    f(this).appendChild(t),
                    t = l(t)),
                    "mask" == t.type)
                        var n = t;
                    else
                        n = c("mask", f(this)),
                        n.node.appendChild(t.node);
                    !n.node.id && d(n.node, {
                        id: n.id
                    }),
                    d(this.node, {
                        mask: m(n.id)
                    })
                }
            }),
            function(t) {
                eve.on("snap.util.attr.clip", t),
                eve.on("snap.util.attr.clip-path", t),
                eve.on("snap.util.attr.clipPath", t)
            }(function(t) {
                if (t instanceof e || t instanceof i) {
                    if (eve.stop(),
                    "clipPath" == t.type)
                        var n = t;
                    else
                        n = c("clipPath", f(this)),
                        n.node.appendChild(t.node),
                        !n.node.id && d(n.node, {
                            id: n.id
                        });
                    d(this.node, {
                        "clip-path": m(n.node.id || n.id)
                    })
                }
            }),
            eve.on("snap.util.attr.fill", o("fill")),
            eve.on("snap.util.attr.stroke", o("stroke"));
            var b = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
            eve.on("snap.util.grad.parse", function(t) {
                t = g(t);
                var e = t.match(b);
                if (!e)
                    return null ;
                var n = e[1]
                  , r = e[2]
                  , i = e[3];
                return r = r.split(/\s*,\s*/).map(function(t) {
                    return +t == t ? +t : t
                }),
                1 == r.length && 0 == r[0] && (r = []),
                i = i.split("-"),
                i = i.map(function(t) {
                    t = t.split(":");
                    var e = {
                        color: t[0]
                    };
                    return t[1] && (e.offset = parseFloat(t[1])),
                    e
                }),
                {
                    type: n,
                    params: r,
                    stops: i
                }
            }),
            eve.on("snap.util.attr.d", function(e) {
                eve.stop(),
                h(e, "array") && h(e[0], "array") && (e = t.path.toString.call(e)),
                e = g(e),
                e.match(/[ruo]/i) && (e = t.path.toAbsolute(e)),
                d(this.node, {
                    d: e
                })
            })(-1),
            eve.on("snap.util.attr.#text", function(t) {
                eve.stop(),
                t = g(t);
                for (var e = r.doc.createTextNode(t); this.node.firstChild; )
                    this.node.removeChild(this.node.firstChild);
                this.node.appendChild(e)
            })(-1),
            eve.on("snap.util.attr.path", function(t) {
                eve.stop(),
                this.attr({
                    d: t
                })
            })(-1),
            eve.on("snap.util.attr.class", function(t) {
                eve.stop(),
                this.node.className.baseVal = t
            })(-1),
            eve.on("snap.util.attr.viewBox", function(t) {
                var e;
                e = h(t, "object") && "x"in t ? [t.x, t.y, t.width, t.height].join(" ") : h(t, "array") ? t.join(" ") : t,
                d(this.node, {
                    viewBox: e
                }),
                eve.stop()
            })(-1),
            eve.on("snap.util.attr.transform", function(t) {
                this.transform(t),
                eve.stop()
            })(-1),
            eve.on("snap.util.attr.r", function(t) {
                "rect" == this.type && (eve.stop(),
                d(this.node, {
                    rx: t,
                    ry: t
                }))
            })(-1),
            eve.on("snap.util.attr.textpath", function(t) {
                if (eve.stop(),
                "text" == this.type) {
                    var n, r, i;
                    if (!t && this.textPath) {
                        for (r = this.textPath; r.node.firstChild; )
                            this.node.appendChild(r.node.firstChild);
                        return r.remove(),
                        void delete this.textPath
                    }
                    if (h(t, "string")) {
                        var o = f(this)
                          , s = l(o.parentNode).path(t);
                        o.appendChild(s.node),
                        n = s.id,
                        s.attr({
                            id: n
                        })
                    } else
                        t = l(t),
                        t instanceof e && (n = t.attr("id"),
                        n || (n = t.id,
                        t.attr({
                            id: n
                        })));
                    if (n)
                        if (r = this.textPath,
                        i = this.node,
                        r)
                            r.attr({
                                "xlink:href": "#" + n
                            });
                        else {
                            for (r = d("textPath", {
                                "xlink:href": "#" + n
                            }); i.firstChild; )
                                r.appendChild(i.firstChild);
                            i.appendChild(r),
                            this.textPath = l(r)
                        }
                }
            })(-1),
            eve.on("snap.util.attr.text", function(t) {
                if ("text" == this.type) {
                    for (var e = this.node, n = function(t) {
                        var e = d("tspan");
                        if (h(t, "array"))
                            for (var i = 0; i < t.length; i++)
                                e.appendChild(n(t[i]));
                        else
                            e.appendChild(r.doc.createTextNode(t));
                        return e.normalize && e.normalize(),
                        e
                    }
                    ; e.firstChild; )
                        e.removeChild(e.firstChild);
                    for (var i = n(t); i.firstChild; )
                        e.appendChild(i.firstChild)
                }
                eve.stop()
            })(-1),
            eve.on("snap.util.attr.fontSize", s)(-1),
            eve.on("snap.util.attr.font-size", s)(-1),
            eve.on("snap.util.getattr.transform", function() {
                return eve.stop(),
                this.transform()
            })(-1),
            eve.on("snap.util.getattr.textpath", function() {
                return eve.stop(),
                this.textPath
            })(-1),
            function() {
                function e(e) {
                    return function() {
                        eve.stop();
                        var n = r.doc.defaultView.getComputedStyle(this.node, null ).getPropertyValue("marker-" + e);
                        return "none" == n ? n : t(r.doc.getElementById(n.match(p)[1]))
                    }
                }
                function n(t) {
                    return function(e) {
                        eve.stop();
                        var n = "marker" + t.charAt(0).toUpperCase() + t.substring(1);
                        if ("" == e || !e)
                            return void (this.node.style[n] = "none");
                        if ("marker" == e.type) {
                            var r = e.node.id;
                            return r || d(e.node, {
                                id: e.id
                            }),
                            void (this.node.style[n] = m(r))
                        }
                    }
                }
                eve.on("snap.util.getattr.marker-end", e("end"))(-1),
                eve.on("snap.util.getattr.markerEnd", e("end"))(-1),
                eve.on("snap.util.getattr.marker-start", e("start"))(-1),
                eve.on("snap.util.getattr.markerStart", e("start"))(-1),
                eve.on("snap.util.getattr.marker-mid", e("mid"))(-1),
                eve.on("snap.util.getattr.markerMid", e("mid"))(-1),
                eve.on("snap.util.attr.marker-end", n("end"))(-1),
                eve.on("snap.util.attr.markerEnd", n("end"))(-1),
                eve.on("snap.util.attr.marker-start", n("start"))(-1),
                eve.on("snap.util.attr.markerStart", n("start"))(-1),
                eve.on("snap.util.attr.marker-mid", n("mid"))(-1),
                eve.on("snap.util.attr.markerMid", n("mid"))(-1)
            }(),
            eve.on("snap.util.getattr.r", function() {
                return "rect" == this.type && d(this.node, "rx") == d(this.node, "ry") ? (eve.stop(),
                d(this.node, "rx")) : void 0
            })(-1),
            eve.on("snap.util.getattr.text", function() {
                if ("text" == this.type || "tspan" == this.type) {
                    eve.stop();
                    var t = a(this.node);
                    return 1 == t.length ? t[0] : t
                }
            })(-1),
            eve.on("snap.util.getattr.#text", function() {
                return this.node.textContent
            })(-1),
            eve.on("snap.util.getattr.viewBox", function() {
                eve.stop();
                var e = d(this.node, "viewBox");
                return e ? (e = e.split(v),
                t._.box(+e[0], +e[1], +e[2], +e[3])) : void 0
            })(-1),
            eve.on("snap.util.getattr.points", function() {
                var t = d(this.node, "points");
                return eve.stop(),
                t ? t.split(v) : void 0
            })(-1),
            eve.on("snap.util.getattr.path", function() {
                var t = d(this.node, "d");
                return eve.stop(),
                t
            })(-1),
            eve.on("snap.util.getattr.class", function() {
                return this.node.className.baseVal
            })(-1),
            eve.on("snap.util.getattr.fontSize", u)(-1),
            eve.on("snap.util.getattr.font-size", u)(-1)
        }),
        i.plugin(function(t, e, n, r, i) {
            var o = /\S+/g
              , s = String
              , a = e.prototype;
            a.addClass = function(t) {
                var e, n, r, i, a = s(t || "").match(o) || [], u = this.node, c = u.className.baseVal, l = c.match(o) || [];
                if (a.length) {
                    for (e = 0; r = a[e++]; )
                        n = l.indexOf(r),
                        ~n || l.push(r);
                    i = l.join(" "),
                    c != i && (u.className.baseVal = i)
                }
                return this
            }
            ,
            a.removeClass = function(t) {
                var e, n, r, i, a = s(t || "").match(o) || [], u = this.node, c = u.className.baseVal, l = c.match(o) || [];
                if (l.length) {
                    for (e = 0; r = a[e++]; )
                        n = l.indexOf(r),
                        ~n && l.splice(n, 1);
                    i = l.join(" "),
                    c != i && (u.className.baseVal = i)
                }
                return this
            }
            ,
            a.hasClass = function(t) {
                var e = this.node
                  , n = e.className.baseVal
                  , r = n.match(o) || [];
                return !!~r.indexOf(t)
            }
            ,
            a.toggleClass = function(t, e) {
                if (null != e)
                    return e ? this.addClass(t) : this.removeClass(t);
                var n, r, i, s, a = (t || "").match(o) || [], u = this.node, c = u.className.baseVal, l = c.match(o) || [];
                for (n = 0; i = a[n++]; )
                    r = l.indexOf(i),
                    ~r ? l.splice(r, 1) : l.push(i);
                return s = l.join(" "),
                c != s && (u.className.baseVal = s),
                this
            }
        }),
        i.plugin(function(t, e, n, r, i) {
            function o(t) {
                return t
            }
            function s(t) {
                return function(e) {
                    return +e.toFixed(3) + t
                }
            }
            var a = {
                "+": function(t, e) {
                    return t + e
                },
                "-": function(t, e) {
                    return t - e
                },
                "/": function(t, e) {
                    return t / e
                },
                "*": function(t, e) {
                    return t * e
                }
            }
              , u = String
              , c = /[a-z]+$/i
              , l = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
            eve.on("snap.util.attr", function(t) {
                var e = u(t).match(l);
                if (e) {
                    var n = eve.nt()
                      , r = n.substring(n.lastIndexOf(".") + 1)
                      , i = this.attr(r)
                      , o = {};
                    eve.stop();
                    var s = e[3] || ""
                      , h = i.match(c)
                      , f = a[e[1]];
                    if (h && h == s ? t = f(parseFloat(i), +e[2]) : (i = this.asPX(r),
                    t = f(this.asPX(r), this.asPX(r, e[2] + s))),
                    isNaN(i) || isNaN(t))
                        return;
                    o[r] = t,
                    this.attr(o)
                }
            })(-10),
            eve.on("snap.util.equal", function(t, e) {
                var n = u(this.attr(t) || "")
                  , r = u(e).match(l);
                if (r) {
                    eve.stop();
                    var i = r[3] || ""
                      , h = n.match(c)
                      , f = a[r[1]];
                    return h && h == i ? {
                        from: parseFloat(n),
                        to: f(parseFloat(n), +r[2]),
                        f: s(h)
                    } : (n = this.asPX(t),
                    {
                        from: n,
                        to: f(n, this.asPX(t, r[2] + i)),
                        f: o
                    })
                }
            })(-10)
        }),
        i.plugin(function(t, e, n, r, i) {
            var o = n.prototype
              , s = t.is;
            o.rect = function(t, e, n, r, i, o) {
                var a;
                return null == o && (o = i),
                s(t, "object") && "[object Object]" == t ? a = t : null != t && (a = {
                    x: t,
                    y: e,
                    width: n,
                    height: r
                },
                null != i && (a.rx = i,
                a.ry = o)),
                this.el("rect", a)
            }
            ,
            o.circle = function(t, e, n) {
                var r;
                return s(t, "object") && "[object Object]" == t ? r = t : null != t && (r = {
                    cx: t,
                    cy: e,
                    r: n
                }),
                this.el("circle", r)
            }
            ;
            var a = function() {
                function t() {
                    this.parentNode.removeChild(this)
                }
                return function(e, n) {
                    var i = r.doc.createElement("img")
                      , o = r.doc.body;
                    i.style.cssText = "position:absolute;left:-9999em;top:-9999em",
                    i.onload = function() {
                        n.call(i),
                        i.onload = i.onerror = null ,
                        o.removeChild(i)
                    }
                    ,
                    i.onerror = t,
                    o.appendChild(i),
                    i.src = e
                }
            }();
            o.image = function(e, n, r, i, o) {
                var u = this.el("image");
                if (s(e, "object") && "src"in e)
                    u.attr(e);
                else if (null != e) {
                    var c = {
                        "xlink:href": e,
                        preserveAspectRatio: "none"
                    };
                    null != n && null != r && (c.x = n,
                    c.y = r),
                    null != i && null != o ? (c.width = i,
                    c.height = o) : a(e, function() {
                        t._.$(u.node, {
                            width: this.offsetWidth,
                            height: this.offsetHeight
                        })
                    }),
                    t._.$(u.node, c)
                }
                return u
            }
            ,
            o.ellipse = function(t, e, n, r) {
                var i;
                return s(t, "object") && "[object Object]" == t ? i = t : null != t && (i = {
                    cx: t,
                    cy: e,
                    rx: n,
                    ry: r
                }),
                this.el("ellipse", i)
            }
            ,
            o.path = function(t) {
                var e;
                return s(t, "object") && !s(t, "array") ? e = t : t && (e = {
                    d: t
                }),
                this.el("path", e)
            }
            ,
            o.group = o.g = function(t) {
                var e = this.el("g");
                return 1 == arguments.length && t && !t.type ? e.attr(t) : arguments.length && e.add(Array.prototype.slice.call(arguments, 0)),
                e
            }
            ,
            o.svg = function(t, e, n, r, i, o, a, u) {
                var c = {};
                return s(t, "object") && null == e ? c = t : (null != t && (c.x = t),
                null != e && (c.y = e),
                null != n && (c.width = n),
                null != r && (c.height = r),
                null != i && null != o && null != a && null != u && (c.viewBox = [i, o, a, u])),
                this.el("svg", c)
            }
            ,
            o.mask = function(t) {
                var e = this.el("mask");
                return 1 == arguments.length && t && !t.type ? e.attr(t) : arguments.length && e.add(Array.prototype.slice.call(arguments, 0)),
                e
            }
            ,
            o.ptrn = function(t, e, n, r, i, o, a, u) {
                if (s(t, "object"))
                    var c = t;
                else
                    c = {
                        patternUnits: "userSpaceOnUse"
                    },
                    t && (c.x = t),
                    e && (c.y = e),
                    null != n && (c.width = n),
                    null != r && (c.height = r),
                    null != i && null != o && null != a && null != u ? c.viewBox = [i, o, a, u] : c.viewBox = [t || 0, e || 0, n || 0, r || 0];
                return this.el("pattern", c)
            }
            ,
            o.use = function(n) {
                return null != n ? (n instanceof e && (n.attr("id") || n.attr({
                    id: t._.id(n)
                }),
                n = n.attr("id")),
                "#" == String(n).charAt() && (n = n.substring(1)),
                this.el("use", {
                    "xlink:href": "#" + n
                })) : e.prototype.use.call(this)
            }
            ,
            o.symbol = function(t, e, n, r) {
                var i = {};
                return null != t && null != e && null != n && null != r && (i.viewBox = [t, e, n, r]),
                this.el("symbol", i)
            }
            ,
            o.text = function(t, e, n) {
                var r = {};
                return s(t, "object") ? r = t : null != t && (r = {
                    x: t,
                    y: e,
                    text: n || ""
                }),
                this.el("text", r)
            }
            ,
            o.line = function(t, e, n, r) {
                var i = {};
                return s(t, "object") ? i = t : null != t && (i = {
                    x1: t,
                    x2: n,
                    y1: e,
                    y2: r
                }),
                this.el("line", i)
            }
            ,
            o.polyline = function(t) {
                arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                var e = {};
                return s(t, "object") && !s(t, "array") ? e = t : null != t && (e = {
                    points: t
                }),
                this.el("polyline", e)
            }
            ,
            o.polygon = function(t) {
                arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0));
                var e = {};
                return s(t, "object") && !s(t, "array") ? e = t : null != t && (e = {
                    points: t
                }),
                this.el("polygon", e)
            }
            ,
            function() {
                function e() {
                    return this.selectAll("stop")
                }
                function n(e, n) {
                    var r = u("stop")
                      , i = {
                        offset: +n + "%"
                    };
                    return e = t.color(e),
                    i["stop-color"] = e.hex,
                    e.opacity < 1 && (i["stop-opacity"] = e.opacity),
                    u(r, i),
                    this.node.appendChild(r),
                    this
                }
                function r() {
                    if ("linearGradient" == this.type) {
                        var e = u(this.node, "x1") || 0
                          , n = u(this.node, "x2") || 1
                          , r = u(this.node, "y1") || 0
                          , i = u(this.node, "y2") || 0;
                        return t._.box(e, r, math.abs(n - e), math.abs(i - r))
                    }
                    var o = this.node.cx || .5
                      , s = this.node.cy || .5
                      , a = this.node.r || 0;
                    return t._.box(o - a, s - a, 2 * a, 2 * a)
                }
                function i(t, e) {
                    function n(t, e) {
                        for (var n = (e - l) / (t - h), r = h; t > r; r++)
                            o[r].offset = +(+l + n * (r - h)).toFixed(2);
                        h = t,
                        l = e
                    }
                    var r, i = eve("snap.util.grad.parse", null , e).firstDefined();
                    if (!i)
                        return null ;
                    i.params.unshift(t),
                    r = "l" == i.type.toLowerCase() ? s.apply(0, i.params) : a.apply(0, i.params),
                    i.type != i.type.toLowerCase() && u(r.node, {
                        gradientUnits: "userSpaceOnUse"
                    });
                    var o = i.stops
                      , c = o.length
                      , l = 0
                      , h = 0;
                    c--;
                    for (var f = 0; c > f; f++)
                        "offset"in o[f] && n(f, o[f].offset);
                    for (o[c].offset = o[c].offset || 100,
                    n(c, o[c].offset),
                    f = 0; c >= f; f++) {
                        var p = o[f];
                        r.addStop(p.color, p.offset)
                    }
                    return r
                }
                function s(i, o, s, a, c) {
                    var l = t._.make("linearGradient", i);
                    return l.stops = e,
                    l.addStop = n,
                    l.getBBox = r,
                    null != o && u(l.node, {
                        x1: o,
                        y1: s,
                        x2: a,
                        y2: c
                    }),
                    l
                }
                function a(i, o, s, a, c, l) {
                    var h = t._.make("radialGradient", i);
                    return h.stops = e,
                    h.addStop = n,
                    h.getBBox = r,
                    null != o && u(h.node, {
                        cx: o,
                        cy: s,
                        r: a
                    }),
                    null != c && null != l && u(h.node, {
                        fx: c,
                        fy: l
                    }),
                    h
                }
                var u = t._.$;
                o.gradient = function(t) {
                    return i(this.defs, t)
                }
                ,
                o.gradientLinear = function(t, e, n, r) {
                    return s(this.defs, t, e, n, r)
                }
                ,
                o.gradientRadial = function(t, e, n, r, i) {
                    return a(this.defs, t, e, n, r, i)
                }
                ,
                o.toString = function() {
                    var e, n = this.node.ownerDocument, r = n.createDocumentFragment(), i = n.createElement("div"), o = this.node.cloneNode(!0);
                    return r.appendChild(i),
                    i.appendChild(o),
                    t._.$(o, {
                        xmlns: "http://www.w3.org/2000/svg"
                    }),
                    e = i.innerHTML,
                    r.removeChild(r.firstChild),
                    e
                }
                ,
                o.toDataURL = function() {
                    return window && window.btoa ? "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this))) : void 0
                }
                ,
                o.clear = function() {
                    for (var t, e = this.node.firstChild; e; )
                        t = e.nextSibling,
                        "defs" != e.tagName ? e.parentNode.removeChild(e) : o.clear.call({
                            node: e
                        }),
                        e = t
                }
            }()
        }),
        i.plugin(function(t, e, n, r) {
            function i(t) {
                var e = i.ps = i.ps || {};
                return e[t] ? e[t].sleep = 100 : e[t] = {
                    sleep: 100
                },
                setTimeout(function() {
                    for (var n in e)
                        e[M](n) && n != t && (e[n].sleep--,
                        !e[n].sleep && delete e[n])
                }),
                e[t]
            }
            function o(t, e, n, r) {
                return null == t && (t = e = n = r = 0),
                null == e && (e = t.y,
                n = t.width,
                r = t.height,
                t = t.x),
                {
                    x: t,
                    y: e,
                    width: n,
                    w: n,
                    height: r,
                    h: r,
                    x2: t + n,
                    y2: e + r,
                    cx: t + n / 2,
                    cy: e + r / 2,
                    r1: D.min(n, r) / 2,
                    r2: D.max(n, r) / 2,
                    r0: D.sqrt(n * n + r * r) / 2,
                    path: L(t, e, n, r),
                    vb: [t, e, n, r].join(" ")
                }
            }
            function s() {
                return this.join(",").replace(V, "$1")
            }
            function a(t) {
                var e = P(t);
                return e.toString = s,
                e
            }
            function u(t, e, n, r, i, o, s, a, u) {
                return null == u ? m(t, e, n, r, i, o, s, a) : l(t, e, n, r, i, o, s, a, g(t, e, n, r, i, o, s, a, u))
            }
            function c(n, r) {
                function i(t) {
                    return +(+t).toFixed(3)
                }
                return t._.cacher(function(t, o, s) {
                    t instanceof e && (t = t.attr("d")),
                    t = I(t);
                    for (var a, c, h, f, p, d = "", m = {}, g = 0, v = 0, y = t.length; y > v; v++) {
                        if (h = t[v],
                        "M" == h[0])
                            a = +h[1],
                            c = +h[2];
                        else {
                            if (f = u(a, c, h[1], h[2], h[3], h[4], h[5], h[6]),
                            g + f > o) {
                                if (r && !m.start) {
                                    if (p = u(a, c, h[1], h[2], h[3], h[4], h[5], h[6], o - g),
                                    d += ["C" + i(p.start.x), i(p.start.y), i(p.m.x), i(p.m.y), i(p.x), i(p.y)],
                                    s)
                                        return d;
                                    m.start = d,
                                    d = ["M" + i(p.x), i(p.y) + "C" + i(p.n.x), i(p.n.y), i(p.end.x), i(p.end.y), i(h[5]), i(h[6])].join(),
                                    g += f,
                                    a = +h[5],
                                    c = +h[6];
                                    continue
                                }
                                if (!n && !r)
                                    return p = u(a, c, h[1], h[2], h[3], h[4], h[5], h[6], o - g)
                            }
                            g += f,
                            a = +h[5],
                            c = +h[6]
                        }
                        d += h.shift() + h
                    }
                    return m.end = d,
                    p = n ? g : r ? m : l(a, c, h[0], h[1], h[2], h[3], h[4], h[5], 1)
                }, null , t._.clone)
            }
            function l(t, e, n, r, i, o, s, a, u) {
                var c = 1 - u
                  , l = H(c, 3)
                  , h = H(c, 2)
                  , f = u * u
                  , p = f * u
                  , d = l * t + 3 * h * u * n + 3 * c * u * u * i + p * s
                  , m = l * e + 3 * h * u * r + 3 * c * u * u * o + p * a
                  , g = t + 2 * u * (n - t) + f * (i - 2 * n + t)
                  , v = e + 2 * u * (r - e) + f * (o - 2 * r + e)
                  , y = n + 2 * u * (i - n) + f * (s - 2 * i + n)
                  , b = r + 2 * u * (o - r) + f * (a - 2 * o + r)
                  , w = c * t + u * n
                  , x = c * e + u * r
                  , k = c * i + u * s
                  , S = c * o + u * a
                  , L = 90 - 180 * D.atan2(g - y, v - b) / z;
                return {
                    x: d,
                    y: m,
                    m: {
                        x: g,
                        y: v
                    },
                    n: {
                        x: y,
                        y: b
                    },
                    start: {
                        x: w,
                        y: x
                    },
                    end: {
                        x: k,
                        y: S
                    },
                    alpha: L
                }
            }
            function h(e, n, r, i, s, a, u, c) {
                t.is(e, "array") || (e = [e, n, r, i, s, a, u, c]);
                var l = A.apply(null , e);
                return o(l.min.x, l.min.y, l.max.x - l.min.x, l.max.y - l.min.y)
            }
            function f(t, e, n) {
                return e >= t.x && e <= t.x + t.width && n >= t.y && n <= t.y + t.height
            }
            function p(t, e) {
                return t = o(t),
                e = o(e),
                f(e, t.x, t.y) || f(e, t.x2, t.y) || f(e, t.x, t.y2) || f(e, t.x2, t.y2) || f(t, e.x, e.y) || f(t, e.x2, e.y) || f(t, e.x, e.y2) || f(t, e.x2, e.y2) || (t.x < e.x2 && t.x > e.x || e.x < t.x2 && e.x > t.x) && (t.y < e.y2 && t.y > e.y || e.y < t.y2 && e.y > t.y)
            }
            function d(t, e, n, r, i) {
                var o = -3 * e + 9 * n - 9 * r + 3 * i
                  , s = t * o + 6 * e - 12 * n + 6 * r;
                return t * s - 3 * e + 3 * n
            }
            function m(t, e, n, r, i, o, s, a, u) {
                null == u && (u = 1),
                u = u > 1 ? 1 : 0 > u ? 0 : u;
                for (var c = u / 2, l = 12, h = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], f = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], p = 0, m = 0; l > m; m++) {
                    var g = c * h[m] + c
                      , v = d(g, t, n, i, s)
                      , y = d(g, e, r, o, a)
                      , b = v * v + y * y;
                    p += f[m] * D.sqrt(b)
                }
                return c * p
            }
            function g(t, e, n, r, i, o, s, a, u) {
                if (!(0 > u || m(t, e, n, r, i, o, s, a) < u)) {
                    var c, l = 1, h = l / 2, f = l - h, p = .01;
                    for (c = m(t, e, n, r, i, o, s, a, f); $(c - u) > p; )
                        h /= 2,
                        f += (u > c ? 1 : -1) * h,
                        c = m(t, e, n, r, i, o, s, a, f);
                    return f
                }
            }
            function v(t, e, n, r, i, o, s, a) {
                if (!(G(t, n) < U(i, s) || U(t, n) > G(i, s) || G(e, r) < U(o, a) || U(e, r) > G(o, a))) {
                    var u = (t * r - e * n) * (i - s) - (t - n) * (i * a - o * s)
                      , c = (t * r - e * n) * (o - a) - (e - r) * (i * a - o * s)
                      , l = (t - n) * (o - a) - (e - r) * (i - s);
                    if (l) {
                        var h = u / l
                          , f = c / l
                          , p = +h.toFixed(2)
                          , d = +f.toFixed(2);
                        if (!(p < +U(t, n).toFixed(2) || p > +G(t, n).toFixed(2) || p < +U(i, s).toFixed(2) || p > +G(i, s).toFixed(2) || d < +U(e, r).toFixed(2) || d > +G(e, r).toFixed(2) || d < +U(o, a).toFixed(2) || d > +G(o, a).toFixed(2)))
                            return {
                                x: h,
                                y: f
                            }
                    }
                }
            }
            function y(t, e, n) {
                var r = h(t)
                  , i = h(e);
                if (!p(r, i))
                    return n ? 0 : [];
                for (var o = m.apply(0, t), s = m.apply(0, e), a = ~~(o / 8), u = ~~(s / 8), c = [], f = [], d = {}, g = n ? 0 : [], y = 0; a + 1 > y; y++) {
                    var b = l.apply(0, t.concat(y / a));
                    c.push({
                        x: b.x,
                        y: b.y,
                        t: y / a
                    })
                }
                for (y = 0; u + 1 > y; y++)
                    b = l.apply(0, e.concat(y / u)),
                    f.push({
                        x: b.x,
                        y: b.y,
                        t: y / u
                    });
                for (y = 0; a > y; y++)
                    for (var w = 0; u > w; w++) {
                        var x = c[y]
                          , k = c[y + 1]
                          , S = f[w]
                          , L = f[w + 1]
                          , C = $(k.x - x.x) < .001 ? "y" : "x"
                          , T = $(L.x - S.x) < .001 ? "y" : "x"
                          , E = v(x.x, x.y, k.x, k.y, S.x, S.y, L.x, L.y);
                        if (E) {
                            if (d[E.x.toFixed(4)] == E.y.toFixed(4))
                                continue;d[E.x.toFixed(4)] = E.y.toFixed(4);
                            var F = x.t + $((E[C] - x[C]) / (k[C] - x[C])) * (k.t - x.t)
                              , j = S.t + $((E[T] - S[T]) / (L[T] - S[T])) * (L.t - S.t);
                            F >= 0 && 1 >= F && j >= 0 && 1 >= j && (n ? g++ : g.push({
                                x: E.x,
                                y: E.y,
                                t1: F,
                                t2: j
                            }))
                        }
                    }
                return g
            }
            function b(t, e) {
                return x(t, e)
            }
            function w(t, e) {
                return x(t, e, 1)
            }
            function x(t, e, n) {
                t = I(t),
                e = I(e);
                for (var r, i, o, s, a, u, c, l, h, f, p = n ? 0 : [], d = 0, m = t.length; m > d; d++) {
                    var g = t[d];
                    if ("M" == g[0])
                        r = a = g[1],
                        i = u = g[2];
                    else {
                        "C" == g[0] ? (h = [r, i].concat(g.slice(1)),
                        r = h[6],
                        i = h[7]) : (h = [r, i, r, i, a, u, a, u],
                        r = a,
                        i = u);
                        for (var v = 0, b = e.length; b > v; v++) {
                            var w = e[v];
                            if ("M" == w[0])
                                o = c = w[1],
                                s = l = w[2];
                            else {
                                "C" == w[0] ? (f = [o, s].concat(w.slice(1)),
                                o = f[6],
                                s = f[7]) : (f = [o, s, o, s, c, l, c, l],
                                o = c,
                                s = l);
                                var x = y(h, f, n);
                                if (n)
                                    p += x;
                                else {
                                    for (var k = 0, S = x.length; S > k; k++)
                                        x[k].segment1 = d,
                                        x[k].segment2 = v,
                                        x[k].bez1 = h,
                                        x[k].bez2 = f;
                                    p = p.concat(x)
                                }
                            }
                        }
                    }
                }
                return p
            }
            function k(t, e, n) {
                var r = S(t);
                return f(r, e, n) && x(t, [["M", e, n], ["H", r.x2 + 10]], 1) % 2 == 1
            }
            function S(t) {
                var e = i(t);
                if (e.bbox)
                    return P(e.bbox);
                if (!t)
                    return o();
                t = I(t);
                for (var n, r = 0, s = 0, a = [], u = [], c = 0, l = t.length; l > c; c++)
                    if (n = t[c],
                    "M" == n[0])
                        r = n[1],
                        s = n[2],
                        a.push(r),
                        u.push(s);
                    else {
                        var h = A(r, s, n[1], n[2], n[3], n[4], n[5], n[6]);
                        a = a.concat(h.min.x, h.max.x),
                        u = u.concat(h.min.y, h.max.y),
                        r = n[5],
                        s = n[6]
                    }
                var f = U.apply(0, a)
                  , p = U.apply(0, u)
                  , d = G.apply(0, a)
                  , m = G.apply(0, u)
                  , g = o(f, p, d - f, m - p);
                return e.bbox = P(g),
                g
            }
            function L(t, e, n, r, i) {
                if (i)
                    return [["M", +t + +i, e], ["l", n - 2 * i, 0], ["a", i, i, 0, 0, 1, i, i], ["l", 0, r - 2 * i], ["a", i, i, 0, 0, 1, -i, i], ["l", 2 * i - n, 0], ["a", i, i, 0, 0, 1, -i, -i], ["l", 0, 2 * i - r], ["a", i, i, 0, 0, 1, i, -i], ["z"]];
                var o = [["M", t, e], ["l", n, 0], ["l", 0, r], ["l", -n, 0], ["z"]];
                return o.toString = s,
                o
            }
            function C(t, e, n, r, i) {
                if (null == i && null == r && (r = n),
                t = +t,
                e = +e,
                n = +n,
                r = +r,
                null != i)
                    var o = Math.PI / 180
                      , a = t + n * Math.cos(-r * o)
                      , u = t + n * Math.cos(-i * o)
                      , c = e + n * Math.sin(-r * o)
                      , l = e + n * Math.sin(-i * o)
                      , h = [["M", a, c], ["A", n, n, 0, +(i - r > 180), 0, u, l]];
                else
                    h = [["M", t, e], ["m", 0, -r], ["a", n, r, 0, 1, 1, 0, 2 * r], ["a", n, r, 0, 1, 1, 0, -2 * r], ["z"]];
                return h.toString = s,
                h
            }
            function T(e) {
                var n = i(e)
                  , r = String.prototype.toLowerCase;
                if (n.rel)
                    return a(n.rel);
                t.is(e, "array") && t.is(e && e[0], "array") || (e = t.parsePathString(e));
                var o = []
                  , u = 0
                  , c = 0
                  , l = 0
                  , h = 0
                  , f = 0;
                "M" == e[0][0] && (u = e[0][1],
                c = e[0][2],
                l = u,
                h = c,
                f++,
                o.push(["M", u, c]));
                for (var p = f, d = e.length; d > p; p++) {
                    var m = o[p] = []
                      , g = e[p];
                    if (g[0] != r.call(g[0]))
                        switch (m[0] = r.call(g[0]),
                        m[0]) {
                        case "a":
                            m[1] = g[1],
                            m[2] = g[2],
                            m[3] = g[3],
                            m[4] = g[4],
                            m[5] = g[5],
                            m[6] = +(g[6] - u).toFixed(3),
                            m[7] = +(g[7] - c).toFixed(3);
                            break;
                        case "v":
                            m[1] = +(g[1] - c).toFixed(3);
                            break;
                        case "m":
                            l = g[1],
                            h = g[2];
                        default:
                            for (var v = 1, y = g.length; y > v; v++)
                                m[v] = +(g[v] - (v % 2 ? u : c)).toFixed(3)
                        }
                    else {
                        m = o[p] = [],
                        "m" == g[0] && (l = g[1] + u,
                        h = g[2] + c);
                        for (var b = 0, w = g.length; w > b; b++)
                            o[p][b] = g[b]
                    }
                    var x = o[p].length;
                    switch (o[p][0]) {
                    case "z":
                        u = l,
                        c = h;
                        break;
                    case "h":
                        u += +o[p][x - 1];
                        break;
                    case "v":
                        c += +o[p][x - 1];
                        break;
                    default:
                        u += +o[p][x - 2],
                        c += +o[p][x - 1]
                    }
                }
                return o.toString = s,
                n.rel = a(o),
                o
            }
            function E(e) {
                var n = i(e);
                if (n.abs)
                    return a(n.abs);
                if (O(e, "array") && O(e && e[0], "array") || (e = t.parsePathString(e)),
                !e || !e.length)
                    return [["M", 0, 0]];
                var r, o = [], u = 0, c = 0, l = 0, h = 0, f = 0;
                "M" == e[0][0] && (u = +e[0][1],
                c = +e[0][2],
                l = u,
                h = c,
                f++,
                o[0] = ["M", u, c]);
                for (var p, d, m = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), g = f, v = e.length; v > g; g++) {
                    if (o.push(p = []),
                    d = e[g],
                    r = d[0],
                    r != r.toUpperCase())
                        switch (p[0] = r.toUpperCase(),
                        p[0]) {
                        case "A":
                            p[1] = d[1],
                            p[2] = d[2],
                            p[3] = d[3],
                            p[4] = d[4],
                            p[5] = d[5],
                            p[6] = +d[6] + u,
                            p[7] = +d[7] + c;
                            break;
                        case "V":
                            p[1] = +d[1] + c;
                            break;
                        case "H":
                            p[1] = +d[1] + u;
                            break;
                        case "R":
                            for (var y = [u, c].concat(d.slice(1)), b = 2, w = y.length; w > b; b++)
                                y[b] = +y[b] + u,
                                y[++b] = +y[b] + c;
                            o.pop(),
                            o = o.concat(N(y, m));
                            break;
                        case "O":
                            o.pop(),
                            y = C(u, c, d[1], d[2]),
                            y.push(y[0]),
                            o = o.concat(y);
                            break;
                        case "U":
                            o.pop(),
                            o = o.concat(C(u, c, d[1], d[2], d[3])),
                            p = ["U"].concat(o[o.length - 1].slice(-2));
                            break;
                        case "M":
                            l = +d[1] + u,
                            h = +d[2] + c;
                        default:
                            for (b = 1,
                            w = d.length; w > b; b++)
                                p[b] = +d[b] + (b % 2 ? u : c)
                        }
                    else if ("R" == r)
                        y = [u, c].concat(d.slice(1)),
                        o.pop(),
                        o = o.concat(N(y, m)),
                        p = ["R"].concat(d.slice(-2));
                    else if ("O" == r)
                        o.pop(),
                        y = C(u, c, d[1], d[2]),
                        y.push(y[0]),
                        o = o.concat(y);
                    else if ("U" == r)
                        o.pop(),
                        o = o.concat(C(u, c, d[1], d[2], d[3])),
                        p = ["U"].concat(o[o.length - 1].slice(-2));
                    else
                        for (var x = 0, k = d.length; k > x; x++)
                            p[x] = d[x];
                    if (r = r.toUpperCase(),
                    "O" != r)
                        switch (p[0]) {
                        case "Z":
                            u = +l,
                            c = +h;
                            break;
                        case "H":
                            u = p[1];
                            break;
                        case "V":
                            c = p[1];
                            break;
                        case "M":
                            l = p[p.length - 2],
                            h = p[p.length - 1];
                        default:
                            u = p[p.length - 2],
                            c = p[p.length - 1]
                        }
                }
                return o.toString = s,
                n.abs = a(o),
                o
            }
            function F(t, e, n, r) {
                return [t, e, n, r, n, r]
            }
            function j(t, e, n, r, i, o) {
                var s = 1 / 3
                  , a = 2 / 3;
                return [s * t + a * n, s * e + a * r, s * i + a * n, s * o + a * r, i, o]
            }
            function _(e, n, r, i, o, s, a, u, c, l) {
                var h, f = 120 * z / 180, p = z / 180 * (+o || 0), d = [], m = t._.cacher(function(t, e, n) {
                    var r = t * D.cos(n) - e * D.sin(n)
                      , i = t * D.sin(n) + e * D.cos(n);
                    return {
                        x: r,
                        y: i
                    }
                });
                if (l)
                    L = l[0],
                    C = l[1],
                    k = l[2],
                    S = l[3];
                else {
                    h = m(e, n, -p),
                    e = h.x,
                    n = h.y,
                    h = m(u, c, -p),
                    u = h.x,
                    c = h.y;
                    var g = (D.cos(z / 180 * o),
                    D.sin(z / 180 * o),
                    (e - u) / 2)
                      , v = (n - c) / 2
                      , y = g * g / (r * r) + v * v / (i * i);
                    y > 1 && (y = D.sqrt(y),
                    r = y * r,
                    i = y * i);
                    var b = r * r
                      , w = i * i
                      , x = (s == a ? -1 : 1) * D.sqrt($((b * w - b * v * v - w * g * g) / (b * v * v + w * g * g)))
                      , k = x * r * v / i + (e + u) / 2
                      , S = x * -i * g / r + (n + c) / 2
                      , L = D.asin(((n - S) / i).toFixed(9))
                      , C = D.asin(((c - S) / i).toFixed(9));
                    L = k > e ? z - L : L,
                    C = k > u ? z - C : C,
                    0 > L && (L = 2 * z + L),
                    0 > C && (C = 2 * z + C),
                    a && L > C && (L -= 2 * z),
                    !a && C > L && (C -= 2 * z)
                }
                var T = C - L;
                if ($(T) > f) {
                    var E = C
                      , F = u
                      , j = c;
                    C = L + f * (a && C > L ? 1 : -1),
                    u = k + r * D.cos(C),
                    c = S + i * D.sin(C),
                    d = _(u, c, r, i, o, 0, a, F, j, [C, E, k, S])
                }
                T = C - L;
                var A = D.cos(L)
                  , I = D.sin(L)
                  , B = D.cos(C)
                  , N = D.sin(C)
                  , q = D.tan(T / 4)
                  , O = 4 / 3 * r * q
                  , P = 4 / 3 * i * q
                  , M = [e, n]
                  , V = [e + O * I, n - P * A]
                  , R = [u + O * N, c - P * B]
                  , U = [u, c];
                if (V[0] = 2 * M[0] - V[0],
                V[1] = 2 * M[1] - V[1],
                l)
                    return [V, R, U].concat(d);
                d = [V, R, U].concat(d).join().split(",");
                for (var G = [], H = 0, X = d.length; X > H; H++)
                    G[H] = H % 2 ? m(d[H - 1], d[H], p).y : m(d[H], d[H + 1], p).x;
                return G
            }
            function A(t, e, n, r, i, o, s, a) {
                for (var u, c, l, h, f, p, d, m, g = [], v = [[], []], y = 0; 2 > y; ++y)
                    if (0 == y ? (c = 6 * t - 12 * n + 6 * i,
                    u = -3 * t + 9 * n - 9 * i + 3 * s,
                    l = 3 * n - 3 * t) : (c = 6 * e - 12 * r + 6 * o,
                    u = -3 * e + 9 * r - 9 * o + 3 * a,
                    l = 3 * r - 3 * e),
                    $(u) < 1e-12) {
                        if ($(c) < 1e-12)
                            continue;h = -l / c,
                        h > 0 && 1 > h && g.push(h)
                    } else
                        d = c * c - 4 * l * u,
                        m = D.sqrt(d),
                        0 > d || (f = (-c + m) / (2 * u),
                        f > 0 && 1 > f && g.push(f),
                        p = (-c - m) / (2 * u),
                        p > 0 && 1 > p && g.push(p));
                for (var b, w = g.length, x = w; w--; )
                    h = g[w],
                    b = 1 - h,
                    v[0][w] = b * b * b * t + 3 * b * b * h * n + 3 * b * h * h * i + h * h * h * s,
                    v[1][w] = b * b * b * e + 3 * b * b * h * r + 3 * b * h * h * o + h * h * h * a;
                return v[0][x] = t,
                v[1][x] = e,
                v[0][x + 1] = s,
                v[1][x + 1] = a,
                v[0].length = v[1].length = x + 2,
                {
                    min: {
                        x: U.apply(0, v[0]),
                        y: U.apply(0, v[1])
                    },
                    max: {
                        x: G.apply(0, v[0]),
                        y: G.apply(0, v[1])
                    }
                }
            }
            function I(t, e) {
                var n = !e && i(t);
                if (!e && n.curve)
                    return a(n.curve);
                for (var r = E(t), o = e && E(e), s = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null ,
                    qy: null
                }, u = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null ,
                    qy: null
                }, c = (function(t, e, n) {
                    var r, i;
                    if (!t)
                        return ["C", e.x, e.y, e.x, e.y, e.x, e.y];
                    switch (!(t[0]in {
                        T: 1,
                        Q: 1
                    }) && (e.qx = e.qy = null ),
                    t[0]) {
                    case "M":
                        e.X = t[1],
                        e.Y = t[2];
                        break;
                    case "A":
                        t = ["C"].concat(_.apply(0, [e.x, e.y].concat(t.slice(1))));
                        break;
                    case "S":
                        "C" == n || "S" == n ? (r = 2 * e.x - e.bx,
                        i = 2 * e.y - e.by) : (r = e.x,
                        i = e.y),
                        t = ["C", r, i].concat(t.slice(1));
                        break;
                    case "T":
                        "Q" == n || "T" == n ? (e.qx = 2 * e.x - e.qx,
                        e.qy = 2 * e.y - e.qy) : (e.qx = e.x,
                        e.qy = e.y),
                        t = ["C"].concat(j(e.x, e.y, e.qx, e.qy, t[1], t[2]));
                        break;
                    case "Q":
                        e.qx = t[1],
                        e.qy = t[2],
                        t = ["C"].concat(j(e.x, e.y, t[1], t[2], t[3], t[4]));
                        break;
                    case "L":
                        t = ["C"].concat(F(e.x, e.y, t[1], t[2]));
                        break;
                    case "H":
                        t = ["C"].concat(F(e.x, e.y, t[1], e.y));
                        break;
                    case "V":
                        t = ["C"].concat(F(e.x, e.y, e.x, t[1]));
                        break;
                    case "Z":
                        t = ["C"].concat(F(e.x, e.y, e.X, e.Y))
                    }
                    return t
                }
                ), l = function(t, e) {
                    if (t[e].length > 7) {
                        t[e].shift();
                        for (var n = t[e]; n.length; )
                            f[e] = "A",
                            o && (p[e] = "A"),
                            t.splice(e++, 0, ["C"].concat(n.splice(0, 6)));
                        t.splice(e, 1),
                        v = G(r.length, o && o.length || 0)
                    }
                }
                , h = function(t, e, n, i, s) {
                    t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", i.x, i.y]),
                    n.bx = 0,
                    n.by = 0,
                    n.x = t[s][1],
                    n.y = t[s][2],
                    v = G(r.length, o && o.length || 0))
                }
                , f = [], p = [], d = "", m = "", g = 0, v = G(r.length, o && o.length || 0); v > g; g++) {
                    r[g] && (d = r[g][0]),
                    "C" != d && (f[g] = d,
                    g && (m = f[g - 1])),
                    r[g] = c(r[g], s, m),
                    "A" != f[g] && "C" == d && (f[g] = "C"),
                    l(r, g),
                    o && (o[g] && (d = o[g][0]),
                    "C" != d && (p[g] = d,
                    g && (m = p[g - 1])),
                    o[g] = c(o[g], u, m),
                    "A" != p[g] && "C" == d && (p[g] = "C"),
                    l(o, g)),
                    h(r, o, s, u, g),
                    h(o, r, u, s, g);
                    var y = r[g]
                      , b = o && o[g]
                      , w = y.length
                      , x = o && b.length;
                    s.x = y[w - 2],
                    s.y = y[w - 1],
                    s.bx = R(y[w - 4]) || s.x,
                    s.by = R(y[w - 3]) || s.y,
                    u.bx = o && (R(b[x - 4]) || u.x),
                    u.by = o && (R(b[x - 3]) || u.y),
                    u.x = o && b[x - 2],
                    u.y = o && b[x - 1]
                }
                return o || (n.curve = a(r)),
                o ? [r, o] : r
            }
            function B(t, e) {
                if (!e)
                    return t;
                var n, r, i, o, s, a, u;
                for (t = I(t),
                i = 0,
                s = t.length; s > i; i++)
                    for (u = t[i],
                    o = 1,
                    a = u.length; a > o; o += 2)
                        n = e.x(u[o], u[o + 1]),
                        r = e.y(u[o], u[o + 1]),
                        u[o] = n,
                        u[o + 1] = r;
                return t
            }
            function N(t, e) {
                for (var n = [], r = 0, i = t.length; i - 2 * !e > r; r += 2) {
                    var o = [{
                        x: +t[r - 2],
                        y: +t[r - 1]
                    }, {
                        x: +t[r],
                        y: +t[r + 1]
                    }, {
                        x: +t[r + 2],
                        y: +t[r + 3]
                    }, {
                        x: +t[r + 4],
                        y: +t[r + 5]
                    }];
                    e ? r ? i - 4 == r ? o[3] = {
                        x: +t[0],
                        y: +t[1]
                    } : i - 2 == r && (o[2] = {
                        x: +t[0],
                        y: +t[1]
                    },
                    o[3] = {
                        x: +t[2],
                        y: +t[3]
                    }) : o[0] = {
                        x: +t[i - 2],
                        y: +t[i - 1]
                    } : i - 4 == r ? o[3] = o[2] : r || (o[0] = {
                        x: +t[r],
                        y: +t[r + 1]
                    }),
                    n.push(["C", (-o[0].x + 6 * o[1].x + o[2].x) / 6, (-o[0].y + 6 * o[1].y + o[2].y) / 6, (o[1].x + 6 * o[2].x - o[3].x) / 6, (o[1].y + 6 * o[2].y - o[3].y) / 6, o[2].x, o[2].y])
                }
                return n
            }
            var q = e.prototype
              , O = t.is
              , P = t._.clone
              , M = "hasOwnProperty"
              , V = /,?([a-z]),?/gi
              , R = parseFloat
              , D = Math
              , z = D.PI
              , U = D.min
              , G = D.max
              , H = D.pow
              , $ = D.abs
              , X = c(1)
              , Y = c()
              , W = c(0, 1)
              , J = t._unit2px
              , Z = {
                path: function(t) {
                    return t.attr("path")
                },
                circle: function(t) {
                    var e = J(t);
                    return C(e.cx, e.cy, e.r)
                },
                ellipse: function(t) {
                    var e = J(t);
                    return C(e.cx || 0, e.cy || 0, e.rx, e.ry)
                },
                rect: function(t) {
                    var e = J(t);
                    return L(e.x || 0, e.y || 0, e.width, e.height, e.rx, e.ry)
                },
                image: function(t) {
                    var e = J(t);
                    return L(e.x || 0, e.y || 0, e.width, e.height)
                },
                line: function(t) {
                    return "M" + [t.attr("x1") || 0, t.attr("y1") || 0, t.attr("x2"), t.attr("y2")]
                },
                polyline: function(t) {
                    return "M" + t.attr("points")
                },
                polygon: function(t) {
                    return "M" + t.attr("points") + "z"
                },
                deflt: function(t) {
                    var e = t.node.getBBox();
                    return L(e.x, e.y, e.width, e.height)
                }
            };
            t.path = i,
            t.path.getTotalLength = X,
            t.path.getPointAtLength = Y,
            t.path.getSubpath = function(t, e, n) {
                if (this.getTotalLength(t) - n < 1e-6)
                    return W(t, e).end;
                var r = W(t, n, 1);
                return e ? W(r, e).end : r
            }
            ,
            q.getTotalLength = function() {
                return this.node.getTotalLength ? this.node.getTotalLength() : void 0
            }
            ,
            q.getPointAtLength = function(t) {
                return Y(this.attr("d"), t)
            }
            ,
            q.getSubpath = function(e, n) {
                return t.path.getSubpath(this.attr("d"), e, n)
            }
            ,
            t._.box = o,
            t.path.findDotsAtSegment = l,
            t.path.bezierBBox = h,
            t.path.isPointInsideBBox = f,
            t.closest = function(e, n, r, i) {
                for (var s = 100, a = o(e - s / 2, n - s / 2, s, s), u = [], c = r[0].hasOwnProperty("x") ? function(t) {
                    return {
                        x: r[t].x,
                        y: r[t].y
                    }
                }
                : function(t) {
                    return {
                        x: r[t],
                        y: i[t]
                    }
                }
                , l = 0; 1e6 >= s && !l; ) {
                    for (var h = 0, p = r.length; p > h; h++) {
                        var d = c(h);
                        if (f(a, d.x, d.y)) {
                            l++,
                            u.push(d);
                            break
                        }
                    }
                    l || (s *= 2,
                    a = o(e - s / 2, n - s / 2, s, s))
                }
                if (1e6 != s) {
                    var m, g = 1 / 0;
                    for (h = 0,
                    p = u.length; p > h; h++) {
                        var v = t.len(e, n, u[h].x, u[h].y);
                        g > v && (g = v,
                        u[h].len = v,
                        m = u[h])
                    }
                    return m
                }
            }
            ,
            t.path.isBBoxIntersect = p,
            t.path.intersection = b,
            t.path.intersectionNumber = w,
            t.path.isPointInside = k,
            t.path.getBBox = S,
            t.path.get = Z,
            t.path.toRelative = T,
            t.path.toAbsolute = E,
            t.path.toCubic = I,
            t.path.map = B,
            t.path.toString = s,
            t.path.clone = a
        }),
        i.plugin(function(t, e, n, i) {
            var o = Math.max
              , s = Math.min
              , a = function(t) {
                if (this.items = [],
                this.bindings = {},
                this.length = 0,
                this.type = "set",
                t)
                    for (var e = 0, n = t.length; n > e; e++)
                        t[e] && (this[this.items.length] = this.items[this.items.length] = t[e],
                        this.length++)
            }
              , u = a.prototype;
            u.push = function() {
                for (var t, e, n = 0, r = arguments.length; r > n; n++)
                    t = arguments[n],
                    t && (e = this.items.length,
                    this[e] = this.items[e] = t,
                    this.length++);
                return this
            }
            ,
            u.pop = function() {
                return this.length && delete this[this.length--],
                this.items.pop()
            }
            ,
            u.forEach = function(t, e) {
                for (var n = 0, r = this.items.length; r > n; n++)
                    if (t.call(e, this.items[n], n) === !1)
                        return this;
                return this
            }
            ,
            u.animate = function(e, n, i, o) {
                "function" != typeof i || i.length || (o = i,
                i = r.linear),
                e instanceof t._.Animation && (o = e.callback,
                i = e.easing,
                n = i.dur,
                e = e.attr);
                var s = arguments;
                if (t.is(e, "array") && t.is(s[s.length - 1], "array"))
                    var a = !0;
                var u, c = function() {
                    u ? this.b = u : u = this.b
                }
                , l = 0, h = this, f = o && function() {
                    ++l == h.length && o.call(this)
                }
                ;
                return this.forEach(function(t, r) {
                    eve.once("snap.animcreated." + t.id, c),
                    a ? s[r] && t.animate.apply(t, s[r]) : t.animate(e, n, i, f)
                })
            }
            ,
            u.remove = function() {
                for (; this.length; )
                    this.pop().remove();
                return this
            }
            ,
            u.bind = function(t, e, n) {
                var r = {};
                if ("function" == typeof e)
                    this.bindings[t] = e;
                else {
                    var i = n || t;
                    this.bindings[t] = function(t) {
                        r[i] = t,
                        e.attr(r)
                    }
                }
                return this
            }
            ,
            u.attr = function(t) {
                var e = {};
                for (var n in t)
                    this.bindings[n] ? this.bindings[n](t[n]) : e[n] = t[n];
                for (var r = 0, i = this.items.length; i > r; r++)
                    this.items[r].attr(e);
                return this
            }
            ,
            u.clear = function() {
                for (; this.length; )
                    this.pop()
            }
            ,
            u.splice = function(t, e, n) {
                t = 0 > t ? o(this.length + t, 0) : t,
                e = o(0, s(this.length - t, e));
                var r, i = [], u = [], c = [];
                for (r = 2; r < arguments.length; r++)
                    c.push(arguments[r]);
                for (r = 0; e > r; r++)
                    u.push(this[t + r]);
                for (; r < this.length - t; r++)
                    i.push(this[t + r]);
                var l = c.length;
                for (r = 0; r < l + i.length; r++)
                    this.items[t + r] = this[t + r] = l > r ? c[r] : i[r - l];
                for (r = this.items.length = this.length -= e - l; this[r]; )
                    delete this[r++];
                return new a(u)
            }
            ,
            u.exclude = function(t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (this[e] == t)
                        return this.splice(e, 1),
                        !0;
                return !1
            }
            ,
            u.insertAfter = function(t) {
                for (var e = this.items.length; e--; )
                    this.items[e].insertAfter(t);
                return this
            }
            ,
            u.getBBox = function() {
                for (var t = [], e = [], n = [], r = [], i = this.items.length; i--; )
                    if (!this.items[i].removed) {
                        var a = this.items[i].getBBox();
                        t.push(a.x),
                        e.push(a.y),
                        n.push(a.x + a.width),
                        r.push(a.y + a.height)
                    }
                return t = s.apply(0, t),
                e = s.apply(0, e),
                n = o.apply(0, n),
                r = o.apply(0, r),
                {
                    x: t,
                    y: e,
                    x2: n,
                    y2: r,
                    width: n - t,
                    height: r - e,
                    cx: t + (n - t) / 2,
                    cy: e + (r - e) / 2
                }
            }
            ,
            u.clone = function(t) {
                t = new a;
                for (var e = 0, n = this.items.length; n > e; e++)
                    t.push(this.items[e].clone());
                return t
            }
            ,
            u.toString = function() {
                return "Snap‘s set"
            }
            ,
            u.type = "set",
            t.Set = a,
            t.set = function() {
                var t = new a;
                return arguments.length && t.push.apply(t, Array.prototype.slice.call(arguments, 0)),
                t
            }
        }),
        i.plugin(function(t, e, n, r) {
            function i(t) {
                var e = t[0];
                switch (e.toLowerCase()) {
                case "t":
                    return [e, 0, 0];
                case "m":
                    return [e, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                case "s":
                    return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1]
                }
            }
            function o(e, n, r) {
                n = g(n).replace(/\.{3}|\u2026/g, e),
                e = t.parseTransformString(e) || [],
                n = t.parseTransformString(n) || [];
                for (var o, s, a, u, c = Math.max(e.length, n.length), f = [], p = [], d = 0; c > d; d++) {
                    if (a = e[d] || i(n[d]),
                    u = n[d] || i(a),
                    a[0] != u[0] || "r" == a[0].toLowerCase() && (a[2] != u[2] || a[3] != u[3]) || "s" == a[0].toLowerCase() && (a[3] != u[3] || a[4] != u[4])) {
                        e = t._.transform2matrix(e, r()),
                        n = t._.transform2matrix(n, r()),
                        f = [["m", e.a, e.b, e.c, e.d, e.e, e.f]],
                        p = [["m", n.a, n.b, n.c, n.d, n.e, n.f]];
                        break
                    }
                    for (f[d] = [],
                    p[d] = [],
                    o = 0,
                    s = Math.max(a.length, u.length); s > o; o++)
                        o in a && (f[d][o] = a[o]),
                        o in u && (p[d][o] = u[o])
                }
                return {
                    from: h(f),
                    to: h(p),
                    f: l(f)
                }
            }
            function s(t) {
                return t
            }
            function a(t) {
                return function(e) {
                    return +e.toFixed(3) + t
                }
            }
            function u(t) {
                return t.join(" ")
            }
            function c(e) {
                return t.rgb(e[0], e[1], e[2])
            }
            function l(t) {
                var e, n, r, i, o, s, a = 0, u = [];
                for (e = 0,
                n = t.length; n > e; e++) {
                    for (o = "[",
                    s = ['"' + t[e][0] + '"'],
                    r = 1,
                    i = t[e].length; i > r; r++)
                        s[r] = "val[" + a++ + "]";
                    o += s + "]",
                    u[e] = o
                }
                return Function("val", "return Snap.path.toString.call([" + u + "])")
            }
            function h(t) {
                for (var e = [], n = 0, r = t.length; r > n; n++)
                    for (var i = 1, o = t[n].length; o > i; i++)
                        e.push(t[n][i]);
                return e
            }
            function f(t) {
                return isFinite(parseFloat(t))
            }
            function p(e, n) {
                return t.is(e, "array") && t.is(n, "array") ? e.toString() == n.toString() : !1
            }
            var d = {}
              , m = /[a-z]+$/i
              , g = String;
            d.stroke = d.fill = "colour",
            e.prototype.equal = function(t, e) {
                return eve("snap.util.equal", this, t, e).firstDefined()
            }
            ,
            eve.on("snap.util.equal", function(e, n) {
                var r, i, v = g(this.attr(e) || ""), y = this;
                if (f(v) && f(n))
                    return {
                        from: parseFloat(v),
                        to: parseFloat(n),
                        f: s
                    };
                if ("colour" == d[e])
                    return r = t.color(v),
                    i = t.color(n),
                    {
                        from: [r.r, r.g, r.b, r.opacity],
                        to: [i.r, i.g, i.b, i.opacity],
                        f: c
                    };
                if ("viewBox" == e)
                    return r = this.attr(e).vb.split(" ").map(Number),
                    i = n.split(" ").map(Number),
                    {
                        from: r,
                        to: i,
                        f: u
                    };
                if ("transform" == e || "gradientTransform" == e || "patternTransform" == e)
                    return n instanceof t.Matrix && (n = n.toTransformString()),
                    t._.rgTransform.test(n) || (n = t._.svgTransform2string(n)),
                    o(v, n, function() {
                        return y.getBBox(1)
                    });
                if ("d" == e || "path" == e)
                    return r = t.path.toCubic(v, n),
                    {
                        from: h(r[0]),
                        to: h(r[1]),
                        f: l(r[0])
                    };
                if ("points" == e)
                    return r = g(v).split(t._.separator),
                    i = g(n).split(t._.separator),
                    {
                        from: r,
                        to: i,
                        f: function(t) {
                            return t
                        }
                    };
                var b = v.match(m)
                  , w = g(n).match(m);
                return b && p(b, w) ? {
                    from: parseFloat(v),
                    to: parseFloat(n),
                    f: a(b)
                } : {
                    from: this.asPX(e),
                    to: this.asPX(e, n),
                    f: s
                }
            })
        }),
        i.plugin(function(t, e, n, r) {
            for (var i = e.prototype, o = "hasOwnProperty", s = ("createTouch"in r.doc), a = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], u = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            }, c = (function(t, e) {
                var n = "y" == t ? "scrollTop" : "scrollLeft"
                  , i = e && e.node ? e.node.ownerDocument : r.doc;
                return i[n in i.documentElement ? "documentElement" : "body"][n]
            }
            ), l = function() {
                return this.originalEvent.preventDefault()
            }
            , h = function() {
                return this.originalEvent.stopPropagation()
            }
            , f = function(t, e, n, r) {
                var i = s && u[e] ? u[e] : e
                  , a = function(i) {
                    var a = c("y", r)
                      , f = c("x", r);
                    if (s && u[o](e))
                        for (var p = 0, d = i.targetTouches && i.targetTouches.length; d > p; p++)
                            if (i.targetTouches[p].target == t || t.contains(i.targetTouches[p].target)) {
                                var m = i;
                                i = i.targetTouches[p],
                                i.originalEvent = m,
                                i.preventDefault = l,
                                i.stopPropagation = h;
                                break
                            }
                    var g = i.clientX + f
                      , v = i.clientY + a;
                    return n.call(r, i, g, v)
                }
                ;
                return e !== i && t.addEventListener(e, a, !1),
                t.addEventListener(i, a, !1),
                function() {
                    return e !== i && t.removeEventListener(e, a, !1),
                    t.removeEventListener(i, a, !1),
                    !0
                }
            }
            , p = [], d = function(t) {
                for (var e, n = t.clientX, r = t.clientY, i = c("y"), o = c("x"), a = p.length; a--; ) {
                    if (e = p[a],
                    s) {
                        for (var u, l = t.touches && t.touches.length; l--; )
                            if (u = t.touches[l],
                            u.identifier == e.el._drag.id || e.el.node.contains(u.target)) {
                                n = u.clientX,
                                r = u.clientY,
                                (t.originalEvent ? t.originalEvent : t).preventDefault();
                                break
                            }
                    } else
                        t.preventDefault();
                    var h = e.el.node;
                    h.nextSibling,
                    h.parentNode,
                    h.style.display;
                    n += o,
                    r += i,
                    eve("snap.drag.move." + e.el.id, e.move_scope || e.el, n - e.el._drag.x, r - e.el._drag.y, n, r, t)
                }
            }
            , m = function(e) {
                t.unmousemove(d).unmouseup(m);
                for (var n, r = p.length; r--; )
                    n = p[r],
                    n.el._drag = {},
                    eve("snap.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, e),
                    eve.off("snap.drag.*." + n.el.id);
                p = []
            }
            , g = a.length; g--; )
                !function(e) {
                    t[e] = i[e] = function(n, r) {
                        if (t.is(n, "function"))
                            this.events = this.events || [],
                            this.events.push({
                                name: e,
                                f: n,
                                unbind: f(this.node || document, e, n, r || this)
                            });
                        else
                            for (var i = 0, o = this.events.length; o > i; i++)
                                if (this.events[i].name == e)
                                    try {
                                        this.events[i].f.call(this)
                                    } catch (s) {}
                        return this
                    }
                    ,
                    t["un" + e] = i["un" + e] = function(t) {
                        for (var n = this.events || [], r = n.length; r--; )
                            if (n[r].name == e && (n[r].f == t || !t))
                                return n[r].unbind(),
                                n.splice(r, 1),
                                !n.length && delete this.events,
                                this;
                        return this
                    }
                }(a[g]);
            i.hover = function(t, e, n, r) {
                return this.mouseover(t, n).mouseout(e, r || n)
            }
            ,
            i.unhover = function(t, e) {
                return this.unmouseover(t).unmouseout(e)
            }
            ;
            var v = [];
            i.drag = function(e, n, r, i, o, s) {
                function a(a, u, l) {
                    (a.originalEvent || a).preventDefault(),
                    c._drag.x = u,
                    c._drag.y = l,
                    c._drag.id = a.identifier,
                    !p.length && t.mousemove(d).mouseup(m),
                    p.push({
                        el: c,
                        move_scope: i,
                        start_scope: o,
                        end_scope: s
                    }),
                    n && eve.on("snap.drag.start." + c.id, n),
                    e && eve.on("snap.drag.move." + c.id, e),
                    r && eve.on("snap.drag.end." + c.id, r),
                    eve("snap.drag.start." + c.id, o || i || c, u, l, a)
                }
                function u(t, e, n) {
                    eve("snap.draginit." + c.id, c, t, e, n)
                }
                var c = this;
                if (!arguments.length) {
                    var l;
                    return c.drag(function(t, e) {
                        this.attr({
                            transform: l + (l ? "T" : "t") + [t, e]
                        })
                    }, function() {
                        l = this.transform().local
                    })
                }
                return eve.on("snap.draginit." + c.id, a),
                c._drag = {},
                v.push({
                    el: c,
                    start: a,
                    init: u
                }),
                c.mousedown(u),
                c
            }
            ,
            i.undrag = function() {
                for (var e = v.length; e--; )
                    v[e].el == this && (this.unmousedown(v[e].init),
                    v.splice(e, 1),
                    eve.unbind("snap.drag.*." + this.id),
                    eve.unbind("snap.draginit." + this.id));
                return !v.length && t.unmousemove(d).unmouseup(m),
                this
            }
        }),
        i.plugin(function(t, e, n, r) {
            var i = (e.prototype,
            n.prototype)
              , o = /^\s*url\((.+)\)/
              , s = String
              , a = t._.$;
            t.filter = {},
            i.filter = function(n) {
                var r = this;
                "svg" != r.type && (r = r.paper);
                var i = t.parse(s(n))
                  , o = t._.id()
                  , u = (r.node.offsetWidth,
                r.node.offsetHeight,
                a("filter"));
                return a(u, {
                    id: o,
                    filterUnits: "userSpaceOnUse"
                }),
                u.appendChild(i.node),
                r.defs.appendChild(u),
                new e(u)
            }
            ,
            eve.on("snap.util.getattr.filter", function() {
                eve.stop();
                var e = a(this.node, "filter");
                if (e) {
                    var n = s(e).match(o);
                    return n && t.select(n[1])
                }
            }),
            eve.on("snap.util.attr.filter", function(n) {
                if (n instanceof e && "filter" == n.type) {
                    eve.stop();
                    var r = n.node.id;
                    r || (a(n.node, {
                        id: n.id
                    }),
                    r = n.id),
                    a(this.node, {
                        filter: t.url(r)
                    })
                }
                n && "none" != n || (eve.stop(),
                this.node.removeAttribute("filter"))
            }),
            t.filter.blur = function(e, n) {
                null == e && (e = 2);
                var r = null == n ? e : [e, n];
                return t.format('<feGaussianBlur stdDeviation="{def}"/>', {
                    def: r
                })
            }
            ,
            t.filter.blur.toString = function() {
                return this()
            }
            ,
            t.filter.shadow = function(e, n, r, i, o) {
                return "string" == typeof r && (i = r,
                o = i,
                r = 4),
                "string" != typeof i && (o = i,
                i = "#000"),
                i = i || "#000",
                null == r && (r = 4),
                null == o && (o = 1),
                null == e && (e = 0,
                n = 2),
                null == n && (n = e),
                i = t.color(i),
                t.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                    color: i,
                    dx: e,
                    dy: n,
                    blur: r,
                    opacity: o
                })
            }
            ,
            t.filter.shadow.toString = function() {
                return this()
            }
            ,
            t.filter.grayscale = function(e) {
                return null == e && (e = 1),
                t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                    a: .2126 + .7874 * (1 - e),
                    b: .7152 - .7152 * (1 - e),
                    c: .0722 - .0722 * (1 - e),
                    d: .2126 - .2126 * (1 - e),
                    e: .7152 + .2848 * (1 - e),
                    f: .0722 - .0722 * (1 - e),
                    g: .2126 - .2126 * (1 - e),
                    h: .0722 + .9278 * (1 - e)
                })
            }
            ,
            t.filter.grayscale.toString = function() {
                return this()
            }
            ,
            t.filter.sepia = function(e) {
                return null == e && (e = 1),
                t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                    a: .393 + .607 * (1 - e),
                    b: .769 - .769 * (1 - e),
                    c: .189 - .189 * (1 - e),
                    d: .349 - .349 * (1 - e),
                    e: .686 + .314 * (1 - e),
                    f: .168 - .168 * (1 - e),
                    g: .272 - .272 * (1 - e),
                    h: .534 - .534 * (1 - e),
                    i: .131 + .869 * (1 - e)
                })
            }
            ,
            t.filter.sepia.toString = function() {
                return this()
            }
            ,
            t.filter.saturate = function(e) {
                return null == e && (e = 1),
                t.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                    amount: 1 - e
                })
            }
            ,
            t.filter.saturate.toString = function() {
                return this()
            }
            ,
            t.filter.hueRotate = function(e) {
                return e = e || 0,
                t.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                    angle: e
                })
            }
            ,
            t.filter.hueRotate.toString = function() {
                return this()
            }
            ,
            t.filter.invert = function(e) {
                return null == e && (e = 1),
                t.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                    amount: e,
                    amount2: 1 - e
                })
            }
            ,
            t.filter.invert.toString = function() {
                return this()
            }
            ,
            t.filter.brightness = function(e) {
                return null == e && (e = 1),
                t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                    amount: e
                })
            }
            ,
            t.filter.brightness.toString = function() {
                return this()
            }
            ,
            t.filter.contrast = function(e) {
                return null == e && (e = 1),
                t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                    amount: e,
                    amount2: .5 - e / 2
                })
            }
            ,
            t.filter.contrast.toString = function() {
                return this()
            }
        }),
        i.plugin(function(t, e, n, r, i) {
            var o = t._.box
              , s = t.is
              , a = /^[^a-z]*([tbmlrc])/i
              , u = function() {
                return "T" + this.dx + "," + this.dy
            }
            ;
            e.prototype.getAlign = function(t, e) {
                null == e && s(t, "string") && (e = t,
                t = null ),
                t = t || this.paper;
                var n = t.getBBox ? t.getBBox() : o(t)
                  , r = this.getBBox()
                  , i = {};
                switch (e = e && e.match(a),
                e = e ? e[1].toLowerCase() : "c") {
                case "t":
                    i.dx = 0,
                    i.dy = n.y - r.y;
                    break;
                case "b":
                    i.dx = 0,
                    i.dy = n.y2 - r.y2;
                    break;
                case "m":
                    i.dx = 0,
                    i.dy = n.cy - r.cy;
                    break;
                case "l":
                    i.dx = n.x - r.x,
                    i.dy = 0;
                    break;
                case "r":
                    i.dx = n.x2 - r.x2,
                    i.dy = 0;
                    break;
                default:
                    i.dx = n.cx - r.cx,
                    i.dy = 0
                }
                return i.toString = u,
                i
            }
            ,
            e.prototype.align = function(t, e) {
                return this.transform("..." + this.getAlign(t, e))
            }
        }),
        e.exports = i
    }
    , {
        "snapsvg/node_modules/eve": 34
    }],
    34: [function(t, e, n) {
        !function(t) {
            var n, r, i = "0.4.2", o = "hasOwnProperty", s = /[\.\/]/, a = /\s*,\s*/, u = "*", c = function(t, e) {
                return t - e
            }
            , l = {
                n: {}
            }, h = function() {
                for (var t = 0, e = this.length; e > t; t++)
                    if ("undefined" != typeof this[t])
                        return this[t]
            }
            , f = function() {
                for (var t = this.length; --t; )
                    if ("undefined" != typeof this[t])
                        return this[t]
            }
            , p = function(t, e) {
                t = String(t);
                var i, o = r, s = Array.prototype.slice.call(arguments, 2), a = p.listeners(t), u = 0, l = [], d = {}, m = [], g = n;
                m.firstDefined = h,
                m.lastDefined = f,
                n = t,
                r = 0;
                for (var v = 0, y = a.length; y > v; v++)
                    "zIndex"in a[v] && (l.push(a[v].zIndex),
                    a[v].zIndex < 0 && (d[a[v].zIndex] = a[v]));
                for (l.sort(c); l[u] < 0; )
                    if (i = d[l[u++]],
                    m.push(i.apply(e, s)),
                    r)
                        return r = o,
                        m;
                for (v = 0; y > v; v++)
                    if (i = a[v],
                    "zIndex"in i)
                        if (i.zIndex == l[u]) {
                            if (m.push(i.apply(e, s)),
                            r)
                                break;
                            do
                                if (u++,
                                i = d[l[u]],
                                i && m.push(i.apply(e, s)),
                                r)
                                    break;
                            while (i)
                        } else
                            d[i.zIndex] = i;
                    else if (m.push(i.apply(e, s)),
                    r)
                        break;
                return r = o,
                n = g,
                m
            }
            ;
            p._events = l,
            p.listeners = function(t) {
                var e, n, r, i, o, a, c, h, f = t.split(s), p = l, d = [p], m = [];
                for (i = 0,
                o = f.length; o > i; i++) {
                    for (h = [],
                    a = 0,
                    c = d.length; c > a; a++)
                        for (p = d[a].n,
                        n = [p[f[i]], p[u]],
                        r = 2; r--; )
                            e = n[r],
                            e && (h.push(e),
                            m = m.concat(e.f || []));
                    d = h
                }
                return m
            }
            ,
            p.on = function(t, e) {
                if (t = String(t),
                "function" != typeof e)
                    return function() {}
                    ;
                for (var n = t.split(a), r = 0, i = n.length; i > r; r++)
                    !function(t) {
                        for (var n, r = t.split(s), i = l, o = 0, a = r.length; a > o; o++)
                            i = i.n,
                            i = i.hasOwnProperty(r[o]) && i[r[o]] || (i[r[o]] = {
                                n: {}
                            });
                        for (i.f = i.f || [],
                        o = 0,
                        a = i.f.length; a > o; o++)
                            if (i.f[o] == e) {
                                n = !0;
                                break
                            }
                        !n && i.f.push(e)
                    }(n[r]);
                return function(t) {
                    +t == +t && (e.zIndex = +t)
                }
            }
            ,
            p.f = function(t) {
                var e = [].slice.call(arguments, 1);
                return function() {
                    p.apply(null , [t, null ].concat(e).concat([].slice.call(arguments, 0)))
                }
            }
            ,
            p.stop = function() {
                r = 1
            }
            ,
            p.nt = function(t) {
                return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(n) : n
            }
            ,
            p.nts = function() {
                return n.split(s)
            }
            ,
            p.off = p.unbind = function(t, e) {
                if (!t)
                    return void (p._events = l = {
                        n: {}
                    });
                var n = t.split(a);
                if (n.length > 1)
                    for (var r = 0, i = n.length; i > r; r++)
                        p.off(n[r], e);
                else {
                    n = t.split(s);
                    var c, h, f, r, i, d, m, g = [l];
                    for (r = 0,
                    i = n.length; i > r; r++)
                        for (d = 0; d < g.length; d += f.length - 2) {
                            if (f = [d, 1],
                            c = g[d].n,
                            n[r] != u)
                                c[n[r]] && f.push(c[n[r]]);
                            else
                                for (h in c)
                                    c[o](h) && f.push(c[h]);
                            g.splice.apply(g, f)
                        }
                    for (r = 0,
                    i = g.length; i > r; r++)
                        for (c = g[r]; c.n; ) {
                            if (e) {
                                if (c.f) {
                                    for (d = 0,
                                    m = c.f.length; m > d; d++)
                                        if (c.f[d] == e) {
                                            c.f.splice(d, 1);
                                            break
                                        }
                                    !c.f.length && delete c.f
                                }
                                for (h in c.n)
                                    if (c.n[o](h) && c.n[h].f) {
                                        var v = c.n[h].f;
                                        for (d = 0,
                                        m = v.length; m > d; d++)
                                            if (v[d] == e) {
                                                v.splice(d, 1);
                                                break
                                            }
                                        !v.length && delete c.n[h].f
                                    }
                            } else {
                                delete c.f;
                                for (h in c.n)
                                    c.n[o](h) && c.n[h].f && delete c.n[h].f
                            }
                            c = c.n
                        }
                }
            }
            ,
            p.once = function(t, e) {
                var n = function() {
                    return p.unbind(t, n),
                    e.apply(this, arguments)
                }
                ;
                return p.on(t, n)
            }
            ,
            p.version = i,
            p.toString = function() {
                return "You are running Eve " + i
            }
            ,
            "undefined" != typeof e && e.exports ? e.exports = p : "function" == typeof define && define.amd ? define("eve", [], function() {
                return p
            }) : t.eve = p
        }(this)
    }
    , {}],
    35: [function(t, e, n) {
        !function(t) {
            "use strict";
            function e(t) {
                if ("string" != typeof t && (t = String(t)),
                /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
                    throw new TypeError("Invalid character in header field name");
                return t.toLowerCase()
            }
            function n(t) {
                return "string" != typeof t && (t = String(t)),
                t
            }
            function r(t) {
                this.map = {},
                t instanceof r ? t.forEach(function(t, e) {
                    this.append(e, t)
                }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                    this.append(e, t[e])
                }, this)
            }
            function i(t) {
                return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (t.bodyUsed = !0)
            }
            function o(t) {
                return new Promise(function(e, n) {
                    t.onload = function() {
                        e(t.result)
                    }
                    ,
                    t.onerror = function() {
                        n(t.error)
                    }
                }
                )
            }
            function s(t) {
                var e = new FileReader;
                return e.readAsArrayBuffer(t),
                o(e)
            }
            function a(t) {
                var e = new FileReader;
                return e.readAsText(t),
                o(e)
            }
            function u() {
                return this.bodyUsed = !1,
                this._initBody = function(t) {
                    if (this._bodyInit = t,
                    "string" == typeof t)
                        this._bodyText = t;
                    else if (d.blob && Blob.prototype.isPrototypeOf(t))
                        this._bodyBlob = t;
                    else if (d.formData && FormData.prototype.isPrototypeOf(t))
                        this._bodyFormData = t;
                    else if (t) {
                        if (!d.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t))
                            throw new Error("unsupported BodyInit type")
                    } else
                        this._bodyText = "";
                    this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type && this.headers.set("content-type", this._bodyBlob.type))
                }
                ,
                d.blob ? (this.blob = function() {
                    var t = i(this);
                    if (t)
                        return t;
                    if (this._bodyBlob)
                        return Promise.resolve(this._bodyBlob);
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([this._bodyText]))
                }
                ,
                this.arrayBuffer = function() {
                    return this.blob().then(s)
                }
                ,
                this.text = function() {
                    var t = i(this);
                    if (t)
                        return t;
                    if (this._bodyBlob)
                        return a(this._bodyBlob);
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText)
                }
                ) : this.text = function() {
                    var t = i(this);
                    return t ? t : Promise.resolve(this._bodyText)
                }
                ,
                d.formData && (this.formData = function() {
                    return this.text().then(h)
                }
                ),
                this.json = function() {
                    return this.text().then(JSON.parse)
                }
                ,
                this
            }
            function c(t) {
                var e = t.toUpperCase();
                return m.indexOf(e) > -1 ? e : t
            }
            function l(t, e) {
                e = e || {};
                var n = e.body;
                if (l.prototype.isPrototypeOf(t)) {
                    if (t.bodyUsed)
                        throw new TypeError("Already read");
                    this.url = t.url,
                    this.credentials = t.credentials,
                    e.headers || (this.headers = new r(t.headers)),
                    this.method = t.method,
                    this.mode = t.mode,
                    n || (n = t._bodyInit,
                    t.bodyUsed = !0)
                } else
                    this.url = t;
                if (this.credentials = e.credentials || this.credentials || "omit",
                (e.headers || !this.headers) && (this.headers = new r(e.headers)),
                this.method = c(e.method || this.method || "GET"),
                this.mode = e.mode || this.mode || null ,
                this.referrer = null ,
                ("GET" === this.method || "HEAD" === this.method) && n)
                    throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(n)
            }
            function h(t) {
                var e = new FormData;
                return t.trim().split("&").forEach(function(t) {
                    if (t) {
                        var n = t.split("=")
                          , r = n.shift().replace(/\+/g, " ")
                          , i = n.join("=").replace(/\+/g, " ");
                        e.append(decodeURIComponent(r), decodeURIComponent(i))
                    }
                }),
                e
            }
            function f(t) {
                var e = new r
                  , n = t.getAllResponseHeaders().trim().split("\n");
                return n.forEach(function(t) {
                    var n = t.trim().split(":")
                      , r = n.shift().trim()
                      , i = n.join(":").trim();
                    e.append(r, i)
                }),
                e
            }
            function p(t, e) {
                e || (e = {}),
                this.type = "default",
                this.status = e.status,
                this.ok = this.status >= 200 && this.status < 300,
                this.statusText = e.statusText,
                this.headers = e.headers instanceof r ? e.headers : new r(e.headers),
                this.url = e.url || "",
                this._initBody(t)
            }
            if (!t.fetch) {
                r.prototype.append = function(t, r) {
                    t = e(t),
                    r = n(r);
                    var i = this.map[t];
                    i || (i = [],
                    this.map[t] = i),
                    i.push(r)
                }
                ,
                r.prototype["delete"] = function(t) {
                    delete this.map[e(t)]
                }
                ,
                r.prototype.get = function(t) {
                    var n = this.map[e(t)];
                    return n ? n[0] : null
                }
                ,
                r.prototype.getAll = function(t) {
                    return this.map[e(t)] || []
                }
                ,
                r.prototype.has = function(t) {
                    return this.map.hasOwnProperty(e(t))
                }
                ,
                r.prototype.set = function(t, r) {
                    this.map[e(t)] = [n(r)]
                }
                ,
                r.prototype.forEach = function(t, e) {
                    Object.getOwnPropertyNames(this.map).forEach(function(n) {
                        this.map[n].forEach(function(r) {
                            t.call(e, r, n, this)
                        }, this)
                    }, this)
                }
                ;
                var d = {
                    blob: "FileReader"in t && "Blob"in t && function() {
                        try {
                            return new Blob,
                            !0
                        } catch (t) {
                            return !1
                        }
                    }(),
                    formData: "FormData"in t,
                    arrayBuffer: "ArrayBuffer"in t
                }
                  , m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                l.prototype.clone = function() {
                    return new l(this)
                }
                ,
                u.call(l.prototype),
                u.call(p.prototype),
                p.prototype.clone = function() {
                    return new p(this._bodyInit,{
                        status: this.status,
                        statusText: this.statusText,
                        headers: new r(this.headers),
                        url: this.url
                    })
                }
                ,
                p.error = function() {
                    var t = new p(null ,{
                        status: 0,
                        statusText: ""
                    });
                    return t.type = "error",
                    t
                }
                ;
                var g = [301, 302, 303, 307, 308];
                p.redirect = function(t, e) {
                    if (-1 === g.indexOf(e))
                        throw new RangeError("Invalid status code");
                    return new p(null ,{
                        status: e,
                        headers: {
                            location: t
                        }
                    })
                }
                ,
                t.Headers = r,
                t.Request = l,
                t.Response = p,
                t.fetch = function(t, e) {
                    return new Promise(function(n, r) {
                        function i() {
                            return "responseURL"in s ? s.responseURL : /^X-Request-URL:/m.test(s.getAllResponseHeaders()) ? s.getResponseHeader("X-Request-URL") : void 0
                        }
                        var o;
                        o = l.prototype.isPrototypeOf(t) && !e ? t : new l(t,e);
                        var s = new XMLHttpRequest;
                        s.onload = function() {
                            var t = 1223 === s.status ? 204 : s.status;
                            if (100 > t || t > 599)
                                return void r(new TypeError("Network request failed"));
                            var e = {
                                status: t,
                                statusText: s.statusText,
                                headers: f(s),
                                url: i()
                            }
                              , o = "response"in s ? s.response : s.responseText;
                            n(new p(o,e))
                        }
                        ,
                        s.onerror = function() {
                            r(new TypeError("Network request failed"))
                        }
                        ,
                        s.open(o.method, o.url, !0),
                        "include" === o.credentials && (s.withCredentials = !0),
                        "responseType"in s && d.blob && (s.responseType = "blob"),
                        o.headers.forEach(function(t, e) {
                            s.setRequestHeader(e, t)
                        }),
                        s.send("undefined" == typeof o._bodyInit ? null : o._bodyInit)
                    }
                    )
                }
                ,
                t.fetch.polyfill = !0
            }
        }("undefined" != typeof self ? self : this)
    }
    , {}],
    36: [function(t, e, n) {
        e.exports = {
            name: "your-web-expert",
            version: "2.0.0",
            main: "index.html",
            description: "Professional web designer, developer, and project manager, based in Kunming, China.",
            keywords: "darryl snow freelance freelancer web designer developer front-end full-stack project manager consultant",
            author: "Darryl Snow <darryl@yourweb.expert>",
            homepage: "https://yourweb.expert",
            dependencies: {
                "body-parser": "^1.14.2",
                "composable-middleware": "^0.3.0",
                compression: "^1.6.0",
                "connect-mongo": "^1.1.0",
                "cookie-parser": "^1.4.1",
                errorhandler: "^1.4.2",
                "es6-promise": "^3.0.2",
                express: "^4.13.3",
                "express-jwt": "^3.3.0",
                "express-session": "^1.13.0",
                "feed-read": "0.0.1",
                jade: "^1.11.0",
                jsonwebtoken: "^5.5.4",
                lodash: "^3.10.1",
                "mailgun-js": "^0.7.7",
                "method-override": "^2.3.5",
                mongoose: "^4.3.5",
                morgan: "^1.6.1",
                oauth: "^0.9.14",
                page: "^1.6.4",
                passport: "^0.3.2",
                "passport-local": "^1.0.0",
                pm2: "^1.0.1",
                request: "^2.67.0",
                scrollmonitor: "^1.0.12",
                smoothscroll: "^0.2.2",
                "snapsvg-cjs": "0.0.3",
                "static-favicon": "^1.0.2",
                tumblr: "^0.4.1",
                "whatwg-fetch": "^0.11.0"
            },
            devDependencies: {
                browserify: "^12.0.1",
                "coffee-react-transform": "^3.3.0",
                "coffee-reactify": "^4.0.0",
                "coffee-script": "^1.8.0",
                coffeeify: "^0.7.0",
                "coffeelint-cjsx": "^2.0.2",
                "connect-livereload": "^0.5.0",
                critical: "^0.6.0",
                express: "^4.10.6",
                gulp: "^3.8.10",
                "gulp-autoprefixer": "^1.0.1",
                "gulp-clean": "^0.3.1",
                "gulp-coffeelint-cjsx": "0.0.3",
                "gulp-cssnano": "^2.1.1",
                "gulp-dss": "^0.1.0",
                "gulp-filter": "^3.0.1",
                "gulp-header": "^1.2.2",
                "gulp-htmlmin": "^1.2.0",
                "gulp-if": "^2.0.0",
                "gulp-imagemin": "^1.2.1",
                "gulp-inline-source": "^2.1.0",
                "gulp-jade": "^0.9.0",
                "gulp-livereload": "^2.1.1",
                "gulp-load-plugins": "^0.7.1",
                "gulp-nodemon": "^2.0.6",
                "gulp-plumber": "^0.6.6",
                "gulp-rename": "^1.2.0",
                "gulp-rev": "^6.0.1",
                "gulp-rev-replace": "^0.4.3",
                "gulp-size": "^1.1.0",
                "gulp-sourcemaps": "^1.6.0",
                "gulp-stylus": "^1.3.4",
                "gulp-uglify": "^1.0.1",
                "gulp-uncss": "^1.0.4",
                "gulp-useref": "^3.0.7",
                "gulp-util": "^3.0.7",
                "gulp-watch": "^4.2.4",
                "jade-inheritance": "^0.2.1",
                "jasmine-core": "^2.3.4",
                "jasmine-node": "^1.14.5",
                karma: "^0.13.15",
                "karma-browserify": "^4.4.0",
                "karma-jasmine": "^0.3.6",
                "karma-jasmine-jquery": "^0.1.1",
                "karma-notify-reporter": "^0.1.1",
                "karma-phantomjs-launcher": "^0.2.1",
                "karma-phantomjs-shim": "^1.1.2",
                "node-notifier": "^4.3.1",
                open: "0.0.5",
                path: "^0.4.9",
                phantomjs: "^1.9.18",
                psi: "^2.0.2",
                request: "^2.69.0",
                "require-directory": "^2.1.1",
                "run-sequence": "^1.1.5",
                "tiny-lr": "^0.1.4",
                "vinyl-buffer": "^1.0.0",
                "vinyl-source-stream": "^1.1.0"
            },
            engines: {
                node: ">=0.10.0"
            },
            scripts: {
                build: "gulp prod && gulp prod-optimise",
                minify: "html-minifier --remove-comments --remove-comments-from-cdata --collapse-whitespace --conservative-collapse --collapse-boolean-attributes --use-short-doctype --remove-empty-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-optional-tags --keep-closing-slash  --case-sensitive --minify-js --minify-css --output ./client/public/index.html ./client/public/index.html && html-minifier --remove-comments --remove-comments-from-cdata --collapse-whitespace --conservative-collapse --collapse-boolean-attributes --use-short-doctype --remove-empty-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-optional-tags --keep-closing-slash  --case-sensitive --minify-js --minify-css --output ./client/public/about.html ./client/public/about.html && html-minifier --remove-comments --remove-comments-from-cdata --collapse-whitespace --conservative-collapse --collapse-boolean-attributes --use-short-doctype --remove-empty-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-optional-tags --keep-closing-slash  --case-sensitive --minify-js --minify-css --output ./client/public/contract.html ./client/public/contract.html && html-minifier --remove-comments --remove-comments-from-cdata --collapse-whitespace --conservative-collapse --collapse-boolean-attributes --use-short-doctype --remove-empty-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-optional-tags --keep-closing-slash  --case-sensitive --minify-js --minify-css --output ./client/public/amp.html ./client/public/amp.html",
                "start:dev": "npm run start & gulp dev",
                start: "pm2 start server/app.coffee --name yourweb.expert",
                "test:fe": "gulp test",
                "test:be": "./node_modules/jasmine-node/bin/jasmine-node --coffee server/spec --captureExceptions",
                test: "npm run test:fe && npm run test:be"
            },
            "private": !0
        }
    }
    , {}]
}, {}, [19]);
