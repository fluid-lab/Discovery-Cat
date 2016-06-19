(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.houseEntry", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.houseEntry.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.houseEntry.create",
                args: "{that}"
            },
            update: {
                funcName: "demo.state.houseEntry.update",
                args: "{that}"
            },
            catAndRatWalk: {
                funcName: "demo.state.houseEntry.catAndRatWalk",
                args: "{that}"
            },
            ratMessage: {
                funcName: "demo.state.houseEntry.ratMessage",
                args: "{that}"
            },
            nextScreen: {
                funcName: "demo.state.houseEntry.nextScreen",
                args: "{that}"
            }
        }
    });

    // Runs at t = 0ms
     demo.state.houseEntry.ratMessage = function(that) {
        that.messageBox = that.add.sprite(810, 250, "messageBoxlp", 0);
        that.messageBox.scale.setTo(1.2, 1.3);
        that.messageText = that.add.text(840, 300,
                            "  Come with me to the rat house\nhe has taken your yarn ball there");
        that.messageBox.alpha = 0;
        that.messageText.alpha = 0;
        that.add.tween(that.messageBox).to({ alpha: 1 },
                                            2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.messageText).to({ alpha: 1 },
                                            2000, Phaser.Easing.Sinusoidal.InOut, true);
    };

    // Runs at t = 8000ms
    demo.state.houseEntry.catAndRatWalk = function(that) {
        that.cat.animations.play("walk");
        that.rat.animations.play("walk");
        that.add.tween(that.cat).to({ x: 1300, y:150 }, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        that.add.tween(that.rat).to({ x: 1300, y:400 }, 2000, Phaser.Easing.Sinusoidal.InOut, true);
        that.messageText.alpha = 0;
        that.messageBox.alpha = 0;
    };

    // Runs at t = 14000ms
    demo.state.houseEntry.nextScreen = function(that) {
        that.state.start("house");
    };

    // Phaser functions
    demo.state.houseEntry.preload = function(that) {

    };

    demo.state.houseEntry.create = function(that) {
        that.add.sprite(0, 0, "backgroundlp");

        that.cat = that.add.sprite(500, 150, "catMovelp", 1);
        that.cat.scale.setTo(0.8, 0.8);
        that.cat.animations.add("walk", [0, 1, 2, 3], 5, true);

        that.rat = that.add.sprite(1050, 400, "buddiesMovelp", 0);
        // instead of 0 below we will use the model property of count to use the same cat
        // that was actually selected
        that.rat.addChild(that.add.sprite(55, -10, "ratAccessorieslp", 0));
        that.rat.scale.setTo(0.5, 0.5);
        that.rat.animations.add("walk", [0, 1, 2, 3], 5, true);

        // time events
        that.time.events.add(0, that.ratMessage, that);
        that.time.events.add(8000, that.catAndRatWalk, that);
        that.time.events.add(14000, that.nextScreen, that);

    };

    demo.state.houseEntry.update = function(that) {

    };

})(jQuery, fluid);
