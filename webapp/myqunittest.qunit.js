sap.ui.define([
	"Quickstart/App",
	"sap/ui/thirdparty/jquery",
	"sap/ui/qunit/utils/createAndAppendDiv"
], function (App) {
	"use strict";

	QUnit.module("Quickstart.App view tests", {
		beforeEach: function () {
			// Create a container for the view
			this.oContainer = new sap.ui.core.HTML("testContainer", {
				content: '<div id="content"></div>'
			}).placeAt("qunit-fixture");

			// Create the view
			this.oView = sap.ui.xmlview({
				viewContent: '<mvc:View controllerName="Quickstart.App" displayBlock="true" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:tnt="sap.tnt"><App id="app"><Page title="My App"><Button id="myButton" icon="sap-icon://sap-ui5" text="Go!" press=".onPress" type="Emphasized" class="sapUiSmallMargin"/></Page></App></mvc:View>',
				controller: new App()
			});
			this.oView.placeAt("content");

			// Initialize the view
			sap.ui.getCore().applyChanges();
		},

		afterEach: function () {
			// Clean up
			this.oView.destroy();
			this.oContainer.destroy();
		}
	});

	QUnit.test("Button press event is triggered", function (assert) {
		// Arrange
		var done = assert.async();
		var oButton = this.oView.byId("myButton");

		// Act
		oButton.attachPress(function () {
			// Assert
			assert.ok(true, "Button press event was triggered");
			done();
		});

		// Simulate a button click
		oButton.firePress();
	});
});
