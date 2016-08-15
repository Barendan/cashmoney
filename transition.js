function beginWordAnimations() {
        function beginTextAnimations() {
            beginTitles(),
            setTimeout(beginTexts, 500),
            setTimeout(beginLines, 750)
        }
        function beginTitles() {
            function animateTitleWord(tWord, index) {
                var barW = tWord.querySelector(".load_animate1")
                  , barC = tWord.querySelector(".load_animate2")
                  , texts = tWord.querySelectorAll(".text")
                  , i = 0
                  , len = texts.length;
                setTimeout(function() {
                    perverter.addClass(barW, "in"),
                    setTimeout(function() {
                        perverter.addClass(barC, "in"),
                        setTimeout(function() {
                            for (barW.style.display = "none",
                            i; len > i; i++)
                                texts[i].style.opacity = 1,
                                randomizeLettersOfWord(texts[i]);
                            perverter.removeClass(barC, "in"),
                            perverter.addClass(barC, "out")
                        }, 250)
                    }, 100)
                }, 500 + 250 * index)
            }
            var line, texts = sectionBase.querySelectorAll("#titlepage [data-text=title]"), i = 0, len = texts.length, sep = new Separate;
            for (i = 0; len > i; i++) {
                line = texts[i];
                var txtsLine = line.querySelectorAll(".text")
                  , j = 0
                  , lenJ = txtsLine.length;
                for (j; lenJ > j; j++)
                    perverter.addClass(txtsLine[j], "effect_glitch"),
                    txtsLine[j].setAttribute("data-text", txtsLine[j].innerHTML),
                    sep.run(txtsLine[j], i);
                animateTitleWord(line, i)
            }
            if (hlSound) {
                var snd;
                "dracones" == sectionBase.getAttribute("id") ? snd = lineSound2 : "coffee" == sectionBase.getAttribute("id") || "fightingtyranny" == sectionBase.getAttribute("id") ? snd = lineSound3 : "intro" != sectionBase.getAttribute("id") && (snd = lineSound1),
                snd && setTimeout(function() {
                    snd.play()
                }, 900)
            }
        }
        function randomizeLettersOfWord(word) {
            function LetterAnimation(letter) {
                function runAnimation() {
                    then = Date.now(),
                    startTime = then,
                    renderAnimation(),
                    setTimeout(destroyAnimation, parseInt(letter.getAttribute("data-time")))
                }
                function renderAnimation() {
                    animationInterval = requestAnimationFrame(renderAnimation),
                    now = Date.now(),
                    elapsed = now - then,
                    elapsed > timeInterval && (then = now - elapsed % timeInterval,
                    changeLetter())
                }
                function changeLetter() {
                    letter.innerHTML = getLetter()
                }
                function destroyAnimation() {
                    cancelAnimationFrame(animationInterval),
                    letter.innerHTML = letter.getAttribute("data-letter")
                }
                var animationInterval, startTime, now, then, elapsed, timeInterval = 20;
                this.run = runAnimation,
                this.destroy = destroyAnimation
            }
            function getLetter() {
                lettersToRandom.length || (lettersToRandom = baseRandomLetters.split(""));
                var index = parseInt(Math.random() * lettersToRandom.length)
                  , letter = lettersToRandom[index];
                return lettersToRandom.splice(index, 1),
                letter
            }
            var lettersToRandom = baseRandomLetters.split("")
              , letters = word.querySelectorAll("span.text_letter")
              , totalAnimationTime = 450
              , i = 0
              , len = letters.length
              , portionAnimationTime = totalAnimationTime / len - 1;
            for (i; len > i; i++) {
                letters[i].setAttribute("data-letter", letters[i].innerHTML),
                letters[i].setAttribute("data-time", totalAnimationTime - portionAnimationTime * i);
                var lA = new LetterAnimation(letters[i]);
                lA.run()
            }
        }
        function beginTexts() {
            var texts = sectionBase.querySelectorAll("[data-text=little]")
              , i = 0
              , len = texts.length
              , sep = new Separate;
            for (i = 0; len > i; i++) {
                var txtsToSplit = texts[i].querySelectorAll(".text")
                  , j = 0
                  , len2 = txtsToSplit.length;
                for (j; len2 > j; j++)
                    sep.run(txtsToSplit[j], i)
            }
            setTimeout(progressiveShowLetters, 1500)
        }
        function progressiveShowLetters() {
            function showWord(word, index) {
                for (var wds = word.querySelectorAll(".text"), c = 0; c < wds.length; c++)
                    wds[c].style.opacity = 1;
                setTimeout(function() {
                    var letters = word.querySelectorAll(".text_letter")
                      , i = 0
                      , len = letters.length
                      , time = 1e3 / len;
                    for (i; len > i; i++)
                        showLetter(letters[i], i, time)
                }, 400 * index)
            }
            function showLetter(el, index, time) {
                setTimeout(function() {
                    el.className += " in"
                }, index * time)
            }
            var texts = sectionBase.querySelectorAll("[data-text=little]")
              , listWords = []
              , i = 0
              , len = texts.length;
            for (i; len > i; i++)
                listWords[i] = texts[i];
            for (var count = 0; listWords.length; ) {
                var index = parseInt(Math.random() * listWords.length);
                showWord(listWords[index], count),
                listWords.splice(index, 1),
                count++
            }
        }
        var baseRandomLetters = "ABCDEFGHIJKLMNOPQRSTUVWYXZ0123456789!@#$%&*";
        lineSound1 = document.createElement("audio"),
        lineSound1.setAttribute("id", "audio-line1"),
        document.body.appendChild(lineSound1),
        lineSound2 = document.createElement("audio"),
        lineSound2.setAttribute("id", "audio-line2"),
        document.body.appendChild(lineSound2),
        lineSound3 = document.createElement("audio"),
        lineSound3.setAttribute("id", "audio-line3"),
        document.body.appendChild(lineSound3),
        lineSound1.addEventListener("loadeddata", function(e) {
            Modernizr.audio.mp3 ? (lineSound2.setAttribute("type", "audio/mp3"),
            lineSound2.setAttribute("src", "/content/sounds/audio_linhas_2.mp3")) : Modernizr.audio.ogg && (lineSound2.setAttribute("type", "audio/ogg"),
            lineSound2.setAttribute("src", "/content/sounds/audio_linhas_2.ogg"))
        }),
        lineSound2.addEventListener("loadeddata", function(e) {
            Modernizr.audio.mp3 ? (lineSound3.setAttribute("type", "audio/mp3"),
            lineSound3.setAttribute("src", "/content/sounds/audio_linhas_3.mp3")) : Modernizr.audio.ogg && (lineSound3.setAttribute("type", "audio/ogg"),
            lineSound3.setAttribute("src", "/content/sounds/audio_linhas_3.ogg"))
        }),
        lineSound3.addEventListener("loadeddata", function(e) {
            hlSound = !0,
            beginTextAnimations()
        }),
        Modernizr.audio && !isTouchDevice ? Modernizr.audio.mp3 ? (lineSound1.setAttribute("type", "audio/mp3"),
        lineSound1.setAttribute("src", "/content/sounds/audio_linhas_1.mp3")) : Modernizr.audio.ogg ? (lineSound1.setAttribute("type", "audio/ogg"),
        lineSound1.setAttribute("src", "/content/sounds/audio_linhas_1.ogg")) : beginTextAnimations() : beginTextAnimations()
    }
    function beginLines() {
        function drawLineCVS(lineP, lineI) {
            var line1Cvs = document.createElement("canvas");
            line1Cvs.setAttribute("width", lineP.offsetWidth),
            line1Cvs.setAttribute("height", lineP.offsetHeight),
            line1Cvs.style.position = "absolute",
            line1Cvs.style.top = "0px",
            line1Cvs.style.left = "0px";
            var style = window.getComputedStyle(lineI, null )
              , ctx = line1Cvs.getContext("2d");
            ctx.strokeStyle = style.backgroundColor,
            ctx.beginPath(),
            ctx.moveTo(.5, .5),
            ctx.lineWidth = lineP.offsetHeight,
            ctx.lineTo(lineP.offsetWidth, 0),
            ctx.stroke(),
            lineI.appendChild(line1Cvs),
            lineI.style.backgroundColor = "transparent"
        }
        function doLinesAnimation(barW, barC, index) {
            setTimeout(function() {
                perverter.addClass(barW, "in"),
                setTimeout(function() {
                    perverter.addClass(barC, "in"),
                    setTimeout(function() {
                        barW.querySelector("canvas").style.display = "none"
                    }, 500)
                }, 450)
            }, 500 + 250 * index)
        }
        for (var linesO = sectionBase.querySelectorAll(".element:not([data-text=little])"), lines = [], c = 0; c < linesO.length; c++)
            1 == linesO[c].className.split("since").length && lines.push(linesO[c]);
        var line, i = 0;
        if (document.getElementById("titlepage")) {
            var lineTitle = document.getElementById("titlepage").querySelector(".wrap .line.line1");
            lineTitle && setTimeout(function() {
                lineTitle.className += " in"
            }, 1250)
        }
        for (; lines.length; ) {
            var index = parseInt(Math.random() * lines.length);
            line = lines[index],
            lines.splice(index, 1);
            var line1 = document.createElement("div");
            line1.className = "load_animate1_cvs";
            var line2 = document.createElement("div");
            line2.className = "load_animate2_cvs",
            line.appendChild(line1),
            line.appendChild(line2),
            drawLineCVS(line, line1),
            drawLineCVS(line, line2),
            doLinesAnimation(line1, line2, i),
            i++
        }
    }
    function configMenu() {
        function onLinkClick(event) {
            perverter.removeClass(menu, "open"),
            clearTimeout(timeoutAnimation),
            clearTimeout(timeOutLoopAnimation)
        }
        function beginAnimation() {
            logoCvs = menu.querySelector("#logo_menu .logo_menu_cvs"),
            logoAnimation = new SpriteAnimator,
            logoAnimation.init(logoCvs),
            perverter.preLoadImgs(["/content/images/logo/logo_menu.png"], function(imgs) {
                image = imgs[0],
                image.setAttribute("data-path", image.getAttribute("src")),
                logoAnimation.drawFrame([image], 0, 17, 257, 288)
            })
        