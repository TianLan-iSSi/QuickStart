/*global QUnit */
sap.ui.define(["sap/m/Button", "sap/ui/qunit/QUnitUtils", "sap/ui/qunit/utils/createAndAppendDiv"], function(Button, QUnitUtils, createAndAppendDiv) {
	"use strict";

	// create content div
	createAndAppendDiv("myContent");

	/* Create e.g. an SAPUI5 control which you need for your tests
	   Alternatively you can do this also in the `beforeEach` method of a module
	*/
	var oButton = new Button("myButton", {text: "Click me"});
	//...
	oButton.placeAt("myContent");


	/* The QUnit processing starts automatically when the page is
	   loaded. If you want to delay the start because of some
	   additional preparation work you can use the following utility
	   function:
	*/
	QUnitUtils.delayTestStart(5000);

	/* The module call can be used to categorize your test functions.
	   In addition it is possible to define actions which are processed
	   during `beforeEach` and `afterEach`.
	*/
	QUnit.module("Module A");

	/* Example for a non-asynchronous test function:
	   The first parameter is the name of the test,
	   the second (optional) parameter is the number of expected assertions in the test,
	   the third parameter is the test function to call when the tests runs.
	*/
	QUnit.test("Test 1", 3, function(assert) { 
		assert.ok( true, "this test is fine" );
		var value = "hello1";
		assert.equal( value, "hello1", "We expect value to be 'hello1'" ); 

		/* You can also do some actions between the assertions,
		   like triggering a keydown event with Enter key on the
		   Dom element with ID 'myButton' using the utilities.
		   Note: The utility function simulates a keyboard event
		         using 'jQuery.trigger'. This is not a 'real'
		         event which comes from the browser and there might
		         be differences you must be aware of: When the
		         user presses the Enter key on a button several
		         events are fired by the browser like keydown, keyup,
		         click, .... The function below ONLY simulates a
		         keydown!
		*/
		QUnitUtils.triggerKeydown("myButton", "ENTER");
		assert.ok( true, "another test after the action" );
	});

	/* Modules have a second, optional "lifecycle" parameter. The life cycle object can 
	   have two methods - `beforeEach` and `afterEach`. Both methods are called for each test
	   of the module. It is best practice to use those life cycle methods to have standelone
	   tests that do not have dependencies on other tests.
	*/
	QUnit.module("Module B", {
		beforeEach: function() {
			// Code needed for the tests of this module
			// this.foo = new Bar();
		},

		afterEach: function() {
			// Cleanup here
			// this.foo = null;
		}
	});

	/* Example for an asynchronous test function: */

	QUnit.test("Test 2", 3, function(assert) {
		var done = assert.async(); 

		/* Instead of using the second parameter in the test definition you can define the number expected assertions in the function body. This is handy, when you write tests with different outcome. */
		// assert.expect(3);

		/* First you start with tests in the normal flow */
		assert.ok(true, "this test is fine");
		setTimeout(function() {
			assert.ok(true, "this test is executed asynchronously"); 

			/* Do the asynchrounos tests and give QUnit the sign to go on with the next test function via 'done' when the processing of the current one is completed */
			done();
		}, 1000); 

		/* Do the things which needs a test delay, e.g. press a button which starts a backend call */
		QUnitUtils.triggerKeydown("myButton", "ENTER");
		assert.ok(true, "this test is not executed asynchronously");
	});