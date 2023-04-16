self["webpackHotUpdateelectron_react_typescript_webpack_2023"]("app_window",{

/***/ "./node_modules/clsx/dist/clsx.m.js":
/*!******************************************!*\
  !*** ./node_modules/clsx/dist/clsx.m.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clsx": () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/fast-memoize/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/fast-memoize/src/index.js ***!
  \************************************************/
/***/ ((module) => {

//
// Main
//

function memoize (fn, options) {
  var cache = options && options.cache
    ? options.cache
    : cacheDefault

  var serializer = options && options.serializer
    ? options.serializer
    : serializerDefault

  var strategy = options && options.strategy
    ? options.strategy
    : strategyDefault

  return strategy(fn, {
    cache: cache,
    serializer: serializer
  })
}

//
// Strategy
//

function isPrimitive (value) {
  return value == null || typeof value === 'number' || typeof value === 'boolean' // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic (fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg)

  var computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = fn.call(this, arg)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function variadic (fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3)
  var cacheKey = serializer(args)

  var computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = fn.apply(this, args)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function assemble (fn, context, strategy, cache, serialize) {
  return strategy.bind(
    context,
    fn,
    cache,
    serialize
  )
}

function strategyDefault (fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyVariadic (fn, options) {
  var strategy = variadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyMonadic (fn, options) {
  var strategy = monadic

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

//
// Serializer
//

function serializerDefault () {
  return JSON.stringify(arguments)
}

//
// Cache
//

function ObjectWithoutPrototypeCache () {
  this.cache = Object.create(null)
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return (key in this.cache)
}

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key]
}

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value
}

var cacheDefault = {
  create: function create () {
    return new ObjectWithoutPrototypeCache()
  }
}

//
// API
//

module.exports = memoize
module.exports.strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
}


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/re-resizable/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/re-resizable/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resizable": () => (/* binding */ Resizable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resizer */ "./node_modules/re-resizable/lib/resizer.js");
/* harmony import */ var fast_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-memoize */ "./node_modules/fast-memoize/src/index.js");
/* harmony import */ var fast_memoize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fast_memoize__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var DEFAULT_SIZE = {
    width: 'auto',
    height: 'auto',
};
var clamp = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (n, min, max) { return Math.max(Math.min(n, max), min); });
var snap = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (n, size) { return Math.round(n / size) * size; });
var hasDirection = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (dir, target) {
    return new RegExp(dir, 'i').test(target);
});
// INFO: In case of window is a Proxy and does not porxy Events correctly, use isTouchEvent & isMouseEvent to distinguish event type instead of `instanceof`.
var isTouchEvent = function (event) {
    return Boolean(event.touches && event.touches.length);
};
var isMouseEvent = function (event) {
    return Boolean((event.clientX || event.clientX === 0) &&
        (event.clientY || event.clientY === 0));
};
var findClosestSnap = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (n, snapArray, snapGap) {
    if (snapGap === void 0) { snapGap = 0; }
    var closestGapIndex = snapArray.reduce(function (prev, curr, index) { return (Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev); }, 0);
    var gap = Math.abs(snapArray[closestGapIndex] - n);
    return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
});
var endsWith = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (str, searchStr) {
    return str.substr(str.length - searchStr.length, searchStr.length) === searchStr;
});
var getStringSize = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (n) {
    n = n.toString();
    if (n === 'auto') {
        return n;
    }
    if (endsWith(n, 'px')) {
        return n;
    }
    if (endsWith(n, '%')) {
        return n;
    }
    if (endsWith(n, 'vh')) {
        return n;
    }
    if (endsWith(n, 'vw')) {
        return n;
    }
    if (endsWith(n, 'vmax')) {
        return n;
    }
    if (endsWith(n, 'vmin')) {
        return n;
    }
    return n + "px";
});
var getPixelSize = function (size, parentSize, innerWidth, innerHeight) {
    if (size && typeof size === 'string') {
        if (endsWith(size, 'px')) {
            return Number(size.replace('px', ''));
        }
        if (endsWith(size, '%')) {
            var ratio = Number(size.replace('%', '')) / 100;
            return parentSize * ratio;
        }
        if (endsWith(size, 'vw')) {
            var ratio = Number(size.replace('vw', '')) / 100;
            return innerWidth * ratio;
        }
        if (endsWith(size, 'vh')) {
            var ratio = Number(size.replace('vh', '')) / 100;
            return innerHeight * ratio;
        }
    }
    return size;
};
var calculateNewMax = fast_memoize__WEBPACK_IMPORTED_MODULE_2___default()(function (parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) {
    maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
    maxHeight = getPixelSize(maxHeight, parentSize.height, innerWidth, innerHeight);
    minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
    minHeight = getPixelSize(minHeight, parentSize.height, innerWidth, innerHeight);
    return {
        maxWidth: typeof maxWidth === 'undefined' ? undefined : Number(maxWidth),
        maxHeight: typeof maxHeight === 'undefined' ? undefined : Number(maxHeight),
        minWidth: typeof minWidth === 'undefined' ? undefined : Number(minWidth),
        minHeight: typeof minHeight === 'undefined' ? undefined : Number(minHeight),
    };
});
var definedProps = [
    'as',
    'style',
    'className',
    'grid',
    'snap',
    'bounds',
    'boundsByDirection',
    'size',
    'defaultSize',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'lockAspectRatio',
    'lockAspectRatioExtraWidth',
    'lockAspectRatioExtraHeight',
    'enable',
    'handleStyles',
    'handleClasses',
    'handleWrapperStyle',
    'handleWrapperClass',
    'children',
    'onResizeStart',
    'onResize',
    'onResizeStop',
    'handleComponent',
    'scale',
    'resizeRatio',
    'snapGap',
];
// HACK: This class is used to calculate % size.
var baseClassName = '__resizable_base__';
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable(props) {
        var _this = _super.call(this, props) || this;
        _this.ratio = 1;
        _this.resizable = null;
        // For parent boundary
        _this.parentLeft = 0;
        _this.parentTop = 0;
        // For boundary
        _this.resizableLeft = 0;
        _this.resizableRight = 0;
        _this.resizableTop = 0;
        _this.resizableBottom = 0;
        // For target boundary
        _this.targetLeft = 0;
        _this.targetTop = 0;
        _this.appendBase = function () {
            if (!_this.resizable || !_this.window) {
                return null;
            }
            var parent = _this.parentNode;
            if (!parent) {
                return null;
            }
            var element = _this.window.document.createElement('div');
            element.style.width = '100%';
            element.style.height = '100%';
            element.style.position = 'absolute';
            element.style.transform = 'scale(0, 0)';
            element.style.left = '0';
            element.style.flex = '0 0 100%';
            if (element.classList) {
                element.classList.add(baseClassName);
            }
            else {
                element.className += baseClassName;
            }
            parent.appendChild(element);
            return element;
        };
        _this.removeBase = function (base) {
            var parent = _this.parentNode;
            if (!parent) {
                return;
            }
            parent.removeChild(base);
        };
        _this.ref = function (c) {
            if (c) {
                _this.resizable = c;
            }
        };
        _this.state = {
            isResizing: false,
            width: typeof (_this.propsSize && _this.propsSize.width) === 'undefined'
                ? 'auto'
                : _this.propsSize && _this.propsSize.width,
            height: typeof (_this.propsSize && _this.propsSize.height) === 'undefined'
                ? 'auto'
                : _this.propsSize && _this.propsSize.height,
            direction: 'right',
            original: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            backgroundStyle: {
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)',
                cursor: 'auto',
                opacity: 0,
                position: 'fixed',
                zIndex: 9999,
                top: '0',
                left: '0',
                bottom: '0',
                right: '0',
            },
            flexBasis: undefined,
        };
        _this.onResizeStart = _this.onResizeStart.bind(_this);
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);
        return _this;
    }
    Object.defineProperty(Resizable.prototype, "parentNode", {
        get: function () {
            if (!this.resizable) {
                return null;
            }
            return this.resizable.parentNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resizable.prototype, "window", {
        get: function () {
            if (!this.resizable) {
                return null;
            }
            if (!this.resizable.ownerDocument) {
                return null;
            }
            return this.resizable.ownerDocument.defaultView;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resizable.prototype, "propsSize", {
        get: function () {
            return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resizable.prototype, "size", {
        get: function () {
            var width = 0;
            var height = 0;
            if (this.resizable && this.window) {
                var orgWidth = this.resizable.offsetWidth;
                var orgHeight = this.resizable.offsetHeight;
                // HACK: Set position `relative` to get parent size.
                //       This is because when re-resizable set `absolute`, I can not get base width correctly.
                var orgPosition = this.resizable.style.position;
                if (orgPosition !== 'relative') {
                    this.resizable.style.position = 'relative';
                }
                // INFO: Use original width or height if set auto.
                width = this.resizable.style.width !== 'auto' ? this.resizable.offsetWidth : orgWidth;
                height = this.resizable.style.height !== 'auto' ? this.resizable.offsetHeight : orgHeight;
                // Restore original position
                this.resizable.style.position = orgPosition;
            }
            return { width: width, height: height };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resizable.prototype, "sizeStyle", {
        get: function () {
            var _this = this;
            var size = this.props.size;
            var getSize = function (key) {
                if (typeof _this.state[key] === 'undefined' || _this.state[key] === 'auto') {
                    return 'auto';
                }
                if (_this.propsSize && _this.propsSize[key] && endsWith(_this.propsSize[key].toString(), '%')) {
                    if (endsWith(_this.state[key].toString(), '%')) {
                        return _this.state[key].toString();
                    }
                    var parentSize = _this.getParentSize();
                    var value = Number(_this.state[key].toString().replace('px', ''));
                    var percent = (value / parentSize[key]) * 100;
                    return percent + "%";
                }
                return getStringSize(_this.state[key]);
            };
            var width = size && typeof size.width !== 'undefined' && !this.state.isResizing
                ? getStringSize(size.width)
                : getSize('width');
            var height = size && typeof size.height !== 'undefined' && !this.state.isResizing
                ? getStringSize(size.height)
                : getSize('height');
            return { width: width, height: height };
        },
        enumerable: false,
        configurable: true
    });
    Resizable.prototype.getParentSize = function () {
        if (!this.parentNode) {
            if (!this.window) {
                return { width: 0, height: 0 };
            }
            return { width: this.window.innerWidth, height: this.window.innerHeight };
        }
        var base = this.appendBase();
        if (!base) {
            return { width: 0, height: 0 };
        }
        // INFO: To calculate parent width with flex layout
        var wrapChanged = false;
        var wrap = this.parentNode.style.flexWrap;
        if (wrap !== 'wrap') {
            wrapChanged = true;
            this.parentNode.style.flexWrap = 'wrap';
            // HACK: Use relative to get parent padding size
        }
        base.style.position = 'relative';
        base.style.minWidth = '100%';
        base.style.minHeight = '100%';
        var size = {
            width: base.offsetWidth,
            height: base.offsetHeight,
        };
        if (wrapChanged) {
            this.parentNode.style.flexWrap = wrap;
        }
        this.removeBase(base);
        return size;
    };
    Resizable.prototype.bindEvents = function () {
        if (this.window) {
            this.window.addEventListener('mouseup', this.onMouseUp);
            this.window.addEventListener('mousemove', this.onMouseMove);
            this.window.addEventListener('mouseleave', this.onMouseUp);
            this.window.addEventListener('touchmove', this.onMouseMove, {
                capture: true,
                passive: false,
            });
            this.window.addEventListener('touchend', this.onMouseUp);
        }
    };
    Resizable.prototype.unbindEvents = function () {
        if (this.window) {
            this.window.removeEventListener('mouseup', this.onMouseUp);
            this.window.removeEventListener('mousemove', this.onMouseMove);
            this.window.removeEventListener('mouseleave', this.onMouseUp);
            this.window.removeEventListener('touchmove', this.onMouseMove, true);
            this.window.removeEventListener('touchend', this.onMouseUp);
        }
    };
    Resizable.prototype.componentDidMount = function () {
        if (!this.resizable || !this.window) {
            return;
        }
        var computedStyle = this.window.getComputedStyle(this.resizable);
        this.setState({
            width: this.state.width || this.size.width,
            height: this.state.height || this.size.height,
            flexBasis: computedStyle.flexBasis !== 'auto' ? computedStyle.flexBasis : undefined,
        });
    };
    Resizable.prototype.componentWillUnmount = function () {
        if (this.window) {
            this.unbindEvents();
        }
    };
    Resizable.prototype.createSizeForCssProperty = function (newSize, kind) {
        var propsSize = this.propsSize && this.propsSize[kind];
        return this.state[kind] === 'auto' &&
            this.state.original[kind] === newSize &&
            (typeof propsSize === 'undefined' || propsSize === 'auto')
            ? 'auto'
            : newSize;
    };
    Resizable.prototype.calculateNewMaxFromBoundary = function (maxWidth, maxHeight) {
        var boundsByDirection = this.props.boundsByDirection;
        var direction = this.state.direction;
        var widthByDirection = boundsByDirection && hasDirection('left', direction);
        var heightByDirection = boundsByDirection && hasDirection('top', direction);
        var boundWidth;
        var boundHeight;
        if (this.props.bounds === 'parent') {
            var parent_1 = this.parentNode;
            if (parent_1) {
                boundWidth = widthByDirection
                    ? this.resizableRight - this.parentLeft
                    : parent_1.offsetWidth + (this.parentLeft - this.resizableLeft);
                boundHeight = heightByDirection
                    ? this.resizableBottom - this.parentTop
                    : parent_1.offsetHeight + (this.parentTop - this.resizableTop);
            }
        }
        else if (this.props.bounds === 'window') {
            if (this.window) {
                boundWidth = widthByDirection ? this.resizableRight : this.window.innerWidth - this.resizableLeft;
                boundHeight = heightByDirection ? this.resizableBottom : this.window.innerHeight - this.resizableTop;
            }
        }
        else if (this.props.bounds) {
            boundWidth = widthByDirection
                ? this.resizableRight - this.targetLeft
                : this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
            boundHeight = heightByDirection
                ? this.resizableBottom - this.targetTop
                : this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
        }
        if (boundWidth && Number.isFinite(boundWidth)) {
            maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
        }
        if (boundHeight && Number.isFinite(boundHeight)) {
            maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
        }
        return { maxWidth: maxWidth, maxHeight: maxHeight };
    };
    Resizable.prototype.calculateNewSizeFromDirection = function (clientX, clientY) {
        var scale = this.props.scale || 1;
        var resizeRatio = this.props.resizeRatio || 1;
        var _a = this.state, direction = _a.direction, original = _a.original;
        var _b = this.props, lockAspectRatio = _b.lockAspectRatio, lockAspectRatioExtraHeight = _b.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _b.lockAspectRatioExtraWidth;
        var newWidth = original.width;
        var newHeight = original.height;
        var extraHeight = lockAspectRatioExtraHeight || 0;
        var extraWidth = lockAspectRatioExtraWidth || 0;
        if (hasDirection('right', direction)) {
            newWidth = original.width + ((clientX - original.x) * resizeRatio) / scale;
            if (lockAspectRatio) {
                newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
            }
        }
        if (hasDirection('left', direction)) {
            newWidth = original.width - ((clientX - original.x) * resizeRatio) / scale;
            if (lockAspectRatio) {
                newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
            }
        }
        if (hasDirection('bottom', direction)) {
            newHeight = original.height + ((clientY - original.y) * resizeRatio) / scale;
            if (lockAspectRatio) {
                newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
            }
        }
        if (hasDirection('top', direction)) {
            newHeight = original.height - ((clientY - original.y) * resizeRatio) / scale;
            if (lockAspectRatio) {
                newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
            }
        }
        return { newWidth: newWidth, newHeight: newHeight };
    };
    Resizable.prototype.calculateNewSizeFromAspectRatio = function (newWidth, newHeight, max, min) {
        var _a = this.props, lockAspectRatio = _a.lockAspectRatio, lockAspectRatioExtraHeight = _a.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _a.lockAspectRatioExtraWidth;
        var computedMinWidth = typeof min.width === 'undefined' ? 10 : min.width;
        var computedMaxWidth = typeof max.width === 'undefined' || max.width < 0 ? newWidth : max.width;
        var computedMinHeight = typeof min.height === 'undefined' ? 10 : min.height;
        var computedMaxHeight = typeof max.height === 'undefined' || max.height < 0 ? newHeight : max.height;
        var extraHeight = lockAspectRatioExtraHeight || 0;
        var extraWidth = lockAspectRatioExtraWidth || 0;
        if (lockAspectRatio) {
            var extraMinWidth = (computedMinHeight - extraHeight) * this.ratio + extraWidth;
            var extraMaxWidth = (computedMaxHeight - extraHeight) * this.ratio + extraWidth;
            var extraMinHeight = (computedMinWidth - extraWidth) / this.ratio + extraHeight;
            var extraMaxHeight = (computedMaxWidth - extraWidth) / this.ratio + extraHeight;
            var lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
            var lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
            var lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
            var lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
            newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
            newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
        }
        else {
            newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
            newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
        }
        return { newWidth: newWidth, newHeight: newHeight };
    };
    Resizable.prototype.setBoundingClientRect = function () {
        // For parent boundary
        if (this.props.bounds === 'parent') {
            var parent_2 = this.parentNode;
            if (parent_2) {
                var parentRect = parent_2.getBoundingClientRect();
                this.parentLeft = parentRect.left;
                this.parentTop = parentRect.top;
            }
        }
        // For target(html element) boundary
        if (this.props.bounds && typeof this.props.bounds !== 'string') {
            var targetRect = this.props.bounds.getBoundingClientRect();
            this.targetLeft = targetRect.left;
            this.targetTop = targetRect.top;
        }
        // For boundary
        if (this.resizable) {
            var _a = this.resizable.getBoundingClientRect(), left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
            this.resizableLeft = left;
            this.resizableRight = right;
            this.resizableTop = top_1;
            this.resizableBottom = bottom;
        }
    };
    Resizable.prototype.onResizeStart = function (event, direction) {
        if (!this.resizable || !this.window) {
            return;
        }
        var clientX = 0;
        var clientY = 0;
        if (event.nativeEvent && isMouseEvent(event.nativeEvent)) {
            clientX = event.nativeEvent.clientX;
            clientY = event.nativeEvent.clientY;
        }
        else if (event.nativeEvent && isTouchEvent(event.nativeEvent)) {
            clientX = event.nativeEvent.touches[0].clientX;
            clientY = event.nativeEvent.touches[0].clientY;
        }
        if (this.props.onResizeStart) {
            if (this.resizable) {
                var startResize = this.props.onResizeStart(event, direction, this.resizable);
                if (startResize === false) {
                    return;
                }
            }
        }
        // Fix #168
        if (this.props.size) {
            if (typeof this.props.size.height !== 'undefined' && this.props.size.height !== this.state.height) {
                this.setState({ height: this.props.size.height });
            }
            if (typeof this.props.size.width !== 'undefined' && this.props.size.width !== this.state.width) {
                this.setState({ width: this.props.size.width });
            }
        }
        // For lockAspectRatio case
        this.ratio =
            typeof this.props.lockAspectRatio === 'number' ? this.props.lockAspectRatio : this.size.width / this.size.height;
        var flexBasis;
        var computedStyle = this.window.getComputedStyle(this.resizable);
        if (computedStyle.flexBasis !== 'auto') {
            var parent_3 = this.parentNode;
            if (parent_3) {
                var dir = this.window.getComputedStyle(parent_3).flexDirection;
                this.flexDir = dir.startsWith('row') ? 'row' : 'column';
                flexBasis = computedStyle.flexBasis;
            }
        }
        // For boundary
        this.setBoundingClientRect();
        this.bindEvents();
        var state = {
            original: {
                x: clientX,
                y: clientY,
                width: this.size.width,
                height: this.size.height,
            },
            isResizing: true,
            backgroundStyle: __assign(__assign({}, this.state.backgroundStyle), { cursor: this.window.getComputedStyle(event.target).cursor || 'auto' }),
            direction: direction,
            flexBasis: flexBasis,
        };
        this.setState(state);
    };
    Resizable.prototype.onMouseMove = function (event) {
        if (!this.state.isResizing || !this.resizable || !this.window) {
            return;
        }
        if (this.window.TouchEvent && isTouchEvent(event)) {
            try {
                event.preventDefault();
                event.stopPropagation();
            }
            catch (e) {
                // Ignore on fail
            }
        }
        var _a = this.props, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, minWidth = _a.minWidth, minHeight = _a.minHeight;
        var clientX = isTouchEvent(event) ? event.touches[0].clientX : event.clientX;
        var clientY = isTouchEvent(event) ? event.touches[0].clientY : event.clientY;
        var _b = this.state, direction = _b.direction, original = _b.original, width = _b.width, height = _b.height;
        var parentSize = this.getParentSize();
        var max = calculateNewMax(parentSize, this.window.innerWidth, this.window.innerHeight, maxWidth, maxHeight, minWidth, minHeight);
        maxWidth = max.maxWidth;
        maxHeight = max.maxHeight;
        minWidth = max.minWidth;
        minHeight = max.minHeight;
        // Calculate new size
        var _c = this.calculateNewSizeFromDirection(clientX, clientY), newHeight = _c.newHeight, newWidth = _c.newWidth;
        // Calculate max size from boundary settings
        var boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);
        if (this.props.snap && this.props.snap.x) {
            newWidth = findClosestSnap(newWidth, this.props.snap.x, this.props.snapGap);
        }
        if (this.props.snap && this.props.snap.y) {
            newHeight = findClosestSnap(newHeight, this.props.snap.y, this.props.snapGap);
        }
        // Calculate new size from aspect ratio
        var newSize = this.calculateNewSizeFromAspectRatio(newWidth, newHeight, { width: boundaryMax.maxWidth, height: boundaryMax.maxHeight }, { width: minWidth, height: minHeight });
        newWidth = newSize.newWidth;
        newHeight = newSize.newHeight;
        if (this.props.grid) {
            var newGridWidth = snap(newWidth, this.props.grid[0]);
            var newGridHeight = snap(newHeight, this.props.grid[1]);
            var gap = this.props.snapGap || 0;
            newWidth = gap === 0 || Math.abs(newGridWidth - newWidth) <= gap ? newGridWidth : newWidth;
            newHeight = gap === 0 || Math.abs(newGridHeight - newHeight) <= gap ? newGridHeight : newHeight;
        }
        var delta = {
            width: newWidth - original.width,
            height: newHeight - original.height,
        };
        if (width && typeof width === 'string') {
            if (endsWith(width, '%')) {
                var percent = (newWidth / parentSize.width) * 100;
                newWidth = percent + "%";
            }
            else if (endsWith(width, 'vw')) {
                var vw = (newWidth / this.window.innerWidth) * 100;
                newWidth = vw + "vw";
            }
            else if (endsWith(width, 'vh')) {
                var vh = (newWidth / this.window.innerHeight) * 100;
                newWidth = vh + "vh";
            }
        }
        if (height && typeof height === 'string') {
            if (endsWith(height, '%')) {
                var percent = (newHeight / parentSize.height) * 100;
                newHeight = percent + "%";
            }
            else if (endsWith(height, 'vw')) {
                var vw = (newHeight / this.window.innerWidth) * 100;
                newHeight = vw + "vw";
            }
            else if (endsWith(height, 'vh')) {
                var vh = (newHeight / this.window.innerHeight) * 100;
                newHeight = vh + "vh";
            }
        }
        var newState = {
            width: this.createSizeForCssProperty(newWidth, 'width'),
            height: this.createSizeForCssProperty(newHeight, 'height'),
        };
        if (this.flexDir === 'row') {
            newState.flexBasis = newState.width;
        }
        else if (this.flexDir === 'column') {
            newState.flexBasis = newState.height;
        }
        this.setState(newState);
        if (this.props.onResize) {
            this.props.onResize(event, direction, this.resizable, delta);
        }
    };
    Resizable.prototype.onMouseUp = function (event) {
        var _a = this.state, isResizing = _a.isResizing, direction = _a.direction, original = _a.original;
        if (!isResizing || !this.resizable) {
            return;
        }
        var delta = {
            width: this.size.width - original.width,
            height: this.size.height - original.height,
        };
        if (this.props.onResizeStop) {
            this.props.onResizeStop(event, direction, this.resizable, delta);
        }
        if (this.props.size) {
            this.setState(this.props.size);
        }
        this.unbindEvents();
        this.setState({
            isResizing: false,
            backgroundStyle: __assign(__assign({}, this.state.backgroundStyle), { cursor: 'auto' }),
        });
    };
    Resizable.prototype.updateSize = function (size) {
        this.setState({ width: size.width, height: size.height });
    };
    Resizable.prototype.renderResizer = function () {
        var _this = this;
        var _a = this.props, enable = _a.enable, handleStyles = _a.handleStyles, handleClasses = _a.handleClasses, handleWrapperStyle = _a.handleWrapperStyle, handleWrapperClass = _a.handleWrapperClass, handleComponent = _a.handleComponent;
        if (!enable) {
            return null;
        }
        var resizers = Object.keys(enable).map(function (dir) {
            if (enable[dir] !== false) {
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_resizer__WEBPACK_IMPORTED_MODULE_1__.Resizer, { key: dir, direction: dir, onResizeStart: _this.onResizeStart, replaceStyles: handleStyles && handleStyles[dir], className: handleClasses && handleClasses[dir] }, handleComponent && handleComponent[dir] ? handleComponent[dir] : null));
            }
            return null;
        });
        // #93 Wrap the resize box in span (will not break 100% width/height)
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: handleWrapperClass, style: handleWrapperStyle }, resizers));
    };
    Resizable.prototype.render = function () {
        var _this = this;
        var extendsProps = Object.keys(this.props).reduce(function (acc, key) {
            if (definedProps.indexOf(key) !== -1) {
                return acc;
            }
            acc[key] = _this.props[key];
            return acc;
        }, {});
        var style = __assign(__assign(__assign({ position: 'relative', userSelect: this.state.isResizing ? 'none' : 'auto' }, this.props.style), this.sizeStyle), { maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, minWidth: this.props.minWidth, minHeight: this.props.minHeight, boxSizing: 'border-box', flexShrink: 0 });
        if (this.state.flexBasis) {
            style.flexBasis = this.state.flexBasis;
        }
        var Wrapper = this.props.as || 'div';
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper, __assign({ ref: this.ref, style: style, className: this.props.className }, extendsProps),
            this.state.isResizing && react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: this.state.backgroundStyle }),
            this.props.children,
            this.renderResizer()));
    };
    Resizable.defaultProps = {
        as: 'div',
        onResizeStart: function () { },
        onResize: function () { },
        onResizeStop: function () { },
        enable: {
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
        },
        style: {},
        grid: [1, 1],
        lockAspectRatio: false,
        lockAspectRatioExtraWidth: 0,
        lockAspectRatioExtraHeight: 0,
        scale: 1,
        resizeRatio: 1,
        snapGap: 0,
    };
    return Resizable;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent));



/***/ }),

/***/ "./node_modules/re-resizable/lib/resizer.js":
/*!**************************************************!*\
  !*** ./node_modules/re-resizable/lib/resizer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resizer": () => (/* binding */ Resizer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var styles = {
    top: {
        width: '100%',
        height: '10px',
        top: '-5px',
        left: '0px',
        cursor: 'row-resize',
    },
    right: {
        width: '10px',
        height: '100%',
        top: '0px',
        right: '-5px',
        cursor: 'col-resize',
    },
    bottom: {
        width: '100%',
        height: '10px',
        bottom: '-5px',
        left: '0px',
        cursor: 'row-resize',
    },
    left: {
        width: '10px',
        height: '100%',
        top: '0px',
        left: '-5px',
        cursor: 'col-resize',
    },
    topRight: {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '-10px',
        top: '-10px',
        cursor: 'ne-resize',
    },
    bottomRight: {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '-10px',
        bottom: '-10px',
        cursor: 'se-resize',
    },
    bottomLeft: {
        width: '20px',
        height: '20px',
        position: 'absolute',
        left: '-10px',
        bottom: '-10px',
        cursor: 'sw-resize',
    },
    topLeft: {
        width: '20px',
        height: '20px',
        position: 'absolute',
        left: '-10px',
        top: '-10px',
        cursor: 'nw-resize',
    },
};
var Resizer = /** @class */ (function (_super) {
    __extends(Resizer, _super);
    function Resizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (e) {
            _this.props.onResizeStart(e, _this.props.direction);
        };
        _this.onTouchStart = function (e) {
            _this.props.onResizeStart(e, _this.props.direction);
        };
        return _this;
    }
    Resizer.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: this.props.className || '', style: __assign(__assign({ position: 'absolute', userSelect: 'none' }, styles[this.props.direction]), (this.props.replaceStyles || {})), onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart }, this.props.children));
    };
    return Resizer;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent));



/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/Draggable.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/Draggable.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "DraggableCore", ({
  enumerable: true,
  get: function get() {
    return _DraggableCore.default;
  }
}));
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _clsx2 = _interopRequireDefault(__webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js"));

var _domFns = __webpack_require__(/*! ./utils/domFns */ "./node_modules/react-draggable/build/cjs/utils/domFns.js");

var _positionFns = __webpack_require__(/*! ./utils/positionFns */ "./node_modules/react-draggable/build/cjs/utils/positionFns.js");

var _shims = __webpack_require__(/*! ./utils/shims */ "./node_modules/react-draggable/build/cjs/utils/shims.js");

var _DraggableCore = _interopRequireDefault(__webpack_require__(/*! ./DraggableCore */ "./node_modules/react-draggable/build/cjs/DraggableCore.js"));

var _log = _interopRequireDefault(__webpack_require__(/*! ./utils/log */ "./node_modules/react-draggable/build/cjs/utils/log.js"));

var _excluded = ["axis", "bounds", "children", "defaultPosition", "defaultClassName", "defaultClassNameDragging", "defaultClassNameDragged", "position", "positionOffset", "scale"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Define <Draggable>
//
var Draggable = /*#__PURE__*/function (_React$Component) {
  _inherits(Draggable, _React$Component);

  var _super = _createSuper(Draggable);

  function Draggable(props
  /*: DraggableProps*/
  ) {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e, coreData) {
      (0, _log.default)('Draggable: onDragStart: %j', coreData); // Short-circuit if user's callback killed it.

      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData)); // Kills start event on core as well, so move handlers are never bound.


      if (shouldStart === false) return false;

      _this.setState({
        dragging: true,
        dragged: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (e, coreData) {
      if (!_this.state.dragging) return false;
      (0, _log.default)('Draggable: onDrag: %j', coreData);
      var uiData = (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData);
      var newState
      /*: $Shape<DraggableState>*/
      = {
        x: uiData.x,
        y: uiData.y
      }; // Keep within bounds.

      if (_this.props.bounds) {
        // Save original x and y.
        var x = newState.x,
            y = newState.y; // Add slack to the values used to calculate bound position. This will ensure that if
        // we start removing slack, the element won't react to it right away until it's been
        // completely removed.

        newState.x += _this.state.slackX;
        newState.y += _this.state.slackY; // Get bound position. This will ceil/floor the x and y within the boundaries.

        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_assertThisInitialized(_this), newState.x, newState.y),
            _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2),
            newStateX = _getBoundPosition2[0],
            newStateY = _getBoundPosition2[1];

        newState.x = newStateX;
        newState.y = newStateY; // Recalculate slack by noting how much was shaved by the boundPosition handler.

        newState.slackX = _this.state.slackX + (x - newState.x);
        newState.slackY = _this.state.slackY + (y - newState.y); // Update the event we fire to reflect what really happened after bounds took effect.

        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - _this.state.x;
        uiData.deltaY = newState.y - _this.state.y;
      } // Short-circuit if user's callback killed it.


      var shouldUpdate = _this.props.onDrag(e, uiData);

      if (shouldUpdate === false) return false;

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStop", function (e, coreData) {
      if (!_this.state.dragging) return false; // Short-circuit if user's callback killed it.

      var shouldContinue = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData));

      if (shouldContinue === false) return false;
      (0, _log.default)('Draggable: onDragStop: %j', coreData);
      var newState
      /*: $Shape<DraggableState>*/
      = {
        dragging: false,
        slackX: 0,
        slackY: 0
      }; // If this is a controlled component, the result of this operation will be to
      // revert back to the old position. We expect a handler on `onDragStop`, at the least.

      var controlled = Boolean(_this.props.position);

      if (controlled) {
        var _this$props$position = _this.props.position,
            x = _this$props$position.x,
            y = _this$props$position.y;
        newState.x = x;
        newState.y = y;
      }

      _this.setState(newState);
    });

    _this.state = {
      // Whether or not we are currently dragging.
      dragging: false,
      // Whether or not we have been dragged before.
      dragged: false,
      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,
      prevPropsPosition: _objectSpread({}, props.position),
      // Used for compensating for out-of-bounds drags
      slackX: 0,
      slackY: 0,
      // Can only determine if SVG after mounting
      isElementSVG: false
    };

    if (props.position && !(props.onDrag || props.onStop)) {
      // eslint-disable-next-line no-console
      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
    }

    return _this;
  }

  _createClass(Draggable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Check to see if the element passed is an instanceof SVGElement
      if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
        this.setState({
          isElementSVG: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        dragging: false
      }); // prevents invariant if unmounted while dragging
    } // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.

  }, {
    key: "findDOMNode",
    value: function findDOMNode()
    /*: ?HTMLElement*/
    {
      var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;

      return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render()
    /*: ReactElement<any>*/
    {
      var _clsx;

      var _this$props2 = this.props,
          axis = _this$props2.axis,
          bounds = _this$props2.bounds,
          children = _this$props2.children,
          defaultPosition = _this$props2.defaultPosition,
          defaultClassName = _this$props2.defaultClassName,
          defaultClassNameDragging = _this$props2.defaultClassNameDragging,
          defaultClassNameDragged = _this$props2.defaultClassNameDragged,
          position = _this$props2.position,
          positionOffset = _this$props2.positionOffset,
          scale = _this$props2.scale,
          draggableCoreProps = _objectWithoutProperties(_this$props2, _excluded);

      var style = {};
      var svgTransform = null; // If this is controlled, we don't want to move it - unless it's dragging.

      var controlled = Boolean(position);
      var draggable = !controlled || this.state.dragging;
      var validPosition = position || defaultPosition;
      var transformOpts = {
        // Set left if horizontal drag is enabled
        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
        // Set top if vertical drag is enabled
        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
      }; // If this element was SVG, we use the `transform` attribute.

      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
      } // Mark with class while dragging


      var className = (0, _clsx2.default)(children.props.className || '', defaultClassName, (_clsx = {}, _defineProperty(_clsx, defaultClassNameDragging, this.state.dragging), _defineProperty(_clsx, defaultClassNameDragged, this.state.dragged), _clsx)); // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)

      return /*#__PURE__*/React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop
      }), /*#__PURE__*/React.cloneElement(React.Children.only(children), {
        className: className,
        style: _objectSpread(_objectSpread({}, children.props.style), style),
        transform: svgTransform
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: // React 16.3+
    // Arity (props, state)
    function getDerivedStateFromProps(_ref, _ref2)
    /*: ?$Shape<DraggableState>*/
    {
      var position = _ref.position;
      var prevPropsPosition = _ref2.prevPropsPosition;

      // Set x/y if a new position is provided in props that is different than the previous.
      if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
        (0, _log.default)('Draggable: getDerivedStateFromProps %j', {
          position: position,
          prevPropsPosition: prevPropsPosition
        });
        return {
          x: position.x,
          y: position.y,
          prevPropsPosition: _objectSpread({}, position)
        };
      }

      return null;
    }
  }]);

  return Draggable;
}(React.Component);

exports["default"] = Draggable;

_defineProperty(Draggable, "displayName", 'Draggable');

_defineProperty(Draggable, "propTypes", _objectSpread(_objectSpread({}, _DraggableCore.default.propTypes), {}, {
  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),

  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
    left: _propTypes.default.number,
    right: _propTypes.default.number,
    top: _propTypes.default.number,
    bottom: _propTypes.default.number
  }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
  defaultClassName: _propTypes.default.string,
  defaultClassNameDragging: _propTypes.default.string,
  defaultClassNameDragged: _propTypes.default.string,

  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  positionOffset: _propTypes.default.shape({
    x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  }),

  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
}));

_defineProperty(Draggable, "defaultProps", _objectSpread(_objectSpread({}, _DraggableCore.default.defaultProps), {}, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: {
    x: 0,
    y: 0
  },
  scale: 1
}));

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/DraggableCore.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/DraggableCore.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _domFns = __webpack_require__(/*! ./utils/domFns */ "./node_modules/react-draggable/build/cjs/utils/domFns.js");

var _positionFns = __webpack_require__(/*! ./utils/positionFns */ "./node_modules/react-draggable/build/cjs/utils/positionFns.js");

var _shims = __webpack_require__(/*! ./utils/shims */ "./node_modules/react-draggable/build/cjs/utils/shims.js");

var _log = _interopRequireDefault(__webpack_require__(/*! ./utils/log */ "./node_modules/react-draggable/build/cjs/utils/log.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Simple abstraction for dragging events names.
var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
}; // Default to mouse events.

var dragEventFor = eventsFor.mouse;
/*:: type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};*/

/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/

/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;*/

/*:: export type ControlPosition = {x: number, y: number};*/

/*:: export type PositionOffsetControlPosition = {x: number|string, y: number|string};*/

/*:: export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};*/

/*:: export type DraggableCoreProps = {
  ...DraggableCoreDefaultProps,
  cancel: string,
  children: ReactElement<any>,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: ?React.ElementRef<any>,
};*/

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//
var DraggableCore = /*#__PURE__*/function (_React$Component) {
  _inherits(DraggableCore, _React$Component);

  var _super = _createSuper(DraggableCore);

  function DraggableCore() {
    var _this;

    _classCallCheck(this, DraggableCore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: NaN,
      lastY: NaN,
      touchIdentifier: null
    });

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function (e) {
      // Make it possible to attach event handlers on top of this one.
      _this.props.onMouseDown(e); // Only accept left-clicks.


      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false; // Get nodes. Be sure to grab relative document (could be iframed)

      var thisNode = _this.findDOMNode();

      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }

      var ownerDocument = thisNode.ownerDocument; // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      } // Prevent scrolling on mobile devices, like ipad/iphone.
      // Important that this is after handle/cancel.


      if (e.type === 'touchstart') e.preventDefault(); // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.

      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);

      _this.setState({
        touchIdentifier: touchIdentifier
      }); // Get the current drag point from the event. This is used as the offset.


      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return; // not possible but satisfies flow

      var x = position.x,
          y = position.y; // Create an event object with all the data parents need to make a decision here.

      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)('DraggableCore: handleDragStart: %j', coreEvent); // Call event handler. If it returns explicit false, cancel.

      (0, _log.default)('calling', _this.props.onStart);

      var shouldUpdate = _this.props.onStart(e, coreEvent);

      if (shouldUpdate === false || _this.mounted === false) return; // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.

      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument); // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.

      _this.setState({
        dragging: true,
        lastX: x,
        lastY: y
      }); // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.


      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrag", function (e) {
      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return;
      var x = position.x,
          y = position.y; // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var deltaX = x - _this.state.lastX,
            deltaY = y - _this.state.lastY;

        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        deltaX = _snapToGrid2[0];
        deltaY = _snapToGrid2[1];
        if (!deltaX && !deltaY) return; // skip useless drag

        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)('DraggableCore: handleDrag: %j', coreEvent); // Call event handler. If it returns explicit false, trigger end.

      var shouldUpdate = _this.props.onDrag(e, coreEvent);

      if (shouldUpdate === false || _this.mounted === false) {
        try {
          // $FlowIgnore
          _this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          var event = ((document.createEvent('MouseEvents')
          /*: any*/
          )
          /*: MouseTouchEvent*/
          ); // I see why this insanity was deprecated
          // $FlowIgnore

          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          _this.handleDragStop(event);
        }

        return;
      }

      _this.setState({
        lastX: x,
        lastY: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragStop", function (e) {
      if (!_this.state.dragging) return;
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return;
      var x = position.x,
          y = position.y; // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var deltaX = x - _this.state.lastX || 0;
        var deltaY = y - _this.state.lastY || 0;

        var _snapToGrid3 = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);

        var _snapToGrid4 = _slicedToArray(_snapToGrid3, 2);

        deltaX = _snapToGrid4[0];
        deltaY = _snapToGrid4[1];
        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y); // Call event handler

      var shouldContinue = _this.props.onStop(e, coreEvent);

      if (shouldContinue === false || _this.mounted === false) return false;

      var thisNode = _this.findDOMNode();

      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }

      (0, _log.default)('DraggableCore: handleDragStop: %j', coreEvent); // Reset the el.

      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });

      if (thisNode) {
        // Remove event handlers
        (0, _log.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return _this.handleDragStart(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      dragEventFor = eventsFor.mouse;
      return _this.handleDragStop(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return _this.handleDragStart(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return _this.handleDragStop(e);
    });

    return _this;
  }

  _createClass(DraggableCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true; // Touch handlers must be added with {passive: false} to be cancelable.
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention

      var thisNode = this.findDOMNode();

      if (thisNode) {
        (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false; // Remove any leftover event handlers. Remove both touch and mouse handlers in case
      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.

      var thisNode = this.findDOMNode();

      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    } // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.

  }, {
    key: "findDOMNode",
    value: function findDOMNode()
    /*: ?HTMLElement*/
    {
      var _this$props, _this$props2, _this$props2$nodeRef;

      return (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.nodeRef ? (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$nodeRef = _this$props2.nodeRef) === null || _this$props2$nodeRef === void 0 ? void 0 : _this$props2$nodeRef.current : _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render()
    /*: React.Element<any>*/
    {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return /*#__PURE__*/React.cloneElement(React.Children.only(this.props.children), {
        // Note: mouseMove handler is attached to document so it will still function
        // when the user drags quickly and leaves the bounds of the element.
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        // onTouchStart is added on `componentDidMount` so they can be added with
        // {passive: false}, which allows it to cancel. See
        // https://developers.google.com/web/updates/2017/01/scrolling-intervention
        onTouchEnd: this.onTouchEnd
      });
    }
  }]);

  return DraggableCore;
}(React.Component);

exports["default"] = DraggableCore;

_defineProperty(DraggableCore, "displayName", 'DraggableCore');

_defineProperty(DraggableCore, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes.default.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes.default.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes.default.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props
  /*: DraggableCoreProps*/
  , propName
  /*: $Keys<DraggableCoreProps>*/
  ) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes.default.arrayOf(_propTypes.default.number),

  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes.default.string,

  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes.default.string,

  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: _propTypes.default.object,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes.default.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes.default.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes.default.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes.default.func,

  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: _propTypes.default.number,

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});

_defineProperty(DraggableCore, "defaultProps", {
  allowAnyClick: false,
  // by default only accept left click
  disabled: false,
  enableUserSelectHack: true,
  onStart: function onStart() {},
  onDrag: function onDrag() {},
  onStop: function onStop() {},
  onMouseDown: function onMouseDown() {},
  scale: 1
});

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/cjs.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/cjs.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ./Draggable */ "./node_modules/react-draggable/build/cjs/Draggable.js"),
    Draggable = _require.default,
    DraggableCore = _require.DraggableCore; // Previous versions of this lib exported <Draggable> as the root export. As to no-// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266


module.exports = Draggable;
module.exports["default"] = Draggable;
module.exports.DraggableCore = DraggableCore;

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/utils/domFns.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/utils/domFns.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addClassName = addClassName;
exports.addEvent = addEvent;
exports.addUserSelectStyles = addUserSelectStyles;
exports.createCSSTransform = createCSSTransform;
exports.createSVGTransform = createSVGTransform;
exports.getTouch = getTouch;
exports.getTouchIdentifier = getTouchIdentifier;
exports.getTranslation = getTranslation;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.matchesSelector = matchesSelector;
exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
exports.offsetXYFromParent = offsetXYFromParent;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.removeClassName = removeClassName;
exports.removeEvent = removeEvent;
exports.removeUserSelectStyles = removeUserSelectStyles;

var _shims = __webpack_require__(/*! ./shims */ "./node_modules/react-draggable/build/cjs/utils/shims.js");

var _getPrefix = _interopRequireWildcard(__webpack_require__(/*! ./getPrefix */ "./node_modules/react-draggable/build/cjs/utils/getPrefix.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchesSelectorFunc = '';

function matchesSelector(el
/*: Node*/
, selector
/*: string*/
)
/*: boolean*/
{
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims.isFunction)(el[method]);
    });
  } // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable


  if (!(0, _shims.isFunction)(el[matchesSelectorFunc])) return false; // $FlowIgnore: Doesn't think elements are indexable

  return el[matchesSelectorFunc](selector);
} // Works up the tree to the draggable itself attempting to match selector.


function matchesSelectorAndParentsTo(el
/*: Node*/
, selector
/*: string*/
, baseNode
/*: Node*/
)
/*: boolean*/
{
  var node = el;

  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function addEvent(el
/*: ?Node*/
, event
/*: string*/
, handler
/*: Function*/
, inputOptions
/*: Object*/
)
/*: void*/
{
  if (!el) return;

  var options = _objectSpread({
    capture: true
  }, inputOptions); // $FlowIgnore[method-unbinding]


  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

function removeEvent(el
/*: ?Node*/
, event
/*: string*/
, handler
/*: Function*/
, inputOptions
/*: Object*/
)
/*: void*/
{
  if (!el) return;

  var options = _objectSpread({
    capture: true
  }, inputOptions); // $FlowIgnore[method-unbinding]


  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

function outerHeight(node
/*: HTMLElement*/
)
/*: number*/
{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims.int)(computedStyle.borderTopWidth);
  height += (0, _shims.int)(computedStyle.borderBottomWidth);
  return height;
}

function outerWidth(node
/*: HTMLElement*/
)
/*: number*/
{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims.int)(computedStyle.borderLeftWidth);
  width += (0, _shims.int)(computedStyle.borderRightWidth);
  return width;
}

function innerHeight(node
/*: HTMLElement*/
)
/*: number*/
{
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims.int)(computedStyle.paddingTop);
  height -= (0, _shims.int)(computedStyle.paddingBottom);
  return height;
}

function innerWidth(node
/*: HTMLElement*/
)
/*: number*/
{
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims.int)(computedStyle.paddingLeft);
  width -= (0, _shims.int)(computedStyle.paddingRight);
  return width;
}
/*:: interface EventWithOffset {
  clientX: number, clientY: number
}*/


// Get from offsetParent
function offsetXYFromParent(evt
/*: EventWithOffset*/
, offsetParent
/*: HTMLElement*/
, scale
/*: number*/
)
/*: ControlPosition*/
{
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  var x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  var y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return {
    x: x,
    y: y
  };
}

function createCSSTransform(controlPos
/*: ControlPosition*/
, positionOffset
/*: PositionOffsetControlPosition*/
)
/*: Object*/
{
  var translation = getTranslation(controlPos, positionOffset, 'px');
  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix.default), translation);
}

function createSVGTransform(controlPos
/*: ControlPosition*/
, positionOffset
/*: PositionOffsetControlPosition*/
)
/*: string*/
{
  var translation = getTranslation(controlPos, positionOffset, '');
  return translation;
}

function getTranslation(_ref2, positionOffset
/*: PositionOffsetControlPosition*/
, unitSuffix
/*: string*/
)
/*: string*/
{
  var x = _ref2.x,
      y = _ref2.y;
  var translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");

  if (positionOffset) {
    var defaultX = "".concat(typeof positionOffset.x === 'string' ? positionOffset.x : positionOffset.x + unitSuffix);
    var defaultY = "".concat(typeof positionOffset.y === 'string' ? positionOffset.y : positionOffset.y + unitSuffix);
    translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
  }

  return translation;
}

function getTouch(e
/*: MouseTouchEvent*/
, identifier
/*: number*/
)
/*: ?{clientX: number, clientY: number}*/
{
  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
    return identifier === t.identifier;
  });
}

function getTouchIdentifier(e
/*: MouseTouchEvent*/
)
/*: ?number*/
{
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
} // User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.
// Note we're passing `document` b/c we could be iframed


function addUserSelectStyles(doc
/*: ?Document*/
) {
  if (!doc) return;
  var styleEl = doc.getElementById('react-draggable-style-el');

  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }

  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc
/*: ?Document*/
) {
  if (!doc) return;

  try {
    if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection'); // $FlowIgnore: IE

    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      // Remove selection caused by scroll, unless it's a focused input
      // (we use doc.defaultView in case we're in an iframe)
      var selection = (doc.defaultView || window).getSelection();

      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {// probably IE
  }
}

function addClassName(el
/*: HTMLElement*/
, className
/*: string*/
) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
      el.className += " ".concat(className);
    }
  }
}

function removeClassName(el
/*: HTMLElement*/
, className
/*: string*/
) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), 'g'), '');
  }
}

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/utils/getPrefix.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/utils/getPrefix.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.browserPrefixToKey = browserPrefixToKey;
exports.browserPrefixToStyle = browserPrefixToStyle;
exports["default"] = void 0;
exports.getPrefix = getPrefix;
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];

function getPrefix()
/*: string*/
{
  var _window$document, _window$document$docu;

  var prop
  /*: string*/
  = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return ''; // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.

  var style = (_window$document = window.document) === null || _window$document === void 0 ? void 0 : (_window$document$docu = _window$document.documentElement) === null || _window$document$docu === void 0 ? void 0 : _window$document$docu.style;
  if (!style) return '';
  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

function browserPrefixToKey(prop
/*: string*/
, prefix
/*: string*/
)
/*: string*/
{
  return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
}

function browserPrefixToStyle(prop
/*: string*/
, prefix
/*: string*/
)
/*: string*/
{
  return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
}

function kebabToTitleCase(str
/*: string*/
)
/*: string*/
{
  var out = '';
  var shouldCapitalize = true;

  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }

  return out;
} // Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`


var _default = (getPrefix()
/*: string*/
);

exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (false) {}
}

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/utils/positionFns.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/utils/positionFns.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.canDragX = canDragX;
exports.canDragY = canDragY;
exports.createCoreData = createCoreData;
exports.createDraggableData = createDraggableData;
exports.getBoundPosition = getBoundPosition;
exports.getControlPosition = getControlPosition;
exports.snapToGrid = snapToGrid;

var _shims = __webpack_require__(/*! ./shims */ "./node_modules/react-draggable/build/cjs/utils/shims.js");

var _domFns = __webpack_require__(/*! ./domFns */ "./node_modules/react-draggable/build/cjs/utils/domFns.js");

function getBoundPosition(draggable
/*: Draggable*/
, x
/*: number*/
, y
/*: number*/
)
/*: [number, number]*/
{
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y]; // Clone new bounds

  var bounds = draggable.props.bounds;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;
    var ownerWindow = ownerDocument.defaultView;
    var boundNode;

    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }

    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }

    var boundNodeEl
    /*: HTMLElement*/
    = boundNode; // for Flow, can't seem to refine correctly

    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl); // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.

    bounds = {
      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
      right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
      bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
    };
  } // Keep x and y below right and bottom limits...


  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom); // But above left and top limits.

  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
  return [x, y];
}

function snapToGrid(grid
/*: [number, number]*/
, pendingX
/*: number*/
, pendingY
/*: number*/
)
/*: [number, number]*/
{
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

function canDragX(draggable
/*: Draggable*/
)
/*: boolean*/
{
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

function canDragY(draggable
/*: Draggable*/
)
/*: boolean*/
{
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
} // Get {x, y} positions from event.


function getControlPosition(e
/*: MouseTouchEvent*/
, touchIdentifier
/*: ?number*/
, draggableCore
/*: DraggableCore*/
)
/*: ?ControlPosition*/
{
  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch

  var node = findDOMNode(draggableCore); // User can provide an offsetParent if desired.

  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
} // Create an data object exposed by <DraggableCore>'s events


function createCoreData(draggable
/*: DraggableCore*/
, x
/*: number*/
, y
/*: number*/
)
/*: DraggableData*/
{
  var state = draggable.state;
  var isStart = !(0, _shims.isNum)(state.lastX);
  var node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x: x,
      y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: node,
      deltaX: x - state.lastX,
      deltaY: y - state.lastY,
      lastX: state.lastX,
      lastY: state.lastY,
      x: x,
      y: y
    };
  }
} // Create an data exposed by <Draggable>'s events


function createDraggableData(draggable
/*: Draggable*/
, coreData
/*: DraggableData*/
)
/*: DraggableData*/
{
  var scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
} // A lot faster than stringify/parse


function cloneBounds(bounds
/*: Bounds*/
)
/*: Bounds*/
{
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable
/*: Draggable | DraggableCore*/
)
/*: HTMLElement*/
{
  var node = draggable.findDOMNode();

  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  } // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME


  return node;
}

/***/ }),

/***/ "./node_modules/react-draggable/build/cjs/utils/shims.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-draggable/build/cjs/utils/shims.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.dontSetMe = dontSetMe;
exports.findInArray = findInArray;
exports.int = int;
exports.isFunction = isFunction;
exports.isNum = isNum;

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array
/*: Array<any> | TouchList*/
, callback
/*: Function*/
)
/*: any*/
{
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

function isFunction(func
/*: any*/
)
/*: boolean %checks*/
{
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(num
/*: any*/
)
/*: boolean %checks*/
{
  return typeof num === 'number' && !isNaN(num);
}

function int(a
/*: string*/
)
/*: number*/
{
  return parseInt(a, 10);
}

function dontSetMe(props
/*: Object*/
, propName
/*: string*/
, componentName
/*: string*/
)
/*: ?Error*/
{
  if (props[propName]) {
    return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
  }
}

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-rnd/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/react-rnd/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rnd": () => (/* binding */ Rnd)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-draggable */ "./node_modules/react-draggable/build/cjs/cjs.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var re_resizable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! re-resizable */ "./node_modules/re-resizable/lib/index.js");




/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var Draggable = (react_draggable__WEBPACK_IMPORTED_MODULE_1___default());
var resizableStyle = {
    width: "auto",
    height: "auto",
    display: "inline-block",
    position: "absolute",
    top: 0,
    left: 0,
};
var getEnableResizingByFlag = function (flag) { return ({
    bottom: flag,
    bottomLeft: flag,
    bottomRight: flag,
    left: flag,
    right: flag,
    top: flag,
    topLeft: flag,
    topRight: flag,
}); };
var Rnd = /** @class */ (function (_super) {
    __extends(Rnd, _super);
    function Rnd(props) {
        var _this = _super.call(this, props) || this;
        _this.resizingPosition = { x: 0, y: 0 };
        _this.offsetFromParent = { left: 0, top: 0 };
        _this.resizableElement = { current: null };
        _this.originalPosition = { x: 0, y: 0 };
        _this.refDraggable = function (c) {
            if (!c)
                return;
            _this.draggable = c;
        };
        _this.refResizable = function (c) {
            if (!c)
                return;
            _this.resizable = c;
            _this.resizableElement.current = c.resizable;
        };
        _this.state = {
            resizing: false,
            bounds: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            maxWidth: props.maxWidth,
            maxHeight: props.maxHeight,
        };
        _this.onResizeStart = _this.onResizeStart.bind(_this);
        _this.onResize = _this.onResize.bind(_this);
        _this.onResizeStop = _this.onResizeStop.bind(_this);
        _this.onDragStart = _this.onDragStart.bind(_this);
        _this.onDrag = _this.onDrag.bind(_this);
        _this.onDragStop = _this.onDragStop.bind(_this);
        _this.getMaxSizesFromProps = _this.getMaxSizesFromProps.bind(_this);
        return _this;
    }
    Rnd.prototype.componentDidMount = function () {
        this.updateOffsetFromParent();
        var _a = this.offsetFromParent, left = _a.left, top = _a.top;
        var _b = this.getDraggablePosition(), x = _b.x, y = _b.y;
        this.draggable.setState({
            x: x - left,
            y: y - top,
        });
        // HACK: Apply position adjustment
        this.forceUpdate();
    };
    // HACK: To get `react-draggable` state x and y.
    Rnd.prototype.getDraggablePosition = function () {
        var _a = this.draggable.state, x = _a.x, y = _a.y;
        return { x: x, y: y };
    };
    Rnd.prototype.getParent = function () {
        return this.resizable && this.resizable.parentNode;
    };
    Rnd.prototype.getParentSize = function () {
        return this.resizable.getParentSize();
    };
    Rnd.prototype.getMaxSizesFromProps = function () {
        var maxWidth = typeof this.props.maxWidth === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
        var maxHeight = typeof this.props.maxHeight === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
        return { maxWidth: maxWidth, maxHeight: maxHeight };
    };
    Rnd.prototype.getSelfElement = function () {
        return this.resizable && this.resizable.resizable;
    };
    Rnd.prototype.getOffsetHeight = function (boundary) {
        var scale = this.props.scale;
        switch (this.props.bounds) {
            case "window":
                return window.innerHeight / scale;
            case "body":
                return document.body.offsetHeight / scale;
            default:
                return boundary.offsetHeight;
        }
    };
    Rnd.prototype.getOffsetWidth = function (boundary) {
        var scale = this.props.scale;
        switch (this.props.bounds) {
            case "window":
                return window.innerWidth / scale;
            case "body":
                return document.body.offsetWidth / scale;
            default:
                return boundary.offsetWidth;
        }
    };
    Rnd.prototype.onDragStart = function (e, data) {
        if (this.props.onDragStart) {
            this.props.onDragStart(e, data);
        }
        var pos = this.getDraggablePosition();
        this.originalPosition = pos;
        if (!this.props.bounds)
            return;
        var parent = this.getParent();
        var scale = this.props.scale;
        var boundary;
        if (this.props.bounds === "parent") {
            boundary = parent;
        }
        else if (this.props.bounds === "body") {
            var parentRect_1 = parent.getBoundingClientRect();
            var parentLeft_1 = parentRect_1.left;
            var parentTop_1 = parentRect_1.top;
            var bodyRect = document.body.getBoundingClientRect();
            var left_1 = -(parentLeft_1 - parent.offsetLeft * scale - bodyRect.left) / scale;
            var top_1 = -(parentTop_1 - parent.offsetTop * scale - bodyRect.top) / scale;
            var right = (document.body.offsetWidth - this.resizable.size.width * scale) / scale + left_1;
            var bottom = (document.body.offsetHeight - this.resizable.size.height * scale) / scale + top_1;
            return this.setState({ bounds: { top: top_1, right: right, bottom: bottom, left: left_1 } });
        }
        else if (this.props.bounds === "window") {
            if (!this.resizable)
                return;
            var parentRect_2 = parent.getBoundingClientRect();
            var parentLeft_2 = parentRect_2.left;
            var parentTop_2 = parentRect_2.top;
            var left_2 = -(parentLeft_2 - parent.offsetLeft * scale) / scale;
            var top_2 = -(parentTop_2 - parent.offsetTop * scale) / scale;
            var right = (window.innerWidth - this.resizable.size.width * scale) / scale + left_2;
            var bottom = (window.innerHeight - this.resizable.size.height * scale) / scale + top_2;
            return this.setState({ bounds: { top: top_2, right: right, bottom: bottom, left: left_2 } });
        }
        else if (typeof this.props.bounds === "string") {
            boundary = document.querySelector(this.props.bounds);
        }
        else if (this.props.bounds instanceof HTMLElement) {
            boundary = this.props.bounds;
        }
        if (!(boundary instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
            return;
        }
        var boundaryRect = boundary.getBoundingClientRect();
        var boundaryLeft = boundaryRect.left;
        var boundaryTop = boundaryRect.top;
        var parentRect = parent.getBoundingClientRect();
        var parentLeft = parentRect.left;
        var parentTop = parentRect.top;
        var left = (boundaryLeft - parentLeft) / scale;
        var top = boundaryTop - parentTop;
        if (!this.resizable)
            return;
        this.updateOffsetFromParent();
        var offset = this.offsetFromParent;
        this.setState({
            bounds: {
                top: top - offset.top,
                right: left + (boundary.offsetWidth - this.resizable.size.width) - offset.left / scale,
                bottom: top + (boundary.offsetHeight - this.resizable.size.height) - offset.top,
                left: left - offset.left / scale,
            },
        });
    };
    Rnd.prototype.onDrag = function (e, data) {
        if (!this.props.onDrag)
            return;
        var _a = this.offsetFromParent, left = _a.left, top = _a.top;
        if (!this.props.dragAxis || this.props.dragAxis === "both") {
            return this.props.onDrag(e, __assign(__assign({}, data), { x: data.x - left, y: data.y - top }));
        }
        else if (this.props.dragAxis === "x") {
            return this.props.onDrag(e, __assign(__assign({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
        }
        else if (this.props.dragAxis === "y") {
            return this.props.onDrag(e, __assign(__assign({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
        }
    };
    Rnd.prototype.onDragStop = function (e, data) {
        if (!this.props.onDragStop)
            return;
        var _a = this.offsetFromParent, left = _a.left, top = _a.top;
        if (!this.props.dragAxis || this.props.dragAxis === "both") {
            return this.props.onDragStop(e, __assign(__assign({}, data), { x: data.x + left, y: data.y + top }));
        }
        else if (this.props.dragAxis === "x") {
            return this.props.onDragStop(e, __assign(__assign({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
        }
        else if (this.props.dragAxis === "y") {
            return this.props.onDragStop(e, __assign(__assign({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
        }
    };
    Rnd.prototype.onResizeStart = function (e, dir, elementRef) {
        e.stopPropagation();
        this.setState({
            resizing: true,
        });
        var scale = this.props.scale;
        var offset = this.offsetFromParent;
        var pos = this.getDraggablePosition();
        this.resizingPosition = { x: pos.x + offset.left, y: pos.y + offset.top };
        this.originalPosition = pos;
        if (this.props.bounds) {
            var parent_1 = this.getParent();
            var boundary = void 0;
            if (this.props.bounds === "parent") {
                boundary = parent_1;
            }
            else if (this.props.bounds === "body") {
                boundary = document.body;
            }
            else if (this.props.bounds === "window") {
                boundary = window;
            }
            else if (typeof this.props.bounds === "string") {
                boundary = document.querySelector(this.props.bounds);
            }
            else if (this.props.bounds instanceof HTMLElement) {
                boundary = this.props.bounds;
            }
            var self_1 = this.getSelfElement();
            if (self_1 instanceof Element &&
                (boundary instanceof HTMLElement || boundary === window) &&
                parent_1 instanceof HTMLElement) {
                var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
                var parentSize = this.getParentSize();
                if (maxWidth && typeof maxWidth === "string") {
                    if (maxWidth.endsWith("%")) {
                        var ratio = Number(maxWidth.replace("%", "")) / 100;
                        maxWidth = parentSize.width * ratio;
                    }
                    else if (maxWidth.endsWith("px")) {
                        maxWidth = Number(maxWidth.replace("px", ""));
                    }
                }
                if (maxHeight && typeof maxHeight === "string") {
                    if (maxHeight.endsWith("%")) {
                        var ratio = Number(maxHeight.replace("%", "")) / 100;
                        maxHeight = parentSize.width * ratio;
                    }
                    else if (maxHeight.endsWith("px")) {
                        maxHeight = Number(maxHeight.replace("px", ""));
                    }
                }
                var selfRect = self_1.getBoundingClientRect();
                var selfLeft = selfRect.left;
                var selfTop = selfRect.top;
                var boundaryRect = this.props.bounds === "window" ? { left: 0, top: 0 } : boundary.getBoundingClientRect();
                var boundaryLeft = boundaryRect.left;
                var boundaryTop = boundaryRect.top;
                var offsetWidth = this.getOffsetWidth(boundary);
                var offsetHeight = this.getOffsetHeight(boundary);
                var hasLeft = dir.toLowerCase().endsWith("left");
                var hasRight = dir.toLowerCase().endsWith("right");
                var hasTop = dir.startsWith("top");
                var hasBottom = dir.startsWith("bottom");
                if ((hasLeft || hasTop) && this.resizable) {
                    var max = (selfLeft - boundaryLeft) / scale + this.resizable.size.width;
                    this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
                }
                // INFO: To set bounds in `lock aspect ratio with bounds` case. See also that story.
                if (hasRight || (this.props.lockAspectRatio && !hasLeft && !hasTop)) {
                    var max = offsetWidth + (boundaryLeft - selfLeft) / scale;
                    this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
                }
                if ((hasTop || hasLeft) && this.resizable) {
                    var max = (selfTop - boundaryTop) / scale + this.resizable.size.height;
                    this.setState({
                        maxHeight: max > Number(maxHeight) ? maxHeight : max,
                    });
                }
                // INFO: To set bounds in `lock aspect ratio with bounds` case. See also that story.
                if (hasBottom || (this.props.lockAspectRatio && !hasTop && !hasLeft)) {
                    var max = offsetHeight + (boundaryTop - selfTop) / scale;
                    this.setState({
                        maxHeight: max > Number(maxHeight) ? maxHeight : max,
                    });
                }
            }
        }
        else {
            this.setState({
                maxWidth: this.props.maxWidth,
                maxHeight: this.props.maxHeight,
            });
        }
        if (this.props.onResizeStart) {
            this.props.onResizeStart(e, dir, elementRef);
        }
    };
    Rnd.prototype.onResize = function (e, direction, elementRef, delta) {
        // INFO: Apply x and y position adjustments caused by resizing to draggable
        var newPos = { x: this.originalPosition.x, y: this.originalPosition.y };
        var left = -delta.width;
        var top = -delta.height;
        var directions = ["top", "left", "topLeft", "bottomLeft", "topRight"];
        if (directions.indexOf(direction) !== -1) {
            if (direction === "bottomLeft") {
                newPos.x += left;
            }
            else if (direction === "topRight") {
                newPos.y += top;
            }
            else {
                newPos.x += left;
                newPos.y += top;
            }
        }
        if (newPos.x !== this.draggable.state.x || newPos.y !== this.draggable.state.y) {
            this.draggable.setState(newPos);
        }
        this.updateOffsetFromParent();
        var offset = this.offsetFromParent;
        var x = this.getDraggablePosition().x + offset.left;
        var y = this.getDraggablePosition().y + offset.top;
        this.resizingPosition = { x: x, y: y };
        if (!this.props.onResize)
            return;
        this.props.onResize(e, direction, elementRef, delta, {
            x: x,
            y: y,
        });
    };
    Rnd.prototype.onResizeStop = function (e, direction, elementRef, delta) {
        this.setState({
            resizing: false,
        });
        var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
        this.setState({ maxWidth: maxWidth, maxHeight: maxHeight });
        if (this.props.onResizeStop) {
            this.props.onResizeStop(e, direction, elementRef, delta, this.resizingPosition);
        }
    };
    Rnd.prototype.updateSize = function (size) {
        if (!this.resizable)
            return;
        this.resizable.updateSize({ width: size.width, height: size.height });
    };
    Rnd.prototype.updatePosition = function (position) {
        this.draggable.setState(position);
    };
    Rnd.prototype.updateOffsetFromParent = function () {
        var scale = this.props.scale;
        var parent = this.getParent();
        var self = this.getSelfElement();
        if (!parent || self === null) {
            return {
                top: 0,
                left: 0,
            };
        }
        var parentRect = parent.getBoundingClientRect();
        var parentLeft = parentRect.left;
        var parentTop = parentRect.top;
        var selfRect = self.getBoundingClientRect();
        var position = this.getDraggablePosition();
        var scrollLeft = parent.scrollLeft;
        var scrollTop = parent.scrollTop;
        this.offsetFromParent = {
            left: selfRect.left - parentLeft + scrollLeft - position.x * scale,
            top: selfRect.top - parentTop + scrollTop - position.y * scale,
        };
    };
    Rnd.prototype.render = function () {
        var _a = this.props, disableDragging = _a.disableDragging, style = _a.style, dragHandleClassName = _a.dragHandleClassName, position = _a.position, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, dragAxis = _a.dragAxis, dragGrid = _a.dragGrid, bounds = _a.bounds, enableUserSelectHack = _a.enableUserSelectHack, cancel = _a.cancel, children = _a.children, onResizeStart = _a.onResizeStart, onResize = _a.onResize, onResizeStop = _a.onResizeStop, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragStop = _a.onDragStop, resizeHandleStyles = _a.resizeHandleStyles, resizeHandleClasses = _a.resizeHandleClasses, resizeHandleComponent = _a.resizeHandleComponent, enableResizing = _a.enableResizing, resizeGrid = _a.resizeGrid, resizeHandleWrapperClass = _a.resizeHandleWrapperClass, resizeHandleWrapperStyle = _a.resizeHandleWrapperStyle, scale = _a.scale, allowAnyClick = _a.allowAnyClick, resizableProps = __rest(_a, ["disableDragging", "style", "dragHandleClassName", "position", "onMouseDown", "onMouseUp", "dragAxis", "dragGrid", "bounds", "enableUserSelectHack", "cancel", "children", "onResizeStart", "onResize", "onResizeStop", "onDragStart", "onDrag", "onDragStop", "resizeHandleStyles", "resizeHandleClasses", "resizeHandleComponent", "enableResizing", "resizeGrid", "resizeHandleWrapperClass", "resizeHandleWrapperStyle", "scale", "allowAnyClick"]);
        var defaultValue = this.props.default ? __assign({}, this.props.default) : undefined;
        // Remove unknown props, see also https://reactjs.org/warnings/unknown-prop.html
        delete resizableProps.default;
        var cursorStyle = disableDragging || dragHandleClassName ? { cursor: "auto" } : { cursor: "move" };
        var innerStyle = __assign(__assign(__assign({}, resizableStyle), cursorStyle), style);
        var _b = this.offsetFromParent, left = _b.left, top = _b.top;
        var draggablePosition;
        if (position) {
            draggablePosition = {
                x: position.x - left,
                y: position.y - top,
            };
        }
        // INFO: Make uncontorolled component when resizing to control position by setPostion.
        var pos = this.state.resizing ? undefined : draggablePosition;
        var dragAxisOrUndefined = this.state.resizing ? "both" : dragAxis;
        return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Draggable, { ref: this.refDraggable, handle: dragHandleClassName ? ".".concat(dragHandleClassName) : undefined, defaultPosition: defaultValue, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop, axis: dragAxisOrUndefined, disabled: disableDragging, grid: dragGrid, bounds: bounds ? this.state.bounds : undefined, position: pos, enableUserSelectHack: enableUserSelectHack, cancel: cancel, scale: scale, allowAnyClick: allowAnyClick, nodeRef: this.resizableElement },
            (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(re_resizable__WEBPACK_IMPORTED_MODULE_2__.Resizable, __assign({}, resizableProps, { ref: this.refResizable, defaultSize: defaultValue, size: this.props.size, enable: typeof enableResizing === "boolean" ? getEnableResizingByFlag(enableResizing) : enableResizing, onResizeStart: this.onResizeStart, onResize: this.onResize, onResizeStop: this.onResizeStop, style: innerStyle, minWidth: this.props.minWidth, minHeight: this.props.minHeight, maxWidth: this.state.resizing ? this.state.maxWidth : this.props.maxWidth, maxHeight: this.state.resizing ? this.state.maxHeight : this.props.maxHeight, grid: resizeGrid, handleWrapperClass: resizeHandleWrapperClass, handleWrapperStyle: resizeHandleWrapperStyle, lockAspectRatio: this.props.lockAspectRatio, lockAspectRatioExtraWidth: this.props.lockAspectRatioExtraWidth, lockAspectRatioExtraHeight: this.props.lockAspectRatioExtraHeight, handleStyles: resizeHandleStyles, handleClasses: resizeHandleClasses, handleComponent: resizeHandleComponent, scale: this.props.scale }), children)));
    };
    Rnd.defaultProps = {
        maxWidth: Number.MAX_SAFE_INTEGER,
        maxHeight: Number.MAX_SAFE_INTEGER,
        scale: 1,
        onResizeStart: function () { },
        onResize: function () { },
        onResizeStop: function () { },
        onDragStart: function () { },
        onDrag: function () { },
        onDragStop: function () { },
    };
    return Rnd;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent));




/***/ }),

/***/ "./src/renderer/components/Application.tsx":
/*!*************************************************!*\
  !*** ./src/renderer/components/Application.tsx ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_rnd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-rnd */ "./node_modules/react-rnd/lib/index.js");
/* harmony import */ var _Application_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Application.scss */ "./src/renderer/components/Application.scss");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");




// @ts-ignore
const Micro = react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => __webpack_require__.e(/*! import() */ "webpack_container_remote_microfr_Application").then(__webpack_require__.t.bind(__webpack_require__, /*! microfr/Application */ "webpack/container/remote/microfr/Application", 23)));
const Microtwo = react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => __webpack_require__.e(/*! import() */ "webpack_container_remote_microfrtwo_Applicationtwo").then(__webpack_require__.t.bind(__webpack_require__, /*! microfrtwo/Applicationtwo */ "webpack/container/remote/microfrtwo/Applicationtwo", 23)));
const Application = () => {
    const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const style = {
        display: "flex",
        justifyContent: "center",
        border: "solid 1px black",
        background: "#f0f0f0",
        alignItems: "stretch",
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        }
        else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: 'erwt' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'header' },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'main-heading' },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: 'themed' }, "Omron - Robot Dashboard PoC"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { style: style, default: {
                x: 0,
                y: 0,
                width: 320,
                height: 200
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Micro, { className: {} })))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { style: style, default: {
                x: 0,
                y: 0,
                width: 320,
                height: 200
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Microtwo, { className: {} }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "webpack/container/reference/microfrtwo":
/*!******************************************************************!*\
  !*** external "microfrtwo@http://localhost:8081/remoteEntry.js" ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var __webpack_error__ = new Error();
module.exports = new Promise((resolve, reject) => {
	if(typeof microfrtwo !== "undefined") return resolve();
	__webpack_require__.l("http://localhost:8081/remoteEntry.js", (event) => {
		if(typeof microfrtwo !== "undefined") return resolve();
		var errorType = event && (event.type === 'load' ? 'missing' : event.type);
		var realSrc = event && event.target && event.target.src;
		__webpack_error__.message = 'Loading script failed.\n(' + errorType + ': ' + realSrc + ')';
		__webpack_error__.name = 'ScriptExternalLoadError';
		__webpack_error__.type = errorType;
		__webpack_error__.request = realSrc;
		reject(__webpack_error__);
	}, "microfrtwo");
}).then(() => (microfrtwo));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("42fadfe01090a895276a")
/******/ })();
/******/ 
/******/ /* webpack/runtime/remotes loading */
/******/ (() => {
/******/ 	var chunkMapping = {
/******/ 		"webpack_container_remote_microfr_Application": [
/******/ 			"webpack/container/remote/microfr/Application"
/******/ 		],
/******/ 		"webpack_container_remote_microfrtwo_Applicationtwo": [
/******/ 			"webpack/container/remote/microfrtwo/Applicationtwo"
/******/ 		]
/******/ 	};
/******/ 	var idToExternalAndNameMapping = {
/******/ 		"webpack/container/remote/microfr/Application": [
/******/ 			"default",
/******/ 			"./Application",
/******/ 			"webpack/container/reference/microfr"
/******/ 		],
/******/ 		"webpack/container/remote/microfrtwo/Applicationtwo": [
/******/ 			"default",
/******/ 			"./Applicationtwo",
/******/ 			"webpack/container/reference/microfrtwo"
/******/ 		]
/******/ 	};
/******/ 	__webpack_require__.f.remotes = (chunkId, promises) => {
/******/ 		if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 			chunkMapping[chunkId].forEach((id) => {
/******/ 				var getScope = __webpack_require__.R;
/******/ 				if(!getScope) getScope = [];
/******/ 				var data = idToExternalAndNameMapping[id];
/******/ 				if(getScope.indexOf(data) >= 0) return;
/******/ 				getScope.push(data);
/******/ 				if(data.p) return promises.push(data.p);
/******/ 				var onError = (error) => {
/******/ 					if(!error) error = new Error("Container missing");
/******/ 					if(typeof error.message === "string")
/******/ 						error.message += '\nwhile loading "' + data[1] + '" from ' + data[2];
/******/ 					__webpack_require__.m[id] = () => {
/******/ 						throw error;
/******/ 					}
/******/ 					data.p = 0;
/******/ 				};
/******/ 				var handleFunction = (fn, arg1, arg2, d, next, first) => {
/******/ 					try {
/******/ 						var promise = fn(arg1, arg2);
/******/ 						if(promise && promise.then) {
/******/ 							var p = promise.then((result) => (next(result, d)), onError);
/******/ 							if(first) promises.push(data.p = p); else return p;
/******/ 						} else {
/******/ 							return next(promise, d, first);
/******/ 						}
/******/ 					} catch(error) {
/******/ 						onError(error);
/******/ 					}
/******/ 				}
/******/ 				var onExternal = (external, _, first) => (external ? handleFunction(__webpack_require__.I, data[0], 0, external, onInitialized, first) : onError());
/******/ 				var onInitialized = (_, external, first) => (handleFunction(external.get, data[1], getScope, 0, onFactory, first));
/******/ 				var onFactory = (factory) => {
/******/ 					data.p = 1;
/******/ 					__webpack_require__.m[id] = (module) => {
/******/ 						module.exports = factory();
/******/ 					}
/******/ 				};
/******/ 				handleFunction(__webpack_require__, data[2], 0, 0, onExternal, 1);
/******/ 			});
/******/ 		}
/******/ 	}
/******/ })();
/******/ 
/******/ /* webpack/runtime/sharing */
/******/ (() => {
/******/ 	__webpack_require__.S = {};
/******/ 	var initPromises = {};
/******/ 	var initTokens = {};
/******/ 	__webpack_require__.I = (name, initScope) => {
/******/ 		if(!initScope) initScope = [];
/******/ 		// handling circular init calls
/******/ 		var initToken = initTokens[name];
/******/ 		if(!initToken) initToken = initTokens[name] = {};
/******/ 		if(initScope.indexOf(initToken) >= 0) return;
/******/ 		initScope.push(initToken);
/******/ 		// only runs once
/******/ 		if(initPromises[name]) return initPromises[name];
/******/ 		// creates a new share scope if needed
/******/ 		if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 		// runs all init snippets from all modules reachable
/******/ 		var scope = __webpack_require__.S[name];
/******/ 		var warn = (msg) => (typeof console !== "undefined" && console.warn && console.warn(msg));
/******/ 		var uniqueName = "electron-react-typescript-webpack-2023";
/******/ 		var register = (name, version, factory, eager) => {
/******/ 			var versions = scope[name] = scope[name] || {};
/******/ 			var activeVersion = versions[version];
/******/ 			if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 		};
/******/ 		var initExternal = (id) => {
/******/ 			var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 			try {
/******/ 				var module = __webpack_require__(id);
/******/ 				if(!module) return;
/******/ 				var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 				if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 				var initResult = initFn(module);
/******/ 				if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 			} catch(err) { handleError(err); }
/******/ 		}
/******/ 		var promises = [];
/******/ 		switch(name) {
/******/ 			case "default": {
/******/ 				initExternal("webpack/container/reference/microfr");
/******/ 				initExternal("webpack/container/reference/microfrtwo");
/******/ 			}
/******/ 			break;
/******/ 		}
/******/ 		if(!promises.length) return initPromises[name] = 1;
/******/ 		return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 	};
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3dpbmRvdy4wMjQyNmU5YTY0MzRlMGVjMzVlNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYyxhQUFhLCtDQUErQyx1REFBdUQsV0FBVywwQ0FBMEMseUNBQXlDLFNBQWdCLGdCQUFnQixxQkFBcUIsbUJBQW1CLGtEQUFrRCxTQUFTLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7QUNBclg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUyxLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdDQUFnQztBQUNoRTtBQUNBO0FBQ0EsZ0NBQWdDLDhCQUE4QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxpREFBaUQsaUNBQWlDLHFFQUFxRTtBQUN2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUcsaUJBQWlCOzs7QUFHcEI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpQ0FBaUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3BFM0I7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSwyQ0FBMkM7VUFDM0MsT0FBTztVQUNQO1VBQ0E7VUFDQSxNQUFNO1VBQ047VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsR0FBRztVQUNIO1VBQ0E7Ozs7O1VDOURBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLG9KQUFvSjtVQUNwSjtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLElBQUksYUFBYTtVQUNqQjtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9jbHN4L2Rpc3QvY2xzeC5tLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL2Zhc3QtbWVtb2l6ZS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9oYXMuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmUtcmVzaXphYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9yZS1yZXNpemFibGUvbGliL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmVhY3QtZHJhZ2dhYmxlL2J1aWxkL2Nqcy9EcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmVhY3QtZHJhZ2dhYmxlL2J1aWxkL2Nqcy9EcmFnZ2FibGVDb3JlLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS9idWlsZC9janMvY2pzLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS9idWlsZC9janMvdXRpbHMvZG9tRm5zLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS9idWlsZC9janMvdXRpbHMvZ2V0UHJlZml4LmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS9idWlsZC9janMvdXRpbHMvbG9nLmpzIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS9idWlsZC9janMvdXRpbHMvcG9zaXRpb25GbnMuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmVhY3QtZHJhZ2dhYmxlL2J1aWxkL2Nqcy91dGlscy9zaGltcy5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm5kL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy8uL3NyYy9yZW5kZXJlci9jb21wb25lbnRzL0FwcGxpY2F0aW9uLnRzeCIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvd2VicGFjay9ydW50aW1lL3JlbW90ZXMgbG9hZGluZyIsIndlYnBhY2s6Ly9lbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyMy93ZWJwYWNrL3J1bnRpbWUvc2hhcmluZyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByKGUpe3ZhciB0LGYsbj1cIlwiO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlfHxcIm51bWJlclwiPT10eXBlb2YgZSluKz1lO2Vsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpaWYoQXJyYXkuaXNBcnJheShlKSlmb3IodD0wO3Q8ZS5sZW5ndGg7dCsrKWVbdF0mJihmPXIoZVt0XSkpJiYobiYmKG4rPVwiIFwiKSxuKz1mKTtlbHNlIGZvcih0IGluIGUpZVt0XSYmKG4mJihuKz1cIiBcIiksbis9dCk7cmV0dXJuIG59ZXhwb3J0IGZ1bmN0aW9uIGNsc3goKXtmb3IodmFyIGUsdCxmPTAsbj1cIlwiO2Y8YXJndW1lbnRzLmxlbmd0aDspKGU9YXJndW1lbnRzW2YrK10pJiYodD1yKGUpKSYmKG4mJihuKz1cIiBcIiksbis9dCk7cmV0dXJuIG59ZXhwb3J0IGRlZmF1bHQgY2xzeDsiLCIvL1xuLy8gTWFpblxuLy9cblxuZnVuY3Rpb24gbWVtb2l6ZSAoZm4sIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlID0gb3B0aW9ucyAmJiBvcHRpb25zLmNhY2hlXG4gICAgPyBvcHRpb25zLmNhY2hlXG4gICAgOiBjYWNoZURlZmF1bHRcblxuICB2YXIgc2VyaWFsaXplciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemVyXG4gICAgPyBvcHRpb25zLnNlcmlhbGl6ZXJcbiAgICA6IHNlcmlhbGl6ZXJEZWZhdWx0XG5cbiAgdmFyIHN0cmF0ZWd5ID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0cmF0ZWd5XG4gICAgPyBvcHRpb25zLnN0cmF0ZWd5XG4gICAgOiBzdHJhdGVneURlZmF1bHRcblxuICByZXR1cm4gc3RyYXRlZ3koZm4sIHtcbiAgICBjYWNoZTogY2FjaGUsXG4gICAgc2VyaWFsaXplcjogc2VyaWFsaXplclxuICB9KVxufVxuXG4vL1xuLy8gU3RyYXRlZ3lcbi8vXG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIC8vIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAndW5zYWZlJyBwcmltaXRpdmUgZm9yIG91ciBuZWVkc1xufVxuXG5mdW5jdGlvbiBtb25hZGljIChmbiwgY2FjaGUsIHNlcmlhbGl6ZXIsIGFyZykge1xuICB2YXIgY2FjaGVLZXkgPSBpc1ByaW1pdGl2ZShhcmcpID8gYXJnIDogc2VyaWFsaXplcihhcmcpXG5cbiAgdmFyIGNvbXB1dGVkVmFsdWUgPSBjYWNoZS5nZXQoY2FjaGVLZXkpXG4gIGlmICh0eXBlb2YgY29tcHV0ZWRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb21wdXRlZFZhbHVlID0gZm4uY2FsbCh0aGlzLCBhcmcpXG4gICAgY2FjaGUuc2V0KGNhY2hlS2V5LCBjb21wdXRlZFZhbHVlKVxuICB9XG5cbiAgcmV0dXJuIGNvbXB1dGVkVmFsdWVcbn1cblxuZnVuY3Rpb24gdmFyaWFkaWMgKGZuLCBjYWNoZSwgc2VyaWFsaXplcikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMylcbiAgdmFyIGNhY2hlS2V5ID0gc2VyaWFsaXplcihhcmdzKVxuXG4gIHZhciBjb21wdXRlZFZhbHVlID0gY2FjaGUuZ2V0KGNhY2hlS2V5KVxuICBpZiAodHlwZW9mIGNvbXB1dGVkVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29tcHV0ZWRWYWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgY2FjaGUuc2V0KGNhY2hlS2V5LCBjb21wdXRlZFZhbHVlKVxuICB9XG5cbiAgcmV0dXJuIGNvbXB1dGVkVmFsdWVcbn1cblxuZnVuY3Rpb24gYXNzZW1ibGUgKGZuLCBjb250ZXh0LCBzdHJhdGVneSwgY2FjaGUsIHNlcmlhbGl6ZSkge1xuICByZXR1cm4gc3RyYXRlZ3kuYmluZChcbiAgICBjb250ZXh0LFxuICAgIGZuLFxuICAgIGNhY2hlLFxuICAgIHNlcmlhbGl6ZVxuICApXG59XG5cbmZ1bmN0aW9uIHN0cmF0ZWd5RGVmYXVsdCAoZm4sIG9wdGlvbnMpIHtcbiAgdmFyIHN0cmF0ZWd5ID0gZm4ubGVuZ3RoID09PSAxID8gbW9uYWRpYyA6IHZhcmlhZGljXG5cbiAgcmV0dXJuIGFzc2VtYmxlKFxuICAgIGZuLFxuICAgIHRoaXMsXG4gICAgc3RyYXRlZ3ksXG4gICAgb3B0aW9ucy5jYWNoZS5jcmVhdGUoKSxcbiAgICBvcHRpb25zLnNlcmlhbGl6ZXJcbiAgKVxufVxuXG5mdW5jdGlvbiBzdHJhdGVneVZhcmlhZGljIChmbiwgb3B0aW9ucykge1xuICB2YXIgc3RyYXRlZ3kgPSB2YXJpYWRpY1xuXG4gIHJldHVybiBhc3NlbWJsZShcbiAgICBmbixcbiAgICB0aGlzLFxuICAgIHN0cmF0ZWd5LFxuICAgIG9wdGlvbnMuY2FjaGUuY3JlYXRlKCksXG4gICAgb3B0aW9ucy5zZXJpYWxpemVyXG4gIClcbn1cblxuZnVuY3Rpb24gc3RyYXRlZ3lNb25hZGljIChmbiwgb3B0aW9ucykge1xuICB2YXIgc3RyYXRlZ3kgPSBtb25hZGljXG5cbiAgcmV0dXJuIGFzc2VtYmxlKFxuICAgIGZuLFxuICAgIHRoaXMsXG4gICAgc3RyYXRlZ3ksXG4gICAgb3B0aW9ucy5jYWNoZS5jcmVhdGUoKSxcbiAgICBvcHRpb25zLnNlcmlhbGl6ZXJcbiAgKVxufVxuXG4vL1xuLy8gU2VyaWFsaXplclxuLy9cblxuZnVuY3Rpb24gc2VyaWFsaXplckRlZmF1bHQgKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKVxufVxuXG4vL1xuLy8gQ2FjaGVcbi8vXG5cbmZ1bmN0aW9uIE9iamVjdFdpdGhvdXRQcm90b3R5cGVDYWNoZSAoKSB7XG4gIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG59XG5cbk9iamVjdFdpdGhvdXRQcm90b3R5cGVDYWNoZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gKGtleSBpbiB0aGlzLmNhY2hlKVxufVxuXG5PYmplY3RXaXRob3V0UHJvdG90eXBlQ2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxufVxuXG5PYmplY3RXaXRob3V0UHJvdG90eXBlQ2FjaGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRoaXMuY2FjaGVba2V5XSA9IHZhbHVlXG59XG5cbnZhciBjYWNoZURlZmF1bHQgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlICgpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFdpdGhvdXRQcm90b3R5cGVDYWNoZSgpXG4gIH1cbn1cblxuLy9cbi8vIEFQSVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplXG5tb2R1bGUuZXhwb3J0cy5zdHJhdGVnaWVzID0ge1xuICB2YXJpYWRpYzogc3RyYXRlZ3lWYXJpYWRpYyxcbiAgbW9uYWRpYzogc3RyYXRlZ3lNb25hZGljXG59XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSByZXF1aXJlKCcuL2xpYi9oYXMnKTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkgeyAvKiovIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLicgK1xuICAgICAgICAgICAgICAnVGhpcyBvZnRlbiBoYXBwZW5zIGJlY2F1c2Ugb2YgdHlwb3Mgc3VjaCBhcyBgUHJvcFR5cGVzLmZ1bmN0aW9uYCBpbnN0ZWFkIG9mIGBQcm9wVHlwZXMuZnVuY2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL2xpYi9oYXMnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJpZ2ludDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2JpZ2ludCcpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlLCBkYXRhKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyA/IGRhdGE6IHt9O1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpLFxuICAgICAgICAgIHtleHBlY3RlZFR5cGU6IGV4cGVjdGVkVHlwZX1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgdmFyIGNoZWNrZXJSZXN1bHQgPSBjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoY2hlY2tlclJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZXJSZXN1bHQuZGF0YSAmJiBoYXMoY2hlY2tlclJlc3VsdC5kYXRhLCAnZXhwZWN0ZWRUeXBlJykpIHtcbiAgICAgICAgICBleHBlY3RlZFR5cGVzLnB1c2goY2hlY2tlclJlc3VsdC5kYXRhLmV4cGVjdGVkVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBleHBlY3RlZFR5cGVzTWVzc2FnZSA9IChleHBlY3RlZFR5cGVzLmxlbmd0aCA+IDApID8gJywgZXhwZWN0ZWQgb25lIG9mIHR5cGUgWycgKyBleHBlY3RlZFR5cGVzLmpvaW4oJywgJykgKyAnXSc6ICcnO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCcgKyBleHBlY3RlZFR5cGVzTWVzc2FnZSArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52YWxpZFZhbGlkYXRvckVycm9yKGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIGtleSwgdHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5ICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlICsgJ2AuJ1xuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRWYWxpZGF0b3JFcnJvcihjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBrZXksIGdldFByZWNpc2VUeXBlKGNoZWNrZXIpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbSBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmIChoYXMoc2hhcGVUeXBlcywga2V5KSAmJiB0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsaWRhdG9yRXJyb3IoY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwga2V5LCBnZXRQcmVjaXNlVHlwZShjaGVja2VyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZXNpemVyIH0gZnJvbSAnLi9yZXNpemVyJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ2Zhc3QtbWVtb2l6ZSc7XG52YXIgREVGQVVMVF9TSVpFID0ge1xuICAgIHdpZHRoOiAnYXV0bycsXG4gICAgaGVpZ2h0OiAnYXV0bycsXG59O1xudmFyIGNsYW1wID0gbWVtb2l6ZShmdW5jdGlvbiAobiwgbWluLCBtYXgpIHsgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG4sIG1heCksIG1pbik7IH0pO1xudmFyIHNuYXAgPSBtZW1vaXplKGZ1bmN0aW9uIChuLCBzaXplKSB7IHJldHVybiBNYXRoLnJvdW5kKG4gLyBzaXplKSAqIHNpemU7IH0pO1xudmFyIGhhc0RpcmVjdGlvbiA9IG1lbW9pemUoZnVuY3Rpb24gKGRpciwgdGFyZ2V0KSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoZGlyLCAnaScpLnRlc3QodGFyZ2V0KTtcbn0pO1xuLy8gSU5GTzogSW4gY2FzZSBvZiB3aW5kb3cgaXMgYSBQcm94eSBhbmQgZG9lcyBub3QgcG9yeHkgRXZlbnRzIGNvcnJlY3RseSwgdXNlIGlzVG91Y2hFdmVudCAmIGlzTW91c2VFdmVudCB0byBkaXN0aW5ndWlzaCBldmVudCB0eXBlIGluc3RlYWQgb2YgYGluc3RhbmNlb2ZgLlxudmFyIGlzVG91Y2hFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiBCb29sZWFuKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGgpO1xufTtcbnZhciBpc01vdXNlRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICByZXR1cm4gQm9vbGVhbigoZXZlbnQuY2xpZW50WCB8fCBldmVudC5jbGllbnRYID09PSAwKSAmJlxuICAgICAgICAoZXZlbnQuY2xpZW50WSB8fCBldmVudC5jbGllbnRZID09PSAwKSk7XG59O1xudmFyIGZpbmRDbG9zZXN0U25hcCA9IG1lbW9pemUoZnVuY3Rpb24gKG4sIHNuYXBBcnJheSwgc25hcEdhcCkge1xuICAgIGlmIChzbmFwR2FwID09PSB2b2lkIDApIHsgc25hcEdhcCA9IDA7IH1cbiAgICB2YXIgY2xvc2VzdEdhcEluZGV4ID0gc25hcEFycmF5LnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3VyciwgaW5kZXgpIHsgcmV0dXJuIChNYXRoLmFicyhjdXJyIC0gbikgPCBNYXRoLmFicyhzbmFwQXJyYXlbcHJldl0gLSBuKSA/IGluZGV4IDogcHJldik7IH0sIDApO1xuICAgIHZhciBnYXAgPSBNYXRoLmFicyhzbmFwQXJyYXlbY2xvc2VzdEdhcEluZGV4XSAtIG4pO1xuICAgIHJldHVybiBzbmFwR2FwID09PSAwIHx8IGdhcCA8IHNuYXBHYXAgPyBzbmFwQXJyYXlbY2xvc2VzdEdhcEluZGV4XSA6IG47XG59KTtcbnZhciBlbmRzV2l0aCA9IG1lbW9pemUoZnVuY3Rpb24gKHN0ciwgc2VhcmNoU3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIHNlYXJjaFN0ci5sZW5ndGgsIHNlYXJjaFN0ci5sZW5ndGgpID09PSBzZWFyY2hTdHI7XG59KTtcbnZhciBnZXRTdHJpbmdTaXplID0gbWVtb2l6ZShmdW5jdGlvbiAobikge1xuICAgIG4gPSBuLnRvU3RyaW5nKCk7XG4gICAgaWYgKG4gPT09ICdhdXRvJykge1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgaWYgKGVuZHNXaXRoKG4sICdweCcpKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBpZiAoZW5kc1dpdGgobiwgJyUnKSkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgaWYgKGVuZHNXaXRoKG4sICd2aCcpKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBpZiAoZW5kc1dpdGgobiwgJ3Z3JykpIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIGlmIChlbmRzV2l0aChuLCAndm1heCcpKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBpZiAoZW5kc1dpdGgobiwgJ3ZtaW4nKSkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG4gICAgcmV0dXJuIG4gKyBcInB4XCI7XG59KTtcbnZhciBnZXRQaXhlbFNpemUgPSBmdW5jdGlvbiAoc2l6ZSwgcGFyZW50U2l6ZSwgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQpIHtcbiAgICBpZiAoc2l6ZSAmJiB0eXBlb2Ygc2l6ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGVuZHNXaXRoKHNpemUsICdweCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHNpemUucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRzV2l0aChzaXplLCAnJScpKSB7XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSBOdW1iZXIoc2l6ZS5yZXBsYWNlKCclJywgJycpKSAvIDEwMDtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRTaXplICogcmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZHNXaXRoKHNpemUsICd2dycpKSB7XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSBOdW1iZXIoc2l6ZS5yZXBsYWNlKCd2dycsICcnKSkgLyAxMDA7XG4gICAgICAgICAgICByZXR1cm4gaW5uZXJXaWR0aCAqIHJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmRzV2l0aChzaXplLCAndmgnKSkge1xuICAgICAgICAgICAgdmFyIHJhdGlvID0gTnVtYmVyKHNpemUucmVwbGFjZSgndmgnLCAnJykpIC8gMTAwO1xuICAgICAgICAgICAgcmV0dXJuIGlubmVySGVpZ2h0ICogcmF0aW87XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNpemU7XG59O1xudmFyIGNhbGN1bGF0ZU5ld01heCA9IG1lbW9pemUoZnVuY3Rpb24gKHBhcmVudFNpemUsIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0LCBtaW5XaWR0aCwgbWluSGVpZ2h0KSB7XG4gICAgbWF4V2lkdGggPSBnZXRQaXhlbFNpemUobWF4V2lkdGgsIHBhcmVudFNpemUud2lkdGgsIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0KTtcbiAgICBtYXhIZWlnaHQgPSBnZXRQaXhlbFNpemUobWF4SGVpZ2h0LCBwYXJlbnRTaXplLmhlaWdodCwgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQpO1xuICAgIG1pbldpZHRoID0gZ2V0UGl4ZWxTaXplKG1pbldpZHRoLCBwYXJlbnRTaXplLndpZHRoLCBpbm5lcldpZHRoLCBpbm5lckhlaWdodCk7XG4gICAgbWluSGVpZ2h0ID0gZ2V0UGl4ZWxTaXplKG1pbkhlaWdodCwgcGFyZW50U2l6ZS5oZWlnaHQsIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBtYXhXaWR0aDogdHlwZW9mIG1heFdpZHRoID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE51bWJlcihtYXhXaWR0aCksXG4gICAgICAgIG1heEhlaWdodDogdHlwZW9mIG1heEhlaWdodCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBOdW1iZXIobWF4SGVpZ2h0KSxcbiAgICAgICAgbWluV2lkdGg6IHR5cGVvZiBtaW5XaWR0aCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBOdW1iZXIobWluV2lkdGgpLFxuICAgICAgICBtaW5IZWlnaHQ6IHR5cGVvZiBtaW5IZWlnaHQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTnVtYmVyKG1pbkhlaWdodCksXG4gICAgfTtcbn0pO1xudmFyIGRlZmluZWRQcm9wcyA9IFtcbiAgICAnYXMnLFxuICAgICdzdHlsZScsXG4gICAgJ2NsYXNzTmFtZScsXG4gICAgJ2dyaWQnLFxuICAgICdzbmFwJyxcbiAgICAnYm91bmRzJyxcbiAgICAnYm91bmRzQnlEaXJlY3Rpb24nLFxuICAgICdzaXplJyxcbiAgICAnZGVmYXVsdFNpemUnLFxuICAgICdtaW5XaWR0aCcsXG4gICAgJ21pbkhlaWdodCcsXG4gICAgJ21heFdpZHRoJyxcbiAgICAnbWF4SGVpZ2h0JyxcbiAgICAnbG9ja0FzcGVjdFJhdGlvJyxcbiAgICAnbG9ja0FzcGVjdFJhdGlvRXh0cmFXaWR0aCcsXG4gICAgJ2xvY2tBc3BlY3RSYXRpb0V4dHJhSGVpZ2h0JyxcbiAgICAnZW5hYmxlJyxcbiAgICAnaGFuZGxlU3R5bGVzJyxcbiAgICAnaGFuZGxlQ2xhc3NlcycsXG4gICAgJ2hhbmRsZVdyYXBwZXJTdHlsZScsXG4gICAgJ2hhbmRsZVdyYXBwZXJDbGFzcycsXG4gICAgJ2NoaWxkcmVuJyxcbiAgICAnb25SZXNpemVTdGFydCcsXG4gICAgJ29uUmVzaXplJyxcbiAgICAnb25SZXNpemVTdG9wJyxcbiAgICAnaGFuZGxlQ29tcG9uZW50JyxcbiAgICAnc2NhbGUnLFxuICAgICdyZXNpemVSYXRpbycsXG4gICAgJ3NuYXBHYXAnLFxuXTtcbi8vIEhBQ0s6IFRoaXMgY2xhc3MgaXMgdXNlZCB0byBjYWxjdWxhdGUgJSBzaXplLlxudmFyIGJhc2VDbGFzc05hbWUgPSAnX19yZXNpemFibGVfYmFzZV9fJztcbnZhciBSZXNpemFibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlc2l6YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXNpemFibGUocHJvcHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJhdGlvID0gMTtcbiAgICAgICAgX3RoaXMucmVzaXphYmxlID0gbnVsbDtcbiAgICAgICAgLy8gRm9yIHBhcmVudCBib3VuZGFyeVxuICAgICAgICBfdGhpcy5wYXJlbnRMZWZ0ID0gMDtcbiAgICAgICAgX3RoaXMucGFyZW50VG9wID0gMDtcbiAgICAgICAgLy8gRm9yIGJvdW5kYXJ5XG4gICAgICAgIF90aGlzLnJlc2l6YWJsZUxlZnQgPSAwO1xuICAgICAgICBfdGhpcy5yZXNpemFibGVSaWdodCA9IDA7XG4gICAgICAgIF90aGlzLnJlc2l6YWJsZVRvcCA9IDA7XG4gICAgICAgIF90aGlzLnJlc2l6YWJsZUJvdHRvbSA9IDA7XG4gICAgICAgIC8vIEZvciB0YXJnZXQgYm91bmRhcnlcbiAgICAgICAgX3RoaXMudGFyZ2V0TGVmdCA9IDA7XG4gICAgICAgIF90aGlzLnRhcmdldFRvcCA9IDA7XG4gICAgICAgIF90aGlzLmFwcGVuZEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnJlc2l6YWJsZSB8fCAhX3RoaXMud2luZG93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gX3RoaXMucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IF90aGlzLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMCwgMCknO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5mbGV4ID0gJzAgMCAxMDAlJztcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9IGJhc2VDbGFzc05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMucmVtb3ZlQmFzZSA9IGZ1bmN0aW9uIChiYXNlKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gX3RoaXMucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGJhc2UpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5yZWYgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNpemFibGUgPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzUmVzaXppbmc6IGZhbHNlLFxuICAgICAgICAgICAgd2lkdGg6IHR5cGVvZiAoX3RoaXMucHJvcHNTaXplICYmIF90aGlzLnByb3BzU2l6ZS53aWR0aCkgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyAnYXV0bydcbiAgICAgICAgICAgICAgICA6IF90aGlzLnByb3BzU2l6ZSAmJiBfdGhpcy5wcm9wc1NpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHR5cGVvZiAoX3RoaXMucHJvcHNTaXplICYmIF90aGlzLnByb3BzU2l6ZS5oZWlnaHQpID09PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgID8gJ2F1dG8nXG4gICAgICAgICAgICAgICAgOiBfdGhpcy5wcm9wc1NpemUgJiYgX3RoaXMucHJvcHNTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIG9yaWdpbmFsOiB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrZ3JvdW5kU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMCknLFxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgICAgICBib3R0b206ICcwJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsZXhCYXNpczogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vblJlc2l6ZVN0YXJ0ID0gX3RoaXMub25SZXNpemVTdGFydC5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMub25Nb3VzZU1vdmUgPSBfdGhpcy5vbk1vdXNlTW92ZS5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMub25Nb3VzZVVwID0gX3RoaXMub25Nb3VzZVVwLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXNpemFibGUucHJvdG90eXBlLCBcInBhcmVudE5vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXNpemFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc2l6YWJsZS5wYXJlbnROb2RlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc2l6YWJsZS5wcm90b3R5cGUsIFwid2luZG93XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzaXphYmxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzaXphYmxlLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc2l6YWJsZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc2l6YWJsZS5wcm90b3R5cGUsIFwicHJvcHNTaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zaXplIHx8IHRoaXMucHJvcHMuZGVmYXVsdFNpemUgfHwgREVGQVVMVF9TSVpFO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlc2l6YWJsZS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlICYmIHRoaXMud2luZG93KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9yZ1dpZHRoID0gdGhpcy5yZXNpemFibGUub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgdmFyIG9yZ0hlaWdodCA9IHRoaXMucmVzaXphYmxlLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAvLyBIQUNLOiBTZXQgcG9zaXRpb24gYHJlbGF0aXZlYCB0byBnZXQgcGFyZW50IHNpemUuXG4gICAgICAgICAgICAgICAgLy8gICAgICAgVGhpcyBpcyBiZWNhdXNlIHdoZW4gcmUtcmVzaXphYmxlIHNldCBgYWJzb2x1dGVgLCBJIGNhbiBub3QgZ2V0IGJhc2Ugd2lkdGggY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIHZhciBvcmdQb3NpdGlvbiA9IHRoaXMucmVzaXphYmxlLnN0eWxlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChvcmdQb3NpdGlvbiAhPT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6YWJsZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElORk86IFVzZSBvcmlnaW5hbCB3aWR0aCBvciBoZWlnaHQgaWYgc2V0IGF1dG8uXG4gICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLnJlc2l6YWJsZS5zdHlsZS53aWR0aCAhPT0gJ2F1dG8nID8gdGhpcy5yZXNpemFibGUub2Zmc2V0V2lkdGggOiBvcmdXaWR0aDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLnJlc2l6YWJsZS5zdHlsZS5oZWlnaHQgIT09ICdhdXRvJyA/IHRoaXMucmVzaXphYmxlLm9mZnNldEhlaWdodCA6IG9yZ0hlaWdodDtcbiAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemFibGUuc3R5bGUucG9zaXRpb24gPSBvcmdQb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXNpemFibGUucHJvdG90eXBlLCBcInNpemVTdHlsZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5wcm9wcy5zaXplO1xuICAgICAgICAgICAgdmFyIGdldFNpemUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5zdGF0ZVtrZXldID09PSAndW5kZWZpbmVkJyB8fCBfdGhpcy5zdGF0ZVtrZXldID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzU2l6ZSAmJiBfdGhpcy5wcm9wc1NpemVba2V5XSAmJiBlbmRzV2l0aChfdGhpcy5wcm9wc1NpemVba2V5XS50b1N0cmluZygpLCAnJScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aChfdGhpcy5zdGF0ZVtrZXldLnRvU3RyaW5nKCksICclJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zdGF0ZVtrZXldLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSBfdGhpcy5nZXRQYXJlbnRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IE51bWJlcihfdGhpcy5zdGF0ZVtrZXldLnRvU3RyaW5nKCkucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9ICh2YWx1ZSAvIHBhcmVudFNpemVba2V5XSkgKiAxMDA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50ICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRTdHJpbmdTaXplKF90aGlzLnN0YXRlW2tleV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHNpemUgJiYgdHlwZW9mIHNpemUud2lkdGggIT09ICd1bmRlZmluZWQnICYmICF0aGlzLnN0YXRlLmlzUmVzaXppbmdcbiAgICAgICAgICAgICAgICA/IGdldFN0cmluZ1NpemUoc2l6ZS53aWR0aClcbiAgICAgICAgICAgICAgICA6IGdldFNpemUoJ3dpZHRoJyk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gc2l6ZSAmJiB0eXBlb2Ygc2l6ZS5oZWlnaHQgIT09ICd1bmRlZmluZWQnICYmICF0aGlzLnN0YXRlLmlzUmVzaXppbmdcbiAgICAgICAgICAgICAgICA/IGdldFN0cmluZ1NpemUoc2l6ZS5oZWlnaHQpXG4gICAgICAgICAgICAgICAgOiBnZXRTaXplKCdoZWlnaHQnKTtcbiAgICAgICAgICAgIHJldHVybiB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFJlc2l6YWJsZS5wcm90b3R5cGUuZ2V0UGFyZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy53aW5kb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy53aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB0aGlzLndpbmRvdy5pbm5lckhlaWdodCB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYXNlID0gdGhpcy5hcHBlbmRCYXNlKCk7XG4gICAgICAgIGlmICghYmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIElORk86IFRvIGNhbGN1bGF0ZSBwYXJlbnQgd2lkdGggd2l0aCBmbGV4IGxheW91dFxuICAgICAgICB2YXIgd3JhcENoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHdyYXAgPSB0aGlzLnBhcmVudE5vZGUuc3R5bGUuZmxleFdyYXA7XG4gICAgICAgIGlmICh3cmFwICE9PSAnd3JhcCcpIHtcbiAgICAgICAgICAgIHdyYXBDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5zdHlsZS5mbGV4V3JhcCA9ICd3cmFwJztcbiAgICAgICAgICAgIC8vIEhBQ0s6IFVzZSByZWxhdGl2ZSB0byBnZXQgcGFyZW50IHBhZGRpbmcgc2l6ZVxuICAgICAgICB9XG4gICAgICAgIGJhc2Uuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICBiYXNlLnN0eWxlLm1pbldpZHRoID0gJzEwMCUnO1xuICAgICAgICBiYXNlLnN0eWxlLm1pbkhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgdmFyIHNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogYmFzZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogYmFzZS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh3cmFwQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnN0eWxlLmZsZXhXcmFwID0gd3JhcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUJhc2UoYmFzZSk7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy53aW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlc2l6YWJsZS5wcm90b3R5cGUudW5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy53aW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vbk1vdXNlVXApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZXNpemFibGUucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzaXphYmxlIHx8ICF0aGlzLndpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb21wdXRlZFN0eWxlID0gdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnJlc2l6YWJsZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUud2lkdGggfHwgdGhpcy5zaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnN0YXRlLmhlaWdodCB8fCB0aGlzLnNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgZmxleEJhc2lzOiBjb21wdXRlZFN0eWxlLmZsZXhCYXNpcyAhPT0gJ2F1dG8nID8gY29tcHV0ZWRTdHlsZS5mbGV4QmFzaXMgOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2luZG93KSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZXNpemFibGUucHJvdG90eXBlLmNyZWF0ZVNpemVGb3JDc3NQcm9wZXJ0eSA9IGZ1bmN0aW9uIChuZXdTaXplLCBraW5kKSB7XG4gICAgICAgIHZhciBwcm9wc1NpemUgPSB0aGlzLnByb3BzU2l6ZSAmJiB0aGlzLnByb3BzU2l6ZVtraW5kXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVba2luZF0gPT09ICdhdXRvJyAmJlxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5vcmlnaW5hbFtraW5kXSA9PT0gbmV3U2l6ZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBwcm9wc1NpemUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzU2l6ZSA9PT0gJ2F1dG8nKVxuICAgICAgICAgICAgPyAnYXV0bydcbiAgICAgICAgICAgIDogbmV3U2l6ZTtcbiAgICB9O1xuICAgIFJlc2l6YWJsZS5wcm90b3R5cGUuY2FsY3VsYXRlTmV3TWF4RnJvbUJvdW5kYXJ5ID0gZnVuY3Rpb24gKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcbiAgICAgICAgdmFyIGJvdW5kc0J5RGlyZWN0aW9uID0gdGhpcy5wcm9wcy5ib3VuZHNCeURpcmVjdGlvbjtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMuc3RhdGUuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgd2lkdGhCeURpcmVjdGlvbiA9IGJvdW5kc0J5RGlyZWN0aW9uICYmIGhhc0RpcmVjdGlvbignbGVmdCcsIGRpcmVjdGlvbik7XG4gICAgICAgIHZhciBoZWlnaHRCeURpcmVjdGlvbiA9IGJvdW5kc0J5RGlyZWN0aW9uICYmIGhhc0RpcmVjdGlvbigndG9wJywgZGlyZWN0aW9uKTtcbiAgICAgICAgdmFyIGJvdW5kV2lkdGg7XG4gICAgICAgIHZhciBib3VuZEhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYm91bmRzID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKHBhcmVudF8xKSB7XG4gICAgICAgICAgICAgICAgYm91bmRXaWR0aCA9IHdpZHRoQnlEaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlc2l6YWJsZVJpZ2h0IC0gdGhpcy5wYXJlbnRMZWZ0XG4gICAgICAgICAgICAgICAgICAgIDogcGFyZW50XzEub2Zmc2V0V2lkdGggKyAodGhpcy5wYXJlbnRMZWZ0IC0gdGhpcy5yZXNpemFibGVMZWZ0KTtcbiAgICAgICAgICAgICAgICBib3VuZEhlaWdodCA9IGhlaWdodEJ5RGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5yZXNpemFibGVCb3R0b20gLSB0aGlzLnBhcmVudFRvcFxuICAgICAgICAgICAgICAgICAgICA6IHBhcmVudF8xLm9mZnNldEhlaWdodCArICh0aGlzLnBhcmVudFRvcCAtIHRoaXMucmVzaXphYmxlVG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLmJvdW5kcyA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpbmRvdykge1xuICAgICAgICAgICAgICAgIGJvdW5kV2lkdGggPSB3aWR0aEJ5RGlyZWN0aW9uID8gdGhpcy5yZXNpemFibGVSaWdodCA6IHRoaXMud2luZG93LmlubmVyV2lkdGggLSB0aGlzLnJlc2l6YWJsZUxlZnQ7XG4gICAgICAgICAgICAgICAgYm91bmRIZWlnaHQgPSBoZWlnaHRCeURpcmVjdGlvbiA/IHRoaXMucmVzaXphYmxlQm90dG9tIDogdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnJlc2l6YWJsZVRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgICAgICAgYm91bmRXaWR0aCA9IHdpZHRoQnlEaXJlY3Rpb25cbiAgICAgICAgICAgICAgICA/IHRoaXMucmVzaXphYmxlUmlnaHQgLSB0aGlzLnRhcmdldExlZnRcbiAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuYm91bmRzLm9mZnNldFdpZHRoICsgKHRoaXMudGFyZ2V0TGVmdCAtIHRoaXMucmVzaXphYmxlTGVmdCk7XG4gICAgICAgICAgICBib3VuZEhlaWdodCA9IGhlaWdodEJ5RGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgPyB0aGlzLnJlc2l6YWJsZUJvdHRvbSAtIHRoaXMudGFyZ2V0VG9wXG4gICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmJvdW5kcy5vZmZzZXRIZWlnaHQgKyAodGhpcy50YXJnZXRUb3AgLSB0aGlzLnJlc2l6YWJsZVRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvdW5kV2lkdGggJiYgTnVtYmVyLmlzRmluaXRlKGJvdW5kV2lkdGgpKSB7XG4gICAgICAgICAgICBtYXhXaWR0aCA9IG1heFdpZHRoICYmIG1heFdpZHRoIDwgYm91bmRXaWR0aCA/IG1heFdpZHRoIDogYm91bmRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm91bmRIZWlnaHQgJiYgTnVtYmVyLmlzRmluaXRlKGJvdW5kSGVpZ2h0KSkge1xuICAgICAgICAgICAgbWF4SGVpZ2h0ID0gbWF4SGVpZ2h0ICYmIG1heEhlaWdodCA8IGJvdW5kSGVpZ2h0ID8gbWF4SGVpZ2h0IDogYm91bmRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbWF4V2lkdGg6IG1heFdpZHRoLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5jYWxjdWxhdGVOZXdTaXplRnJvbURpcmVjdGlvbiA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMucHJvcHMuc2NhbGUgfHwgMTtcbiAgICAgICAgdmFyIHJlc2l6ZVJhdGlvID0gdGhpcy5wcm9wcy5yZXNpemVSYXRpbyB8fCAxO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnN0YXRlLCBkaXJlY3Rpb24gPSBfYS5kaXJlY3Rpb24sIG9yaWdpbmFsID0gX2Eub3JpZ2luYWw7XG4gICAgICAgIHZhciBfYiA9IHRoaXMucHJvcHMsIGxvY2tBc3BlY3RSYXRpbyA9IF9iLmxvY2tBc3BlY3RSYXRpbywgbG9ja0FzcGVjdFJhdGlvRXh0cmFIZWlnaHQgPSBfYi5sb2NrQXNwZWN0UmF0aW9FeHRyYUhlaWdodCwgbG9ja0FzcGVjdFJhdGlvRXh0cmFXaWR0aCA9IF9iLmxvY2tBc3BlY3RSYXRpb0V4dHJhV2lkdGg7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IG9yaWdpbmFsLndpZHRoO1xuICAgICAgICB2YXIgbmV3SGVpZ2h0ID0gb3JpZ2luYWwuaGVpZ2h0O1xuICAgICAgICB2YXIgZXh0cmFIZWlnaHQgPSBsb2NrQXNwZWN0UmF0aW9FeHRyYUhlaWdodCB8fCAwO1xuICAgICAgICB2YXIgZXh0cmFXaWR0aCA9IGxvY2tBc3BlY3RSYXRpb0V4dHJhV2lkdGggfHwgMDtcbiAgICAgICAgaWYgKGhhc0RpcmVjdGlvbigncmlnaHQnLCBkaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IG9yaWdpbmFsLndpZHRoICsgKChjbGllbnRYIC0gb3JpZ2luYWwueCkgKiByZXNpemVSYXRpbykgLyBzY2FsZTtcbiAgICAgICAgICAgIGlmIChsb2NrQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSAobmV3V2lkdGggLSBleHRyYVdpZHRoKSAvIHRoaXMucmF0aW8gKyBleHRyYUhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRGlyZWN0aW9uKCdsZWZ0JywgZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgbmV3V2lkdGggPSBvcmlnaW5hbC53aWR0aCAtICgoY2xpZW50WCAtIG9yaWdpbmFsLngpICogcmVzaXplUmF0aW8pIC8gc2NhbGU7XG4gICAgICAgICAgICBpZiAobG9ja0FzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gKG5ld1dpZHRoIC0gZXh0cmFXaWR0aCkgLyB0aGlzLnJhdGlvICsgZXh0cmFIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0RpcmVjdGlvbignYm90dG9tJywgZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gb3JpZ2luYWwuaGVpZ2h0ICsgKChjbGllbnRZIC0gb3JpZ2luYWwueSkgKiByZXNpemVSYXRpbykgLyBzY2FsZTtcbiAgICAgICAgICAgIGlmIChsb2NrQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9IChuZXdIZWlnaHQgLSBleHRyYUhlaWdodCkgKiB0aGlzLnJhdGlvICsgZXh0cmFXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRGlyZWN0aW9uKCd0b3AnLCBkaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBvcmlnaW5hbC5oZWlnaHQgLSAoKGNsaWVudFkgLSBvcmlnaW5hbC55KSAqIHJlc2l6ZVJhdGlvKSAvIHNjYWxlO1xuICAgICAgICAgICAgaWYgKGxvY2tBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoID0gKG5ld0hlaWdodCAtIGV4dHJhSGVpZ2h0KSAqIHRoaXMucmF0aW8gKyBleHRyYVdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IG5ld1dpZHRoOiBuZXdXaWR0aCwgbmV3SGVpZ2h0OiBuZXdIZWlnaHQgfTtcbiAgICB9O1xuICAgIFJlc2l6YWJsZS5wcm90b3R5cGUuY2FsY3VsYXRlTmV3U2l6ZUZyb21Bc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChuZXdXaWR0aCwgbmV3SGVpZ2h0LCBtYXgsIG1pbikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BzLCBsb2NrQXNwZWN0UmF0aW8gPSBfYS5sb2NrQXNwZWN0UmF0aW8sIGxvY2tBc3BlY3RSYXRpb0V4dHJhSGVpZ2h0ID0gX2EubG9ja0FzcGVjdFJhdGlvRXh0cmFIZWlnaHQsIGxvY2tBc3BlY3RSYXRpb0V4dHJhV2lkdGggPSBfYS5sb2NrQXNwZWN0UmF0aW9FeHRyYVdpZHRoO1xuICAgICAgICB2YXIgY29tcHV0ZWRNaW5XaWR0aCA9IHR5cGVvZiBtaW4ud2lkdGggPT09ICd1bmRlZmluZWQnID8gMTAgOiBtaW4ud2lkdGg7XG4gICAgICAgIHZhciBjb21wdXRlZE1heFdpZHRoID0gdHlwZW9mIG1heC53aWR0aCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWF4LndpZHRoIDwgMCA/IG5ld1dpZHRoIDogbWF4LndpZHRoO1xuICAgICAgICB2YXIgY29tcHV0ZWRNaW5IZWlnaHQgPSB0eXBlb2YgbWluLmhlaWdodCA9PT0gJ3VuZGVmaW5lZCcgPyAxMCA6IG1pbi5oZWlnaHQ7XG4gICAgICAgIHZhciBjb21wdXRlZE1heEhlaWdodCA9IHR5cGVvZiBtYXguaGVpZ2h0ID09PSAndW5kZWZpbmVkJyB8fCBtYXguaGVpZ2h0IDwgMCA/IG5ld0hlaWdodCA6IG1heC5oZWlnaHQ7XG4gICAgICAgIHZhciBleHRyYUhlaWdodCA9IGxvY2tBc3BlY3RSYXRpb0V4dHJhSGVpZ2h0IHx8IDA7XG4gICAgICAgIHZhciBleHRyYVdpZHRoID0gbG9ja0FzcGVjdFJhdGlvRXh0cmFXaWR0aCB8fCAwO1xuICAgICAgICBpZiAobG9ja0FzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICB2YXIgZXh0cmFNaW5XaWR0aCA9IChjb21wdXRlZE1pbkhlaWdodCAtIGV4dHJhSGVpZ2h0KSAqIHRoaXMucmF0aW8gKyBleHRyYVdpZHRoO1xuICAgICAgICAgICAgdmFyIGV4dHJhTWF4V2lkdGggPSAoY29tcHV0ZWRNYXhIZWlnaHQgLSBleHRyYUhlaWdodCkgKiB0aGlzLnJhdGlvICsgZXh0cmFXaWR0aDtcbiAgICAgICAgICAgIHZhciBleHRyYU1pbkhlaWdodCA9IChjb21wdXRlZE1pbldpZHRoIC0gZXh0cmFXaWR0aCkgLyB0aGlzLnJhdGlvICsgZXh0cmFIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgZXh0cmFNYXhIZWlnaHQgPSAoY29tcHV0ZWRNYXhXaWR0aCAtIGV4dHJhV2lkdGgpIC8gdGhpcy5yYXRpbyArIGV4dHJhSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGxvY2tlZE1pbldpZHRoID0gTWF0aC5tYXgoY29tcHV0ZWRNaW5XaWR0aCwgZXh0cmFNaW5XaWR0aCk7XG4gICAgICAgICAgICB2YXIgbG9ja2VkTWF4V2lkdGggPSBNYXRoLm1pbihjb21wdXRlZE1heFdpZHRoLCBleHRyYU1heFdpZHRoKTtcbiAgICAgICAgICAgIHZhciBsb2NrZWRNaW5IZWlnaHQgPSBNYXRoLm1heChjb21wdXRlZE1pbkhlaWdodCwgZXh0cmFNaW5IZWlnaHQpO1xuICAgICAgICAgICAgdmFyIGxvY2tlZE1heEhlaWdodCA9IE1hdGgubWluKGNvbXB1dGVkTWF4SGVpZ2h0LCBleHRyYU1heEhlaWdodCk7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IGNsYW1wKG5ld1dpZHRoLCBsb2NrZWRNaW5XaWR0aCwgbG9ja2VkTWF4V2lkdGgpO1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gY2xhbXAobmV3SGVpZ2h0LCBsb2NrZWRNaW5IZWlnaHQsIGxvY2tlZE1heEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IGNsYW1wKG5ld1dpZHRoLCBjb21wdXRlZE1pbldpZHRoLCBjb21wdXRlZE1heFdpZHRoKTtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGNsYW1wKG5ld0hlaWdodCwgY29tcHV0ZWRNaW5IZWlnaHQsIGNvbXB1dGVkTWF4SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBuZXdXaWR0aDogbmV3V2lkdGgsIG5ld0hlaWdodDogbmV3SGVpZ2h0IH07XG4gICAgfTtcbiAgICBSZXNpemFibGUucHJvdG90eXBlLnNldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRm9yIHBhcmVudCBib3VuZGFyeVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ib3VuZHMgPT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50XzIgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAocGFyZW50XzIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50UmVjdCA9IHBhcmVudF8yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50TGVmdCA9IHBhcmVudFJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFRvcCA9IHBhcmVudFJlY3QudG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEZvciB0YXJnZXQoaHRtbCBlbGVtZW50KSBib3VuZGFyeVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ib3VuZHMgJiYgdHlwZW9mIHRoaXMucHJvcHMuYm91bmRzICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHRhcmdldFJlY3QgPSB0aGlzLnByb3BzLmJvdW5kcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0TGVmdCA9IHRhcmdldFJlY3QubGVmdDtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0VG9wID0gdGFyZ2V0UmVjdC50b3A7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIGJvdW5kYXJ5XG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5yZXNpemFibGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGxlZnQgPSBfYS5sZWZ0LCB0b3BfMSA9IF9hLnRvcCwgcmlnaHQgPSBfYS5yaWdodCwgYm90dG9tID0gX2EuYm90dG9tO1xuICAgICAgICAgICAgdGhpcy5yZXNpemFibGVMZWZ0ID0gbGVmdDtcbiAgICAgICAgICAgIHRoaXMucmVzaXphYmxlUmlnaHQgPSByaWdodDtcbiAgICAgICAgICAgIHRoaXMucmVzaXphYmxlVG9wID0gdG9wXzE7XG4gICAgICAgICAgICB0aGlzLnJlc2l6YWJsZUJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5vblJlc2l6ZVN0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6YWJsZSB8fCAhdGhpcy53aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xpZW50WCA9IDA7XG4gICAgICAgIHZhciBjbGllbnRZID0gMDtcbiAgICAgICAgaWYgKGV2ZW50Lm5hdGl2ZUV2ZW50ICYmIGlzTW91c2VFdmVudChldmVudC5uYXRpdmVFdmVudCkpIHtcbiAgICAgICAgICAgIGNsaWVudFggPSBldmVudC5uYXRpdmVFdmVudC5jbGllbnRYO1xuICAgICAgICAgICAgY2xpZW50WSA9IGV2ZW50Lm5hdGl2ZUV2ZW50LmNsaWVudFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQubmF0aXZlRXZlbnQgJiYgaXNUb3VjaEV2ZW50KGV2ZW50Lm5hdGl2ZUV2ZW50KSkge1xuICAgICAgICAgICAgY2xpZW50WCA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgIGNsaWVudFkgPSBldmVudC5uYXRpdmVFdmVudC50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25SZXNpemVTdGFydCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0UmVzaXplID0gdGhpcy5wcm9wcy5vblJlc2l6ZVN0YXJ0KGV2ZW50LCBkaXJlY3Rpb24sIHRoaXMucmVzaXphYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRSZXNpemUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRml4ICMxNjhcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnNpemUuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnByb3BzLnNpemUuaGVpZ2h0ICE9PSB0aGlzLnN0YXRlLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZS5oZWlnaHQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMuc2l6ZS53aWR0aCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5wcm9wcy5zaXplLndpZHRoICE9PSB0aGlzLnN0YXRlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpZHRoOiB0aGlzLnByb3BzLnNpemUud2lkdGggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIGxvY2tBc3BlY3RSYXRpbyBjYXNlXG4gICAgICAgIHRoaXMucmF0aW8gPVxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvcHMubG9ja0FzcGVjdFJhdGlvID09PSAnbnVtYmVyJyA/IHRoaXMucHJvcHMubG9ja0FzcGVjdFJhdGlvIDogdGhpcy5zaXplLndpZHRoIC8gdGhpcy5zaXplLmhlaWdodDtcbiAgICAgICAgdmFyIGZsZXhCYXNpcztcbiAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGUgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucmVzaXphYmxlKTtcbiAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUuZmxleEJhc2lzICE9PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRfMyA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRfMykge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudF8zKS5mbGV4RGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuZmxleERpciA9IGRpci5zdGFydHNXaXRoKCdyb3cnKSA/ICdyb3cnIDogJ2NvbHVtbic7XG4gICAgICAgICAgICAgICAgZmxleEJhc2lzID0gY29tcHV0ZWRTdHlsZS5mbGV4QmFzaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIGJvdW5kYXJ5XG4gICAgICAgIHRoaXMuc2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgICAgIHg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogY2xpZW50WSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zaXplLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zaXplLmhlaWdodCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Jlc2l6aW5nOiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZFN0eWxlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5zdGF0ZS5iYWNrZ3JvdW5kU3R5bGUpLCB7IGN1cnNvcjogdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShldmVudC50YXJnZXQpLmN1cnNvciB8fCAnYXV0bycgfSksXG4gICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgICAgIGZsZXhCYXNpczogZmxleEJhc2lzLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIFJlc2l6YWJsZS5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzUmVzaXppbmcgfHwgIXRoaXMucmVzaXphYmxlIHx8ICF0aGlzLndpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndpbmRvdy5Ub3VjaEV2ZW50ICYmIGlzVG91Y2hFdmVudChldmVudCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIG9uIGZhaWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BzLCBtYXhXaWR0aCA9IF9hLm1heFdpZHRoLCBtYXhIZWlnaHQgPSBfYS5tYXhIZWlnaHQsIG1pbldpZHRoID0gX2EubWluV2lkdGgsIG1pbkhlaWdodCA9IF9hLm1pbkhlaWdodDtcbiAgICAgICAgdmFyIGNsaWVudFggPSBpc1RvdWNoRXZlbnQoZXZlbnQpID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdmFyIGNsaWVudFkgPSBpc1RvdWNoRXZlbnQoZXZlbnQpID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WTtcbiAgICAgICAgdmFyIF9iID0gdGhpcy5zdGF0ZSwgZGlyZWN0aW9uID0gX2IuZGlyZWN0aW9uLCBvcmlnaW5hbCA9IF9iLm9yaWdpbmFsLCB3aWR0aCA9IF9iLndpZHRoLCBoZWlnaHQgPSBfYi5oZWlnaHQ7XG4gICAgICAgIHZhciBwYXJlbnRTaXplID0gdGhpcy5nZXRQYXJlbnRTaXplKCk7XG4gICAgICAgIHZhciBtYXggPSBjYWxjdWxhdGVOZXdNYXgocGFyZW50U2l6ZSwgdGhpcy53aW5kb3cuaW5uZXJXaWR0aCwgdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQsIG1pbldpZHRoLCBtaW5IZWlnaHQpO1xuICAgICAgICBtYXhXaWR0aCA9IG1heC5tYXhXaWR0aDtcbiAgICAgICAgbWF4SGVpZ2h0ID0gbWF4Lm1heEhlaWdodDtcbiAgICAgICAgbWluV2lkdGggPSBtYXgubWluV2lkdGg7XG4gICAgICAgIG1pbkhlaWdodCA9IG1heC5taW5IZWlnaHQ7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgc2l6ZVxuICAgICAgICB2YXIgX2MgPSB0aGlzLmNhbGN1bGF0ZU5ld1NpemVGcm9tRGlyZWN0aW9uKGNsaWVudFgsIGNsaWVudFkpLCBuZXdIZWlnaHQgPSBfYy5uZXdIZWlnaHQsIG5ld1dpZHRoID0gX2MubmV3V2lkdGg7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBtYXggc2l6ZSBmcm9tIGJvdW5kYXJ5IHNldHRpbmdzXG4gICAgICAgIHZhciBib3VuZGFyeU1heCA9IHRoaXMuY2FsY3VsYXRlTmV3TWF4RnJvbUJvdW5kYXJ5KG1heFdpZHRoLCBtYXhIZWlnaHQpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zbmFwICYmIHRoaXMucHJvcHMuc25hcC54KSB7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IGZpbmRDbG9zZXN0U25hcChuZXdXaWR0aCwgdGhpcy5wcm9wcy5zbmFwLngsIHRoaXMucHJvcHMuc25hcEdhcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc25hcCAmJiB0aGlzLnByb3BzLnNuYXAueSkge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gZmluZENsb3Nlc3RTbmFwKG5ld0hlaWdodCwgdGhpcy5wcm9wcy5zbmFwLnksIHRoaXMucHJvcHMuc25hcEdhcCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBzaXplIGZyb20gYXNwZWN0IHJhdGlvXG4gICAgICAgIHZhciBuZXdTaXplID0gdGhpcy5jYWxjdWxhdGVOZXdTaXplRnJvbUFzcGVjdFJhdGlvKG5ld1dpZHRoLCBuZXdIZWlnaHQsIHsgd2lkdGg6IGJvdW5kYXJ5TWF4Lm1heFdpZHRoLCBoZWlnaHQ6IGJvdW5kYXJ5TWF4Lm1heEhlaWdodCB9LCB7IHdpZHRoOiBtaW5XaWR0aCwgaGVpZ2h0OiBtaW5IZWlnaHQgfSk7XG4gICAgICAgIG5ld1dpZHRoID0gbmV3U2l6ZS5uZXdXaWR0aDtcbiAgICAgICAgbmV3SGVpZ2h0ID0gbmV3U2l6ZS5uZXdIZWlnaHQ7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmdyaWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdHcmlkV2lkdGggPSBzbmFwKG5ld1dpZHRoLCB0aGlzLnByb3BzLmdyaWRbMF0pO1xuICAgICAgICAgICAgdmFyIG5ld0dyaWRIZWlnaHQgPSBzbmFwKG5ld0hlaWdodCwgdGhpcy5wcm9wcy5ncmlkWzFdKTtcbiAgICAgICAgICAgIHZhciBnYXAgPSB0aGlzLnByb3BzLnNuYXBHYXAgfHwgMDtcbiAgICAgICAgICAgIG5ld1dpZHRoID0gZ2FwID09PSAwIHx8IE1hdGguYWJzKG5ld0dyaWRXaWR0aCAtIG5ld1dpZHRoKSA8PSBnYXAgPyBuZXdHcmlkV2lkdGggOiBuZXdXaWR0aDtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGdhcCA9PT0gMCB8fCBNYXRoLmFicyhuZXdHcmlkSGVpZ2h0IC0gbmV3SGVpZ2h0KSA8PSBnYXAgPyBuZXdHcmlkSGVpZ2h0IDogbmV3SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBuZXdXaWR0aCAtIG9yaWdpbmFsLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBuZXdIZWlnaHQgLSBvcmlnaW5hbC5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh3aWR0aCAmJiB0eXBlb2Ygd2lkdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZW5kc1dpdGgod2lkdGgsICclJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IChuZXdXaWR0aCAvIHBhcmVudFNpemUud2lkdGgpICogMTAwO1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoID0gcGVyY2VudCArIFwiJVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZW5kc1dpdGgod2lkdGgsICd2dycpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZ3ID0gKG5ld1dpZHRoIC8gdGhpcy53aW5kb3cuaW5uZXJXaWR0aCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSB2dyArIFwidndcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVuZHNXaXRoKHdpZHRoLCAndmgnKSkge1xuICAgICAgICAgICAgICAgIHZhciB2aCA9IChuZXdXaWR0aCAvIHRoaXMud2luZG93LmlubmVySGVpZ2h0KSAqIDEwMDtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9IHZoICsgXCJ2aFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgJiYgdHlwZW9mIGhlaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChlbmRzV2l0aChoZWlnaHQsICclJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IChuZXdIZWlnaHQgLyBwYXJlbnRTaXplLmhlaWdodCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gcGVyY2VudCArIFwiJVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZW5kc1dpdGgoaGVpZ2h0LCAndncnKSkge1xuICAgICAgICAgICAgICAgIHZhciB2dyA9IChuZXdIZWlnaHQgLyB0aGlzLndpbmRvdy5pbm5lcldpZHRoKSAqIDEwMDtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSB2dyArIFwidndcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVuZHNXaXRoKGhlaWdodCwgJ3ZoJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmggPSAobmV3SGVpZ2h0IC8gdGhpcy53aW5kb3cuaW5uZXJIZWlnaHQpICogMTAwO1xuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IHZoICsgXCJ2aFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmNyZWF0ZVNpemVGb3JDc3NQcm9wZXJ0eShuZXdXaWR0aCwgJ3dpZHRoJyksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuY3JlYXRlU2l6ZUZvckNzc1Byb3BlcnR5KG5ld0hlaWdodCwgJ2hlaWdodCcpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5mbGV4RGlyID09PSAncm93Jykge1xuICAgICAgICAgICAgbmV3U3RhdGUuZmxleEJhc2lzID0gbmV3U3RhdGUud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5mbGV4RGlyID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbmV3U3RhdGUuZmxleEJhc2lzID0gbmV3U3RhdGUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlc2l6ZShldmVudCwgZGlyZWN0aW9uLCB0aGlzLnJlc2l6YWJsZSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZXNpemFibGUucHJvdG90eXBlLm9uTW91c2VVcCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnN0YXRlLCBpc1Jlc2l6aW5nID0gX2EuaXNSZXNpemluZywgZGlyZWN0aW9uID0gX2EuZGlyZWN0aW9uLCBvcmlnaW5hbCA9IF9hLm9yaWdpbmFsO1xuICAgICAgICBpZiAoIWlzUmVzaXppbmcgfHwgIXRoaXMucmVzaXphYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2l6ZS53aWR0aCAtIG9yaWdpbmFsLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUuaGVpZ2h0IC0gb3JpZ2luYWwuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJlc2l6ZVN0b3ApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25SZXNpemVTdG9wKGV2ZW50LCBkaXJlY3Rpb24sIHRoaXMucmVzaXphYmxlLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnByb3BzLnNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNSZXNpemluZzogZmFsc2UsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kU3R5bGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLnN0YXRlLmJhY2tncm91bmRTdHlsZSksIHsgY3Vyc29yOiAnYXV0bycgfSksXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS51cGRhdGVTaXplID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpZHRoOiBzaXplLndpZHRoLCBoZWlnaHQ6IHNpemUuaGVpZ2h0IH0pO1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5yZW5kZXJSZXNpemVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnByb3BzLCBlbmFibGUgPSBfYS5lbmFibGUsIGhhbmRsZVN0eWxlcyA9IF9hLmhhbmRsZVN0eWxlcywgaGFuZGxlQ2xhc3NlcyA9IF9hLmhhbmRsZUNsYXNzZXMsIGhhbmRsZVdyYXBwZXJTdHlsZSA9IF9hLmhhbmRsZVdyYXBwZXJTdHlsZSwgaGFuZGxlV3JhcHBlckNsYXNzID0gX2EuaGFuZGxlV3JhcHBlckNsYXNzLCBoYW5kbGVDb21wb25lbnQgPSBfYS5oYW5kbGVDb21wb25lbnQ7XG4gICAgICAgIGlmICghZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzaXplcnMgPSBPYmplY3Qua2V5cyhlbmFibGUpLm1hcChmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlW2Rpcl0gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlc2l6ZXIsIHsga2V5OiBkaXIsIGRpcmVjdGlvbjogZGlyLCBvblJlc2l6ZVN0YXJ0OiBfdGhpcy5vblJlc2l6ZVN0YXJ0LCByZXBsYWNlU3R5bGVzOiBoYW5kbGVTdHlsZXMgJiYgaGFuZGxlU3R5bGVzW2Rpcl0sIGNsYXNzTmFtZTogaGFuZGxlQ2xhc3NlcyAmJiBoYW5kbGVDbGFzc2VzW2Rpcl0gfSwgaGFuZGxlQ29tcG9uZW50ICYmIGhhbmRsZUNvbXBvbmVudFtkaXJdID8gaGFuZGxlQ29tcG9uZW50W2Rpcl0gOiBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vICM5MyBXcmFwIHRoZSByZXNpemUgYm94IGluIHNwYW4gKHdpbGwgbm90IGJyZWFrIDEwMCUgd2lkdGgvaGVpZ2h0KVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGhhbmRsZVdyYXBwZXJDbGFzcywgc3R5bGU6IGhhbmRsZVdyYXBwZXJTdHlsZSB9LCByZXNpemVycykpO1xuICAgIH07XG4gICAgUmVzaXphYmxlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBleHRlbmRzUHJvcHMgPSBPYmplY3Qua2V5cyh0aGlzLnByb3BzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICBpZiAoZGVmaW5lZFByb3BzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjW2tleV0gPSBfdGhpcy5wcm9wc1trZXldO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICB2YXIgc3R5bGUgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB1c2VyU2VsZWN0OiB0aGlzLnN0YXRlLmlzUmVzaXppbmcgPyAnbm9uZScgOiAnYXV0bycgfSwgdGhpcy5wcm9wcy5zdHlsZSksIHRoaXMuc2l6ZVN0eWxlKSwgeyBtYXhXaWR0aDogdGhpcy5wcm9wcy5tYXhXaWR0aCwgbWF4SGVpZ2h0OiB0aGlzLnByb3BzLm1heEhlaWdodCwgbWluV2lkdGg6IHRoaXMucHJvcHMubWluV2lkdGgsIG1pbkhlaWdodDogdGhpcy5wcm9wcy5taW5IZWlnaHQsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBmbGV4U2hyaW5rOiAwIH0pO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5mbGV4QmFzaXMpIHtcbiAgICAgICAgICAgIHN0eWxlLmZsZXhCYXNpcyA9IHRoaXMuc3RhdGUuZmxleEJhc2lzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBXcmFwcGVyID0gdGhpcy5wcm9wcy5hcyB8fCAnZGl2JztcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFdyYXBwZXIsIF9fYXNzaWduKHsgcmVmOiB0aGlzLnJlZiwgc3R5bGU6IHN0eWxlLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lIH0sIGV4dGVuZHNQcm9wcyksXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmlzUmVzaXppbmcgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB0aGlzLnN0YXRlLmJhY2tncm91bmRTdHlsZSB9KSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICB0aGlzLnJlbmRlclJlc2l6ZXIoKSkpO1xuICAgIH07XG4gICAgUmVzaXphYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgYXM6ICdkaXYnLFxuICAgICAgICBvblJlc2l6ZVN0YXJ0OiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICAgIG9uUmVzaXplOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICAgIG9uUmVzaXplU3RvcDogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgICBlbmFibGU6IHtcbiAgICAgICAgICAgIHRvcDogdHJ1ZSxcbiAgICAgICAgICAgIHJpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgYm90dG9tOiB0cnVlLFxuICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvcFJpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgYm90dG9tUmlnaHQ6IHRydWUsXG4gICAgICAgICAgICBib3R0b21MZWZ0OiB0cnVlLFxuICAgICAgICAgICAgdG9wTGVmdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICBncmlkOiBbMSwgMV0sXG4gICAgICAgIGxvY2tBc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgIGxvY2tBc3BlY3RSYXRpb0V4dHJhV2lkdGg6IDAsXG4gICAgICAgIGxvY2tBc3BlY3RSYXRpb0V4dHJhSGVpZ2h0OiAwLFxuICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgcmVzaXplUmF0aW86IDEsXG4gICAgICAgIHNuYXBHYXA6IDAsXG4gICAgfTtcbiAgICByZXR1cm4gUmVzaXphYmxlO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KSk7XG5leHBvcnQgeyBSZXNpemFibGUgfTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIHN0eWxlcyA9IHtcbiAgICB0b3A6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMTBweCcsXG4gICAgICAgIHRvcDogJy01cHgnLFxuICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgY3Vyc29yOiAncm93LXJlc2l6ZScsXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgICB3aWR0aDogJzEwcHgnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgcmlnaHQ6ICctNXB4JyxcbiAgICAgICAgY3Vyc29yOiAnY29sLXJlc2l6ZScsXG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMTBweCcsXG4gICAgICAgIGJvdHRvbTogJy01cHgnLFxuICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgY3Vyc29yOiAncm93LXJlc2l6ZScsXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICAgIHdpZHRoOiAnMTBweCcsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICBsZWZ0OiAnLTVweCcsXG4gICAgICAgIGN1cnNvcjogJ2NvbC1yZXNpemUnLFxuICAgIH0sXG4gICAgdG9wUmlnaHQ6IHtcbiAgICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICByaWdodDogJy0xMHB4JyxcbiAgICAgICAgdG9wOiAnLTEwcHgnLFxuICAgICAgICBjdXJzb3I6ICduZS1yZXNpemUnLFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICByaWdodDogJy0xMHB4JyxcbiAgICAgICAgYm90dG9tOiAnLTEwcHgnLFxuICAgICAgICBjdXJzb3I6ICdzZS1yZXNpemUnLFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgICBoZWlnaHQ6ICcyMHB4JyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGxlZnQ6ICctMTBweCcsXG4gICAgICAgIGJvdHRvbTogJy0xMHB4JyxcbiAgICAgICAgY3Vyc29yOiAnc3ctcmVzaXplJyxcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBsZWZ0OiAnLTEwcHgnLFxuICAgICAgICB0b3A6ICctMTBweCcsXG4gICAgICAgIGN1cnNvcjogJ253LXJlc2l6ZScsXG4gICAgfSxcbn07XG52YXIgUmVzaXplciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVzaXplciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXNpemVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub25Nb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMucHJvcHMub25SZXNpemVTdGFydChlLCBfdGhpcy5wcm9wcy5kaXJlY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMucHJvcHMub25SZXNpemVTdGFydChlLCBfdGhpcy5wcm9wcy5kaXJlY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlc2l6ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJywgc3R5bGU6IF9fYXNzaWduKF9fYXNzaWduKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHVzZXJTZWxlY3Q6ICdub25lJyB9LCBzdHlsZXNbdGhpcy5wcm9wcy5kaXJlY3Rpb25dKSwgKHRoaXMucHJvcHMucmVwbGFjZVN0eWxlcyB8fCB7fSkpLCBvbk1vdXNlRG93bjogdGhpcy5vbk1vdXNlRG93biwgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVzaXplcjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCkpO1xuZXhwb3J0IHsgUmVzaXplciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRyYWdnYWJsZUNvcmVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0RyYWdnYWJsZUNvcmUuZGVmYXVsdDtcbiAgfVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBSZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7XG5cbnZhciBfcmVhY3REb20gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXG52YXIgX2Nsc3gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiY2xzeFwiKSk7XG5cbnZhciBfZG9tRm5zID0gcmVxdWlyZShcIi4vdXRpbHMvZG9tRm5zXCIpO1xuXG52YXIgX3Bvc2l0aW9uRm5zID0gcmVxdWlyZShcIi4vdXRpbHMvcG9zaXRpb25GbnNcIik7XG5cbnZhciBfc2hpbXMgPSByZXF1aXJlKFwiLi91dGlscy9zaGltc1wiKTtcblxudmFyIF9EcmFnZ2FibGVDb3JlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9EcmFnZ2FibGVDb3JlXCIpKTtcblxudmFyIF9sb2cgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL2xvZ1wiKSk7XG5cbnZhciBfZXhjbHVkZWQgPSBbXCJheGlzXCIsIFwiYm91bmRzXCIsIFwiY2hpbGRyZW5cIiwgXCJkZWZhdWx0UG9zaXRpb25cIiwgXCJkZWZhdWx0Q2xhc3NOYW1lXCIsIFwiZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nXCIsIFwiZGVmYXVsdENsYXNzTmFtZURyYWdnZWRcIiwgXCJwb3NpdGlvblwiLCBcInBvc2l0aW9uT2Zmc2V0XCIsIFwic2NhbGVcIl07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBkZWZhdWx0OiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChrZXkgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTsgdmFyIGtleSwgaTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7IGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7IGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07IGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHsgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307IHZhciB0YXJnZXQgPSB7fTsgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyB2YXIga2V5LCBpOyBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykgeyBrZXkgPSBzb3VyY2VLZXlzW2ldOyBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlOyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IG51bGwgIT0gYXJndW1lbnRzW2ldID8gYXJndW1lbnRzW2ldIDoge307IGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlPlxuLy9cbnZhciBEcmFnZ2FibGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKERyYWdnYWJsZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihEcmFnZ2FibGUpO1xuXG4gIGZ1bmN0aW9uIERyYWdnYWJsZShwcm9wc1xuICAvKjogRHJhZ2dhYmxlUHJvcHMqL1xuICApIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhZ2dhYmxlKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcIm9uRHJhZ1N0YXJ0XCIsIGZ1bmN0aW9uIChlLCBjb3JlRGF0YSkge1xuICAgICAgKDAsIF9sb2cuZGVmYXVsdCkoJ0RyYWdnYWJsZTogb25EcmFnU3RhcnQ6ICVqJywgY29yZURhdGEpOyAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG5cbiAgICAgIHZhciBzaG91bGRTdGFydCA9IF90aGlzLnByb3BzLm9uU3RhcnQoZSwgKDAsIF9wb3NpdGlvbkZucy5jcmVhdGVEcmFnZ2FibGVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgY29yZURhdGEpKTsgLy8gS2lsbHMgc3RhcnQgZXZlbnQgb24gY29yZSBhcyB3ZWxsLCBzbyBtb3ZlIGhhbmRsZXJzIGFyZSBuZXZlciBib3VuZC5cblxuXG4gICAgICBpZiAoc2hvdWxkU3RhcnQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICAgIGRyYWdnZWQ6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcIm9uRHJhZ1wiLCBmdW5jdGlvbiAoZSwgY29yZURhdGEpIHtcbiAgICAgIGlmICghX3RoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICgwLCBfbG9nLmRlZmF1bHQpKCdEcmFnZ2FibGU6IG9uRHJhZzogJWonLCBjb3JlRGF0YSk7XG4gICAgICB2YXIgdWlEYXRhID0gKDAsIF9wb3NpdGlvbkZucy5jcmVhdGVEcmFnZ2FibGVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgY29yZURhdGEpO1xuICAgICAgdmFyIG5ld1N0YXRlXG4gICAgICAvKjogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiovXG4gICAgICA9IHtcbiAgICAgICAgeDogdWlEYXRhLngsXG4gICAgICAgIHk6IHVpRGF0YS55XG4gICAgICB9OyAvLyBLZWVwIHdpdGhpbiBib3VuZHMuXG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5ib3VuZHMpIHtcbiAgICAgICAgLy8gU2F2ZSBvcmlnaW5hbCB4IGFuZCB5LlxuICAgICAgICB2YXIgeCA9IG5ld1N0YXRlLngsXG4gICAgICAgICAgICB5ID0gbmV3U3RhdGUueTsgLy8gQWRkIHNsYWNrIHRvIHRoZSB2YWx1ZXMgdXNlZCB0byBjYWxjdWxhdGUgYm91bmQgcG9zaXRpb24uIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCBpZlxuICAgICAgICAvLyB3ZSBzdGFydCByZW1vdmluZyBzbGFjaywgdGhlIGVsZW1lbnQgd29uJ3QgcmVhY3QgdG8gaXQgcmlnaHQgYXdheSB1bnRpbCBpdCdzIGJlZW5cbiAgICAgICAgLy8gY29tcGxldGVseSByZW1vdmVkLlxuXG4gICAgICAgIG5ld1N0YXRlLnggKz0gX3RoaXMuc3RhdGUuc2xhY2tYO1xuICAgICAgICBuZXdTdGF0ZS55ICs9IF90aGlzLnN0YXRlLnNsYWNrWTsgLy8gR2V0IGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgY2VpbC9mbG9vciB0aGUgeCBhbmQgeSB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuXG5cbiAgICAgICAgdmFyIF9nZXRCb3VuZFBvc2l0aW9uID0gKDAsIF9wb3NpdGlvbkZucy5nZXRCb3VuZFBvc2l0aW9uKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgbmV3U3RhdGUueCwgbmV3U3RhdGUueSksXG4gICAgICAgICAgICBfZ2V0Qm91bmRQb3NpdGlvbjIgPSBfc2xpY2VkVG9BcnJheShfZ2V0Qm91bmRQb3NpdGlvbiwgMiksXG4gICAgICAgICAgICBuZXdTdGF0ZVggPSBfZ2V0Qm91bmRQb3NpdGlvbjJbMF0sXG4gICAgICAgICAgICBuZXdTdGF0ZVkgPSBfZ2V0Qm91bmRQb3NpdGlvbjJbMV07XG5cbiAgICAgICAgbmV3U3RhdGUueCA9IG5ld1N0YXRlWDtcbiAgICAgICAgbmV3U3RhdGUueSA9IG5ld1N0YXRlWTsgLy8gUmVjYWxjdWxhdGUgc2xhY2sgYnkgbm90aW5nIGhvdyBtdWNoIHdhcyBzaGF2ZWQgYnkgdGhlIGJvdW5kUG9zaXRpb24gaGFuZGxlci5cblxuICAgICAgICBuZXdTdGF0ZS5zbGFja1ggPSBfdGhpcy5zdGF0ZS5zbGFja1ggKyAoeCAtIG5ld1N0YXRlLngpO1xuICAgICAgICBuZXdTdGF0ZS5zbGFja1kgPSBfdGhpcy5zdGF0ZS5zbGFja1kgKyAoeSAtIG5ld1N0YXRlLnkpOyAvLyBVcGRhdGUgdGhlIGV2ZW50IHdlIGZpcmUgdG8gcmVmbGVjdCB3aGF0IHJlYWxseSBoYXBwZW5lZCBhZnRlciBib3VuZHMgdG9vayBlZmZlY3QuXG5cbiAgICAgICAgdWlEYXRhLnggPSBuZXdTdGF0ZS54O1xuICAgICAgICB1aURhdGEueSA9IG5ld1N0YXRlLnk7XG4gICAgICAgIHVpRGF0YS5kZWx0YVggPSBuZXdTdGF0ZS54IC0gX3RoaXMuc3RhdGUueDtcbiAgICAgICAgdWlEYXRhLmRlbHRhWSA9IG5ld1N0YXRlLnkgLSBfdGhpcy5zdGF0ZS55O1xuICAgICAgfSAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG5cblxuICAgICAgdmFyIHNob3VsZFVwZGF0ZSA9IF90aGlzLnByb3BzLm9uRHJhZyhlLCB1aURhdGEpO1xuXG4gICAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBfdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwib25EcmFnU3RvcFwiLCBmdW5jdGlvbiAoZSwgY29yZURhdGEpIHtcbiAgICAgIGlmICghX3RoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTsgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuXG4gICAgICB2YXIgc2hvdWxkQ29udGludWUgPSBfdGhpcy5wcm9wcy5vblN0b3AoZSwgKDAsIF9wb3NpdGlvbkZucy5jcmVhdGVEcmFnZ2FibGVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgY29yZURhdGEpKTtcblxuICAgICAgaWYgKHNob3VsZENvbnRpbnVlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgKDAsIF9sb2cuZGVmYXVsdCkoJ0RyYWdnYWJsZTogb25EcmFnU3RvcDogJWonLCBjb3JlRGF0YSk7XG4gICAgICB2YXIgbmV3U3RhdGVcbiAgICAgIC8qOiAkU2hhcGU8RHJhZ2dhYmxlU3RhdGU+Ki9cbiAgICAgID0ge1xuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIHNsYWNrWDogMCxcbiAgICAgICAgc2xhY2tZOiAwXG4gICAgICB9OyAvLyBJZiB0aGlzIGlzIGEgY29udHJvbGxlZCBjb21wb25lbnQsIHRoZSByZXN1bHQgb2YgdGhpcyBvcGVyYXRpb24gd2lsbCBiZSB0b1xuICAgICAgLy8gcmV2ZXJ0IGJhY2sgdG8gdGhlIG9sZCBwb3NpdGlvbi4gV2UgZXhwZWN0IGEgaGFuZGxlciBvbiBgb25EcmFnU3RvcGAsIGF0IHRoZSBsZWFzdC5cblxuICAgICAgdmFyIGNvbnRyb2xsZWQgPSBCb29sZWFuKF90aGlzLnByb3BzLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNvbnRyb2xsZWQpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzJHBvc2l0aW9uID0gX3RoaXMucHJvcHMucG9zaXRpb24sXG4gICAgICAgICAgICB4ID0gX3RoaXMkcHJvcHMkcG9zaXRpb24ueCxcbiAgICAgICAgICAgIHkgPSBfdGhpcyRwcm9wcyRwb3NpdGlvbi55O1xuICAgICAgICBuZXdTdGF0ZS54ID0geDtcbiAgICAgICAgbmV3U3RhdGUueSA9IHk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgICB9KTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGhhdmUgYmVlbiBkcmFnZ2VkIGJlZm9yZS5cbiAgICAgIGRyYWdnZWQ6IGZhbHNlLFxuICAgICAgLy8gQ3VycmVudCB0cmFuc2Zvcm0geCBhbmQgeS5cbiAgICAgIHg6IHByb3BzLnBvc2l0aW9uID8gcHJvcHMucG9zaXRpb24ueCA6IHByb3BzLmRlZmF1bHRQb3NpdGlvbi54LFxuICAgICAgeTogcHJvcHMucG9zaXRpb24gPyBwcm9wcy5wb3NpdGlvbi55IDogcHJvcHMuZGVmYXVsdFBvc2l0aW9uLnksXG4gICAgICBwcmV2UHJvcHNQb3NpdGlvbjogX29iamVjdFNwcmVhZCh7fSwgcHJvcHMucG9zaXRpb24pLFxuICAgICAgLy8gVXNlZCBmb3IgY29tcGVuc2F0aW5nIGZvciBvdXQtb2YtYm91bmRzIGRyYWdzXG4gICAgICBzbGFja1g6IDAsXG4gICAgICBzbGFja1k6IDAsXG4gICAgICAvLyBDYW4gb25seSBkZXRlcm1pbmUgaWYgU1ZHIGFmdGVyIG1vdW50aW5nXG4gICAgICBpc0VsZW1lbnRTVkc6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmIChwcm9wcy5wb3NpdGlvbiAmJiAhKHByb3BzLm9uRHJhZyB8fCBwcm9wcy5vblN0b3ApKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKCdBIGBwb3NpdGlvbmAgd2FzIGFwcGxpZWQgdG8gdGhpcyA8RHJhZ2dhYmxlPiwgd2l0aG91dCBkcmFnIGhhbmRsZXJzLiBUaGlzIHdpbGwgbWFrZSB0aGlzICcgKyAnY29tcG9uZW50IGVmZmVjdGl2ZWx5IHVuZHJhZ2dhYmxlLiBQbGVhc2UgYXR0YWNoIGBvbkRyYWdgIG9yIGBvblN0b3BgIGhhbmRsZXJzIHNvIHlvdSBjYW4gYWRqdXN0IHRoZSAnICsgJ2Bwb3NpdGlvbmAgb2YgdGhpcyBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhEcmFnZ2FibGUsIFt7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93LlNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmluZERPTU5vZGUoKSBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzRWxlbWVudFNWRzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ2dpbmc6IGZhbHNlXG4gICAgICB9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICAgIH0gLy8gUmVhY3QgU3RyaWN0IE1vZGUgY29tcGF0aWJpbGl0eTogaWYgYG5vZGVSZWZgIGlzIHBhc3NlZCwgd2Ugd2lsbCB1c2UgaXQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gZmluZFxuICAgIC8vIHRoZSB1bmRlcmx5aW5nIERPTSBub2RlIG91cnNlbHZlcy4gU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbiAgfSwge1xuICAgIGtleTogXCJmaW5kRE9NTm9kZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kRE9NTm9kZSgpXG4gICAgLyo6ID9IVE1MRWxlbWVudCovXG4gICAge1xuICAgICAgdmFyIF90aGlzJHByb3BzJG5vZGVSZWYkYywgX3RoaXMkcHJvcHMsIF90aGlzJHByb3BzJG5vZGVSZWY7XG5cbiAgICAgIHJldHVybiAoX3RoaXMkcHJvcHMkbm9kZVJlZiRjID0gKF90aGlzJHByb3BzID0gdGhpcy5wcm9wcykgPT09IG51bGwgfHwgX3RoaXMkcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpcyRwcm9wcyRub2RlUmVmID0gX3RoaXMkcHJvcHMubm9kZVJlZikgPT09IG51bGwgfHwgX3RoaXMkcHJvcHMkbm9kZVJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkcHJvcHMkbm9kZVJlZi5jdXJyZW50KSAhPT0gbnVsbCAmJiBfdGhpcyRwcm9wcyRub2RlUmVmJGMgIT09IHZvaWQgMCA/IF90aGlzJHByb3BzJG5vZGVSZWYkYyA6IF9yZWFjdERvbS5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKClcbiAgICAvKjogUmVhY3RFbGVtZW50PGFueT4qL1xuICAgIHtcbiAgICAgIHZhciBfY2xzeDtcblxuICAgICAgdmFyIF90aGlzJHByb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYXhpcyA9IF90aGlzJHByb3BzMi5heGlzLFxuICAgICAgICAgIGJvdW5kcyA9IF90aGlzJHByb3BzMi5ib3VuZHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wczIuY2hpbGRyZW4sXG4gICAgICAgICAgZGVmYXVsdFBvc2l0aW9uID0gX3RoaXMkcHJvcHMyLmRlZmF1bHRQb3NpdGlvbixcbiAgICAgICAgICBkZWZhdWx0Q2xhc3NOYW1lID0gX3RoaXMkcHJvcHMyLmRlZmF1bHRDbGFzc05hbWUsXG4gICAgICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nID0gX3RoaXMkcHJvcHMyLmRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyxcbiAgICAgICAgICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZCA9IF90aGlzJHByb3BzMi5kZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZCxcbiAgICAgICAgICBwb3NpdGlvbiA9IF90aGlzJHByb3BzMi5wb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbk9mZnNldCA9IF90aGlzJHByb3BzMi5wb3NpdGlvbk9mZnNldCxcbiAgICAgICAgICBzY2FsZSA9IF90aGlzJHByb3BzMi5zY2FsZSxcbiAgICAgICAgICBkcmFnZ2FibGVDb3JlUHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3RoaXMkcHJvcHMyLCBfZXhjbHVkZWQpO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7fTtcbiAgICAgIHZhciBzdmdUcmFuc2Zvcm0gPSBudWxsOyAvLyBJZiB0aGlzIGlzIGNvbnRyb2xsZWQsIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBpdCAtIHVubGVzcyBpdCdzIGRyYWdnaW5nLlxuXG4gICAgICB2YXIgY29udHJvbGxlZCA9IEJvb2xlYW4ocG9zaXRpb24pO1xuICAgICAgdmFyIGRyYWdnYWJsZSA9ICFjb250cm9sbGVkIHx8IHRoaXMuc3RhdGUuZHJhZ2dpbmc7XG4gICAgICB2YXIgdmFsaWRQb3NpdGlvbiA9IHBvc2l0aW9uIHx8IGRlZmF1bHRQb3NpdGlvbjtcbiAgICAgIHZhciB0cmFuc2Zvcm1PcHRzID0ge1xuICAgICAgICAvLyBTZXQgbGVmdCBpZiBob3Jpem9udGFsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgICB4OiAoMCwgX3Bvc2l0aW9uRm5zLmNhbkRyYWdYKSh0aGlzKSAmJiBkcmFnZ2FibGUgPyB0aGlzLnN0YXRlLnggOiB2YWxpZFBvc2l0aW9uLngsXG4gICAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICAgIHk6ICgwLCBfcG9zaXRpb25GbnMuY2FuRHJhZ1kpKHRoaXMpICYmIGRyYWdnYWJsZSA/IHRoaXMuc3RhdGUueSA6IHZhbGlkUG9zaXRpb24ueVxuICAgICAgfTsgLy8gSWYgdGhpcyBlbGVtZW50IHdhcyBTVkcsIHdlIHVzZSB0aGUgYHRyYW5zZm9ybWAgYXR0cmlidXRlLlxuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5pc0VsZW1lbnRTVkcpIHtcbiAgICAgICAgc3ZnVHJhbnNmb3JtID0gKDAsIF9kb21GbnMuY3JlYXRlU1ZHVHJhbnNmb3JtKSh0cmFuc2Zvcm1PcHRzLCBwb3NpdGlvbk9mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYSBDU1MgdHJhbnNmb3JtIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kLiBUaGlzIGFsbG93cyB1cyB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZFxuICAgICAgICAvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IHdoZXRoZXIgb3Igbm90IGl0IGlzIHJlbGF0aXZlbHkgb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgICAgICAvLyBJZiB0aGUgaXRlbSB5b3UgYXJlIGRyYWdnaW5nIGFscmVhZHkgaGFzIGEgdHJhbnNmb3JtIHNldCwgd3JhcCBpdCBpbiBhIDxzcGFuPiBzbyA8RHJhZ2dhYmxlPlxuICAgICAgICAvLyBoYXMgYSBjbGVhbiBzbGF0ZS5cbiAgICAgICAgc3R5bGUgPSAoMCwgX2RvbUZucy5jcmVhdGVDU1NUcmFuc2Zvcm0pKHRyYW5zZm9ybU9wdHMsIHBvc2l0aW9uT2Zmc2V0KTtcbiAgICAgIH0gLy8gTWFyayB3aXRoIGNsYXNzIHdoaWxlIGRyYWdnaW5nXG5cblxuICAgICAgdmFyIGNsYXNzTmFtZSA9ICgwLCBfY2xzeDIuZGVmYXVsdCkoY2hpbGRyZW4ucHJvcHMuY2xhc3NOYW1lIHx8ICcnLCBkZWZhdWx0Q2xhc3NOYW1lLCAoX2Nsc3ggPSB7fSwgX2RlZmluZVByb3BlcnR5KF9jbHN4LCBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmcsIHRoaXMuc3RhdGUuZHJhZ2dpbmcpLCBfZGVmaW5lUHJvcGVydHkoX2Nsc3gsIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkLCB0aGlzLnN0YXRlLmRyYWdnZWQpLCBfY2xzeCkpOyAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG5cbiAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChfRHJhZ2dhYmxlQ29yZS5kZWZhdWx0LCBfZXh0ZW5kcyh7fSwgZHJhZ2dhYmxlQ29yZVByb3BzLCB7XG4gICAgICAgIG9uU3RhcnQ6IHRoaXMub25EcmFnU3RhcnQsXG4gICAgICAgIG9uRHJhZzogdGhpcy5vbkRyYWcsXG4gICAgICAgIG9uU3RvcDogdGhpcy5vbkRyYWdTdG9wXG4gICAgICB9KSwgLyojX19QVVJFX18qL1JlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKSwge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgc3R5bGU6IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgY2hpbGRyZW4ucHJvcHMuc3R5bGUpLCBzdHlsZSksXG4gICAgICAgIHRyYW5zZm9ybTogc3ZnVHJhbnNmb3JtXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzXCIsXG4gICAgdmFsdWU6IC8vIFJlYWN0IDE2LjMrXG4gICAgLy8gQXJpdHkgKHByb3BzLCBzdGF0ZSlcbiAgICBmdW5jdGlvbiBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoX3JlZiwgX3JlZjIpXG4gICAgLyo6ID8kU2hhcGU8RHJhZ2dhYmxlU3RhdGU+Ki9cbiAgICB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBfcmVmLnBvc2l0aW9uO1xuICAgICAgdmFyIHByZXZQcm9wc1Bvc2l0aW9uID0gX3JlZjIucHJldlByb3BzUG9zaXRpb247XG5cbiAgICAgIC8vIFNldCB4L3kgaWYgYSBuZXcgcG9zaXRpb24gaXMgcHJvdmlkZWQgaW4gcHJvcHMgdGhhdCBpcyBkaWZmZXJlbnQgdGhhbiB0aGUgcHJldmlvdXMuXG4gICAgICBpZiAocG9zaXRpb24gJiYgKCFwcmV2UHJvcHNQb3NpdGlvbiB8fCBwb3NpdGlvbi54ICE9PSBwcmV2UHJvcHNQb3NpdGlvbi54IHx8IHBvc2l0aW9uLnkgIT09IHByZXZQcm9wc1Bvc2l0aW9uLnkpKSB7XG4gICAgICAgICgwLCBfbG9nLmRlZmF1bHQpKCdEcmFnZ2FibGU6IGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAlaicsIHtcbiAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgcHJldlByb3BzUG9zaXRpb246IHByZXZQcm9wc1Bvc2l0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc2l0aW9uLngsXG4gICAgICAgICAgeTogcG9zaXRpb24ueSxcbiAgICAgICAgICBwcmV2UHJvcHNQb3NpdGlvbjogX29iamVjdFNwcmVhZCh7fSwgcG9zaXRpb24pXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmFnZ2FibGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcblxuX2RlZmluZVByb3BlcnR5KERyYWdnYWJsZSwgXCJkaXNwbGF5TmFtZVwiLCAnRHJhZ2dhYmxlJyk7XG5cbl9kZWZpbmVQcm9wZXJ0eShEcmFnZ2FibGUsIFwicHJvcFR5cGVzXCIsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgX0RyYWdnYWJsZUNvcmUuZGVmYXVsdC5wcm9wVHlwZXMpLCB7fSwge1xuICAvKipcbiAgICogYGF4aXNgIGRldGVybWluZXMgd2hpY2ggYXhpcyB0aGUgZHJhZ2dhYmxlIGNhbiBtb3ZlLlxuICAgKlxuICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgKiAgY29udHJvbHMgZmx1c2hpbmcgdG8gdGhlIERPTS5cbiAgICpcbiAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAqICd4JyBsaW1pdHMgbW92ZW1lbnQgdG8gaG9yaXpvbnRhbCBheGlzLlxuICAgKiAneScgbGltaXRzIG1vdmVtZW50IHRvIHZlcnRpY2FsIGF4aXMuXG4gICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byAnYm90aCcuXG4gICAqL1xuICBheGlzOiBfcHJvcFR5cGVzLmRlZmF1bHQub25lT2YoWydib3RoJywgJ3gnLCAneScsICdub25lJ10pLFxuXG4gIC8qKlxuICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAqIEF2YWlsYWJsZSB2YWx1ZXMgYXJlOlxuICAgKlxuICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICpcbiAgICogQWx0ZXJuYXRpdmVseSwgcGFzcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMsIGFsbCBvZiB3aGljaCBhcmUgb3B0aW9uYWw6XG4gICAqXG4gICAqIHtsZWZ0OiBMRUZUX0JPVU5ELCByaWdodDogUklHSFRfQk9VTkQsIGJvdHRvbTogQk9UVE9NX0JPVU5ELCB0b3A6IFRPUF9CT1VORH1cbiAgICpcbiAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqIGBgYGpzeFxuICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgKiAgICAgICAgIHJldHVybiAoXG4gICAqICAgICAgICAgICAgPERyYWdnYWJsZSBib3VuZHM9e3tyaWdodDogMzAwLCBib3R0b206IDMwMH19PlxuICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAqICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICogICAgICAgICApO1xuICAgKiAgICAgICB9XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgYm91bmRzOiBfcHJvcFR5cGVzLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzLmRlZmF1bHQuc2hhcGUoe1xuICAgIGxlZnQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXIsXG4gICAgcmlnaHQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXIsXG4gICAgdG9wOiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICAgIGJvdHRvbTogX3Byb3BUeXBlcy5kZWZhdWx0Lm51bWJlclxuICB9KSwgX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlcy5kZWZhdWx0Lm9uZU9mKFtmYWxzZV0pXSksXG4gIGRlZmF1bHRDbGFzc05hbWU6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIGBkZWZhdWx0UG9zaXRpb25gIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IHRoZSBkcmFnZ2VkIGl0ZW0gc2hvdWxkIHN0YXJ0IGF0XG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqIGBgYGpzeFxuICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGRlZmF1bHRQb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCB0cmFuc2Zvcm1YOiAyNXB4IGFuZCB0cmFuc2Zvcm1ZOiAyNXB4OzwvZGl2PlxuICAgKiAgICAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgKiAgICAgICAgICAgICAgKTtcbiAgICogICAgICAgICAgfVxuICAgKiAgICAgIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGRlZmF1bHRQb3NpdGlvbjogX3Byb3BUeXBlcy5kZWZhdWx0LnNoYXBlKHtcbiAgICB4OiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICAgIHk6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXJcbiAgfSksXG4gIHBvc2l0aW9uT2Zmc2V0OiBfcHJvcFR5cGVzLmRlZmF1bHQuc2hhcGUoe1xuICAgIHg6IF9wcm9wVHlwZXMuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmddKSxcbiAgICB5OiBfcHJvcFR5cGVzLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nXSlcbiAgfSksXG5cbiAgLyoqXG4gICAqIGBwb3NpdGlvbmAsIGlmIHByZXNlbnQsIGRlZmluZXMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQuXG4gICAqXG4gICAqICBUaGlzIGlzIHNpbWlsYXIgdG8gaG93IGZvcm0gZWxlbWVudHMgaW4gUmVhY3Qgd29yayAtIGlmIG5vIGBwb3NpdGlvbmAgaXMgc3VwcGxpZWQsIHRoZSBjb21wb25lbnRcbiAgICogIGlzIHVuY29udHJvbGxlZC5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICpcbiAgICogYGBganN4XG4gICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAqICAgICAgICAgICAgICByZXR1cm4gKFxuICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgcG9zaXRpb249e3t4OiAyNSwgeTogMjV9fT5cbiAgICogICAgICAgICAgICAgICAgICAgICAgPGRpdj5JIHN0YXJ0IHdpdGggdHJhbnNmb3JtWDogMjVweCBhbmQgdHJhbnNmb3JtWTogMjVweDs8L2Rpdj5cbiAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICogICAgICAgICAgICAgICk7XG4gICAqICAgICAgICAgIH1cbiAgICogICAgICB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwb3NpdGlvbjogX3Byb3BUeXBlcy5kZWZhdWx0LnNoYXBlKHtcbiAgICB4OiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuICAgIHk6IF9wcm9wVHlwZXMuZGVmYXVsdC5udW1iZXJcbiAgfSksXG5cbiAgLyoqXG4gICAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNoaWxkLCBub3QgaGVyZS5cbiAgICovXG4gIGNsYXNzTmFtZTogX3NoaW1zLmRvbnRTZXRNZSxcbiAgc3R5bGU6IF9zaGltcy5kb250U2V0TWUsXG4gIHRyYW5zZm9ybTogX3NoaW1zLmRvbnRTZXRNZVxufSkpO1xuXG5fZGVmaW5lUHJvcGVydHkoRHJhZ2dhYmxlLCBcImRlZmF1bHRQcm9wc1wiLCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIF9EcmFnZ2FibGVDb3JlLmRlZmF1bHQuZGVmYXVsdFByb3BzKSwge30sIHtcbiAgYXhpczogJ2JvdGgnLFxuICBib3VuZHM6IGZhbHNlLFxuICBkZWZhdWx0Q2xhc3NOYW1lOiAncmVhY3QtZHJhZ2dhYmxlJyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiAncmVhY3QtZHJhZ2dhYmxlLWRyYWdnaW5nJyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gIGRlZmF1bHRQb3NpdGlvbjoge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LFxuICBzY2FsZTogMVxufSkpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBSZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicHJvcC10eXBlc1wiKSk7XG5cbnZhciBfcmVhY3REb20gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXG52YXIgX2RvbUZucyA9IHJlcXVpcmUoXCIuL3V0aWxzL2RvbUZuc1wiKTtcblxudmFyIF9wb3NpdGlvbkZucyA9IHJlcXVpcmUoXCIuL3V0aWxzL3Bvc2l0aW9uRm5zXCIpO1xuXG52YXIgX3NoaW1zID0gcmVxdWlyZShcIi4vdXRpbHMvc2hpbXNcIik7XG5cbnZhciBfbG9nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9sb2dcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IF90eXBlb2Yob2JqKSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHsgcmV0dXJuIHsgZGVmYXVsdDogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8vIFNpbXBsZSBhYnN0cmFjdGlvbiBmb3IgZHJhZ2dpbmcgZXZlbnRzIG5hbWVzLlxudmFyIGV2ZW50c0ZvciA9IHtcbiAgdG91Y2g6IHtcbiAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIHN0b3A6ICd0b3VjaGVuZCdcbiAgfSxcbiAgbW91c2U6IHtcbiAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgc3RvcDogJ21vdXNldXAnXG4gIH1cbn07IC8vIERlZmF1bHQgdG8gbW91c2UgZXZlbnRzLlxuXG52YXIgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuLyo6OiB0eXBlIERyYWdnYWJsZUNvcmVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGxhc3RYOiBudW1iZXIsXG4gIGxhc3RZOiBudW1iZXIsXG4gIHRvdWNoSWRlbnRpZmllcjogP251bWJlclxufTsqL1xuXG4vKjo6IGV4cG9ydCB0eXBlIERyYWdnYWJsZURhdGEgPSB7XG4gIG5vZGU6IEhUTUxFbGVtZW50LFxuICB4OiBudW1iZXIsIHk6IG51bWJlcixcbiAgZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyLFxuICBsYXN0WDogbnVtYmVyLCBsYXN0WTogbnVtYmVyLFxufTsqL1xuXG4vKjo6IGV4cG9ydCB0eXBlIERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlOiBNb3VzZUV2ZW50LCBkYXRhOiBEcmFnZ2FibGVEYXRhKSA9PiB2b2lkIHwgZmFsc2U7Ki9cblxuLyo6OiBleHBvcnQgdHlwZSBDb250cm9sUG9zaXRpb24gPSB7eDogbnVtYmVyLCB5OiBudW1iZXJ9OyovXG5cbi8qOjogZXhwb3J0IHR5cGUgUG9zaXRpb25PZmZzZXRDb250cm9sUG9zaXRpb24gPSB7eDogbnVtYmVyfHN0cmluZywgeTogbnVtYmVyfHN0cmluZ307Ki9cblxuLyo6OiBleHBvcnQgdHlwZSBEcmFnZ2FibGVDb3JlRGVmYXVsdFByb3BzID0ge1xuICBhbGxvd0FueUNsaWNrOiBib29sZWFuLFxuICBkaXNhYmxlZDogYm9vbGVhbixcbiAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IGJvb2xlYW4sXG4gIG9uU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25EcmFnOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uU3RvcDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvbk1vdXNlRG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHZvaWQsXG4gIHNjYWxlOiBudW1iZXIsXG59OyovXG5cbi8qOjogZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZVByb3BzID0ge1xuICAuLi5EcmFnZ2FibGVDb3JlRGVmYXVsdFByb3BzLFxuICBjYW5jZWw6IHN0cmluZyxcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudDxhbnk+LFxuICBvZmZzZXRQYXJlbnQ6IEhUTUxFbGVtZW50LFxuICBncmlkOiBbbnVtYmVyLCBudW1iZXJdLFxuICBoYW5kbGU6IHN0cmluZyxcbiAgbm9kZVJlZj86ID9SZWFjdC5FbGVtZW50UmVmPGFueT4sXG59OyovXG5cbi8vXG4vLyBEZWZpbmUgPERyYWdnYWJsZUNvcmU+LlxuLy9cbi8vIDxEcmFnZ2FibGVDb3JlPiBpcyBmb3IgYWR2YW5jZWQgdXNhZ2Ugb2YgPERyYWdnYWJsZT4uIEl0IG1haW50YWlucyBtaW5pbWFsIGludGVybmFsIHN0YXRlIHNvIGl0IGNhblxuLy8gd29yayB3ZWxsIHdpdGggbGlicmFyaWVzIHRoYXQgcmVxdWlyZSBtb3JlIGNvbnRyb2wgb3ZlciB0aGUgZWxlbWVudC5cbi8vXG52YXIgRHJhZ2dhYmxlQ29yZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRHJhZ2dhYmxlQ29yZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihEcmFnZ2FibGVDb3JlKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGVDb3JlKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcmFnZ2FibGVDb3JlKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsLmFwcGx5KF9zdXBlciwgW3RoaXNdLmNvbmNhdChhcmdzKSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwic3RhdGVcIiwge1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgLy8gVXNlZCB3aGlsZSBkcmFnZ2luZyB0byBkZXRlcm1pbmUgZGVsdGFzLlxuICAgICAgbGFzdFg6IE5hTixcbiAgICAgIGxhc3RZOiBOYU4sXG4gICAgICB0b3VjaElkZW50aWZpZXI6IG51bGxcbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJtb3VudGVkXCIsIGZhbHNlKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJoYW5kbGVEcmFnU3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZS5cbiAgICAgIF90aGlzLnByb3BzLm9uTW91c2VEb3duKGUpOyAvLyBPbmx5IGFjY2VwdCBsZWZ0LWNsaWNrcy5cblxuXG4gICAgICBpZiAoIV90aGlzLnByb3BzLmFsbG93QW55Q2xpY2sgJiYgdHlwZW9mIGUuYnV0dG9uID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuIGZhbHNlOyAvLyBHZXQgbm9kZXMuIEJlIHN1cmUgdG8gZ3JhYiByZWxhdGl2ZSBkb2N1bWVudCAoY291bGQgYmUgaWZyYW1lZClcblxuICAgICAgdmFyIHRoaXNOb2RlID0gX3RoaXMuZmluZERPTU5vZGUoKTtcblxuICAgICAgaWYgKCF0aGlzTm9kZSB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudCB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+IG5vdCBtb3VudGVkIG9uIERyYWdTdGFydCEnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG93bmVyRG9jdW1lbnQgPSB0aGlzTm9kZS5vd25lckRvY3VtZW50OyAvLyBTaG9ydCBjaXJjdWl0IGlmIGhhbmRsZSBvciBjYW5jZWwgcHJvcCB3YXMgcHJvdmlkZWQgYW5kIHNlbGVjdG9yIGRvZXNuJ3QgbWF0Y2guXG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhKGUudGFyZ2V0IGluc3RhbmNlb2Ygb3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5Ob2RlKSB8fCBfdGhpcy5wcm9wcy5oYW5kbGUgJiYgISgwLCBfZG9tRm5zLm1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbykoZS50YXJnZXQsIF90aGlzLnByb3BzLmhhbmRsZSwgdGhpc05vZGUpIHx8IF90aGlzLnByb3BzLmNhbmNlbCAmJiAoMCwgX2RvbUZucy5tYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8pKGUudGFyZ2V0LCBfdGhpcy5wcm9wcy5jYW5jZWwsIHRoaXNOb2RlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFByZXZlbnQgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzLCBsaWtlIGlwYWQvaXBob25lLlxuICAgICAgLy8gSW1wb3J0YW50IHRoYXQgdGhpcyBpcyBhZnRlciBoYW5kbGUvY2FuY2VsLlxuXG5cbiAgICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JykgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBTZXQgdG91Y2ggaWRlbnRpZmllciBpbiBjb21wb25lbnQgc3RhdGUgaWYgdGhpcyBpcyBhIHRvdWNoIGV2ZW50LiBUaGlzIGFsbG93cyB1cyB0b1xuICAgICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbmRpdmlkdWFsIHRvdWNoZXMgb24gbXVsdGl0b3VjaCBzY3JlZW5zIGJ5IGlkZW50aWZ5aW5nIHdoaWNoXG4gICAgICAvLyB0b3VjaHBvaW50IHdhcyBzZXQgdG8gdGhpcyBlbGVtZW50LlxuXG4gICAgICB2YXIgdG91Y2hJZGVudGlmaWVyID0gKDAsIF9kb21GbnMuZ2V0VG91Y2hJZGVudGlmaWVyKShlKTtcblxuICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3VjaElkZW50aWZpZXI6IHRvdWNoSWRlbnRpZmllclxuICAgICAgfSk7IC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cblxuXG4gICAgICB2YXIgcG9zaXRpb24gPSAoMCwgX3Bvc2l0aW9uRm5zLmdldENvbnRyb2xQb3NpdGlvbikoZSwgdG91Y2hJZGVudGlmaWVyLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuOyAvLyBub3QgcG9zc2libGUgYnV0IHNhdGlzZmllcyBmbG93XG5cbiAgICAgIHZhciB4ID0gcG9zaXRpb24ueCxcbiAgICAgICAgICB5ID0gcG9zaXRpb24ueTsgLy8gQ3JlYXRlIGFuIGV2ZW50IG9iamVjdCB3aXRoIGFsbCB0aGUgZGF0YSBwYXJlbnRzIG5lZWQgdG8gbWFrZSBhIGRlY2lzaW9uIGhlcmUuXG5cbiAgICAgIHZhciBjb3JlRXZlbnQgPSAoMCwgX3Bvc2l0aW9uRm5zLmNyZWF0ZUNvcmVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgeCwgeSk7XG4gICAgICAoMCwgX2xvZy5kZWZhdWx0KSgnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0YXJ0OiAlaicsIGNvcmVFdmVudCk7IC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgY2FuY2VsLlxuXG4gICAgICAoMCwgX2xvZy5kZWZhdWx0KSgnY2FsbGluZycsIF90aGlzLnByb3BzLm9uU3RhcnQpO1xuXG4gICAgICB2YXIgc2hvdWxkVXBkYXRlID0gX3RoaXMucHJvcHMub25TdGFydChlLCBjb3JlRXZlbnQpO1xuXG4gICAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSB8fCBfdGhpcy5tb3VudGVkID09PSBmYWxzZSkgcmV0dXJuOyAvLyBBZGQgYSBzdHlsZSB0byB0aGUgYm9keSB0byBkaXNhYmxlIHVzZXItc2VsZWN0LiBUaGlzIHByZXZlbnRzIHRleHQgZnJvbVxuICAgICAgLy8gYmVpbmcgc2VsZWN0ZWQgYWxsIG92ZXIgdGhlIHBhZ2UuXG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgKDAsIF9kb21GbnMuYWRkVXNlclNlbGVjdFN0eWxlcykob3duZXJEb2N1bWVudCk7IC8vIEluaXRpYXRlIGRyYWdnaW5nLiBTZXQgdGhlIGN1cnJlbnQgeCBhbmQgeSBhcyBvZmZzZXRzXG4gICAgICAvLyBzbyB3ZSBrbm93IGhvdyBtdWNoIHdlJ3ZlIG1vdmVkIGR1cmluZyB0aGUgZHJhZy4gVGhpcyBhbGxvd3MgdXNcbiAgICAgIC8vIHRvIGRyYWcgZWxlbWVudHMgYXJvdW5kIGV2ZW4gaWYgdGhleSBoYXZlIGJlZW4gbW92ZWQsIHdpdGhvdXQgaXNzdWUuXG5cbiAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICAgIGxhc3RYOiB4LFxuICAgICAgICBsYXN0WTogeVxuICAgICAgfSk7IC8vIEFkZCBldmVudHMgdG8gdGhlIGRvY3VtZW50IGRpcmVjdGx5IHNvIHdlIGNhdGNoIHdoZW4gdGhlIHVzZXIncyBtb3VzZS90b3VjaCBtb3ZlcyBvdXRzaWRlIG9mXG4gICAgICAvLyB0aGlzIGVsZW1lbnQuIFdlIHVzZSBkaWZmZXJlbnQgZXZlbnRzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB3ZSBoYXZlIGRldGVjdGVkIHRoYXQgdGhpc1xuICAgICAgLy8gaXMgYSB0b3VjaC1jYXBhYmxlIGRldmljZS5cblxuXG4gICAgICAoMCwgX2RvbUZucy5hZGRFdmVudCkob3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIF90aGlzLmhhbmRsZURyYWcpO1xuICAgICAgKDAsIF9kb21GbnMuYWRkRXZlbnQpKG93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5zdG9wLCBfdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiaGFuZGxlRHJhZ1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGRyYWcgcG9pbnQgZnJvbSB0aGUgZXZlbnQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgb2Zmc2V0LlxuICAgICAgdmFyIHBvc2l0aW9uID0gKDAsIF9wb3NpdGlvbkZucy5nZXRDb250cm9sUG9zaXRpb24pKGUsIF90aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICAgIHZhciB4ID0gcG9zaXRpb24ueCxcbiAgICAgICAgICB5ID0gcG9zaXRpb24ueTsgLy8gU25hcCB0byBncmlkIGlmIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3RoaXMucHJvcHMuZ3JpZCkpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IHggLSBfdGhpcy5zdGF0ZS5sYXN0WCxcbiAgICAgICAgICAgIGRlbHRhWSA9IHkgLSBfdGhpcy5zdGF0ZS5sYXN0WTtcblxuICAgICAgICB2YXIgX3NuYXBUb0dyaWQgPSAoMCwgX3Bvc2l0aW9uRm5zLnNuYXBUb0dyaWQpKF90aGlzLnByb3BzLmdyaWQsIGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICB2YXIgX3NuYXBUb0dyaWQyID0gX3NsaWNlZFRvQXJyYXkoX3NuYXBUb0dyaWQsIDIpO1xuXG4gICAgICAgIGRlbHRhWCA9IF9zbmFwVG9HcmlkMlswXTtcbiAgICAgICAgZGVsdGFZID0gX3NuYXBUb0dyaWQyWzFdO1xuICAgICAgICBpZiAoIWRlbHRhWCAmJiAhZGVsdGFZKSByZXR1cm47IC8vIHNraXAgdXNlbGVzcyBkcmFnXG5cbiAgICAgICAgeCA9IF90aGlzLnN0YXRlLmxhc3RYICsgZGVsdGFYLCB5ID0gX3RoaXMuc3RhdGUubGFzdFkgKyBkZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3JlRXZlbnQgPSAoMCwgX3Bvc2l0aW9uRm5zLmNyZWF0ZUNvcmVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgeCwgeSk7XG4gICAgICAoMCwgX2xvZy5kZWZhdWx0KSgnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZzogJWonLCBjb3JlRXZlbnQpOyAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIHRyaWdnZXIgZW5kLlxuXG4gICAgICB2YXIgc2hvdWxkVXBkYXRlID0gX3RoaXMucHJvcHMub25EcmFnKGUsIGNvcmVFdmVudCk7XG5cbiAgICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlIHx8IF90aGlzLm1vdW50ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gJEZsb3dJZ25vcmVcbiAgICAgICAgICBfdGhpcy5oYW5kbGVEcmFnU3RvcChuZXcgTW91c2VFdmVudCgnbW91c2V1cCcpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLy8gT2xkIGJyb3dzZXJzXG4gICAgICAgICAgdmFyIGV2ZW50ID0gKChkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKVxuICAgICAgICAgIC8qOiBhbnkqL1xuICAgICAgICAgIClcbiAgICAgICAgICAvKjogTW91c2VUb3VjaEV2ZW50Ki9cbiAgICAgICAgICApOyAvLyBJIHNlZSB3aHkgdGhpcyBpbnNhbml0eSB3YXMgZGVwcmVjYXRlZFxuICAgICAgICAgIC8vICRGbG93SWdub3JlXG5cbiAgICAgICAgICBldmVudC5pbml0TW91c2VFdmVudCgnbW91c2V1cCcsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXG4gICAgICAgICAgX3RoaXMuaGFuZGxlRHJhZ1N0b3AoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxhc3RYOiB4LFxuICAgICAgICBsYXN0WTogeVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiaGFuZGxlRHJhZ1N0b3BcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghX3RoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybjtcbiAgICAgIHZhciBwb3NpdGlvbiA9ICgwLCBfcG9zaXRpb25GbnMuZ2V0Q29udHJvbFBvc2l0aW9uKShlLCBfdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgICB2YXIgeCA9IHBvc2l0aW9uLngsXG4gICAgICAgICAgeSA9IHBvc2l0aW9uLnk7IC8vIFNuYXAgdG8gZ3JpZCBpZiBwcm9wIGhhcyBiZWVuIHByb3ZpZGVkXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KF90aGlzLnByb3BzLmdyaWQpKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSB4IC0gX3RoaXMuc3RhdGUubGFzdFggfHwgMDtcbiAgICAgICAgdmFyIGRlbHRhWSA9IHkgLSBfdGhpcy5zdGF0ZS5sYXN0WSB8fCAwO1xuXG4gICAgICAgIHZhciBfc25hcFRvR3JpZDMgPSAoMCwgX3Bvc2l0aW9uRm5zLnNuYXBUb0dyaWQpKF90aGlzLnByb3BzLmdyaWQsIGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICB2YXIgX3NuYXBUb0dyaWQ0ID0gX3NsaWNlZFRvQXJyYXkoX3NuYXBUb0dyaWQzLCAyKTtcblxuICAgICAgICBkZWx0YVggPSBfc25hcFRvR3JpZDRbMF07XG4gICAgICAgIGRlbHRhWSA9IF9zbmFwVG9HcmlkNFsxXTtcbiAgICAgICAgeCA9IF90aGlzLnN0YXRlLmxhc3RYICsgZGVsdGFYLCB5ID0gX3RoaXMuc3RhdGUubGFzdFkgKyBkZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3JlRXZlbnQgPSAoMCwgX3Bvc2l0aW9uRm5zLmNyZWF0ZUNvcmVEYXRhKShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgeCwgeSk7IC8vIENhbGwgZXZlbnQgaGFuZGxlclxuXG4gICAgICB2YXIgc2hvdWxkQ29udGludWUgPSBfdGhpcy5wcm9wcy5vblN0b3AoZSwgY29yZUV2ZW50KTtcblxuICAgICAgaWYgKHNob3VsZENvbnRpbnVlID09PSBmYWxzZSB8fCBfdGhpcy5tb3VudGVkID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB2YXIgdGhpc05vZGUgPSBfdGhpcy5maW5kRE9NTm9kZSgpO1xuXG4gICAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHVzZXItc2VsZWN0IGhhY2tcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSAoMCwgX2RvbUZucy5yZW1vdmVVc2VyU2VsZWN0U3R5bGVzKSh0aGlzTm9kZS5vd25lckRvY3VtZW50KTtcbiAgICAgIH1cblxuICAgICAgKDAsIF9sb2cuZGVmYXVsdCkoJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWdTdG9wOiAlaicsIGNvcmVFdmVudCk7IC8vIFJlc2V0IHRoZSBlbC5cblxuICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIGxhc3RYOiBOYU4sXG4gICAgICAgIGxhc3RZOiBOYU5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgICgwLCBfbG9nLmRlZmF1bHQpKCdEcmFnZ2FibGVDb3JlOiBSZW1vdmluZyBoYW5kbGVycycpO1xuICAgICAgICAoMCwgX2RvbUZucy5yZW1vdmVFdmVudCkodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIF90aGlzLmhhbmRsZURyYWcpO1xuICAgICAgICAoMCwgX2RvbUZucy5yZW1vdmVFdmVudCkodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIF90aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJvbk1vdXNlRG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlOyAvLyBvbiB0b3VjaHNjcmVlbiBsYXB0b3BzIHdlIGNvdWxkIHN3aXRjaCBiYWNrIHRvIG1vdXNlXG5cbiAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVEcmFnU3RhcnQoZSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwib25Nb3VzZVVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IubW91c2U7XG4gICAgICByZXR1cm4gX3RoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwib25Ub3VjaFN0YXJ0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBXZSdyZSBvbiBhIHRvdWNoIGRldmljZSBub3csIHNvIGNoYW5nZSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcbiAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVEcmFnU3RhcnQoZSk7XG4gICAgfSk7XG5cbiAgICBfZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwib25Ub3VjaEVuZFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IudG91Y2g7XG4gICAgICByZXR1cm4gX3RoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRHJhZ2dhYmxlQ29yZSwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLm1vdW50ZWQgPSB0cnVlOyAvLyBUb3VjaCBoYW5kbGVycyBtdXN0IGJlIGFkZGVkIHdpdGgge3Bhc3NpdmU6IGZhbHNlfSB0byBiZSBjYW5jZWxhYmxlLlxuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNy8wMS9zY3JvbGxpbmctaW50ZXJ2ZW50aW9uXG5cbiAgICAgIHZhciB0aGlzTm9kZSA9IHRoaXMuZmluZERPTU5vZGUoKTtcblxuICAgICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAgICgwLCBfZG9tRm5zLmFkZEV2ZW50KSh0aGlzTm9kZSwgZXZlbnRzRm9yLnRvdWNoLnN0YXJ0LCB0aGlzLm9uVG91Y2hTdGFydCwge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlOyAvLyBSZW1vdmUgYW55IGxlZnRvdmVyIGV2ZW50IGhhbmRsZXJzLiBSZW1vdmUgYm90aCB0b3VjaCBhbmQgbW91c2UgaGFuZGxlcnMgaW4gY2FzZVxuICAgICAgLy8gc29tZSBicm93c2VyIHF1aXJrIGNhdXNlZCBhIHRvdWNoIGV2ZW50IHRvIGZpcmUgZHVyaW5nIGEgbW91c2UgbW92ZSwgb3IgdmljZSB2ZXJzYS5cblxuICAgICAgdmFyIHRoaXNOb2RlID0gdGhpcy5maW5kRE9NTm9kZSgpO1xuXG4gICAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgICAgdmFyIG93bmVyRG9jdW1lbnQgPSB0aGlzTm9kZS5vd25lckRvY3VtZW50O1xuICAgICAgICAoMCwgX2RvbUZucy5yZW1vdmVFdmVudCkob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICAgICgwLCBfZG9tRm5zLnJlbW92ZUV2ZW50KShvd25lckRvY3VtZW50LCBldmVudHNGb3IudG91Y2gubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgICAgKDAsIF9kb21GbnMucmVtb3ZlRXZlbnQpKG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci5tb3VzZS5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgICAgKDAsIF9kb21GbnMucmVtb3ZlRXZlbnQpKG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgICAgKDAsIF9kb21GbnMucmVtb3ZlRXZlbnQpKHRoaXNOb2RlLCBldmVudHNGb3IudG91Y2guc3RhcnQsIHRoaXMub25Ub3VjaFN0YXJ0LCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSAoMCwgX2RvbUZucy5yZW1vdmVVc2VyU2VsZWN0U3R5bGVzKShvd25lckRvY3VtZW50KTtcbiAgICAgIH1cbiAgICB9IC8vIFJlYWN0IFN0cmljdCBNb2RlIGNvbXBhdGliaWxpdHk6IGlmIGBub2RlUmVmYCBpcyBwYXNzZWQsIHdlIHdpbGwgdXNlIGl0IGluc3RlYWQgb2YgdHJ5aW5nIHRvIGZpbmRcbiAgICAvLyB0aGUgdW5kZXJseWluZyBET00gbm9kZSBvdXJzZWx2ZXMuIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiZmluZERPTU5vZGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZERPTU5vZGUoKVxuICAgIC8qOiA/SFRNTEVsZW1lbnQqL1xuICAgIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcywgX3RoaXMkcHJvcHMyLCBfdGhpcyRwcm9wczIkbm9kZVJlZjtcblxuICAgICAgcmV0dXJuIChfdGhpcyRwcm9wcyA9IHRoaXMucHJvcHMpICE9PSBudWxsICYmIF90aGlzJHByb3BzICE9PSB2b2lkIDAgJiYgX3RoaXMkcHJvcHMubm9kZVJlZiA/IChfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzKSA9PT0gbnVsbCB8fCBfdGhpcyRwcm9wczIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfdGhpcyRwcm9wczIkbm9kZVJlZiA9IF90aGlzJHByb3BzMi5ub2RlUmVmKSA9PT0gbnVsbCB8fCBfdGhpcyRwcm9wczIkbm9kZVJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkcHJvcHMyJG5vZGVSZWYuY3VycmVudCA6IF9yZWFjdERvbS5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKClcbiAgICAvKjogUmVhY3QuRWxlbWVudDxhbnk+Ki9cbiAgICB7XG4gICAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICAgIC8vIE5vdGU6IG1vdXNlTW92ZSBoYW5kbGVyIGlzIGF0dGFjaGVkIHRvIGRvY3VtZW50IHNvIGl0IHdpbGwgc3RpbGwgZnVuY3Rpb25cbiAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBkcmFncyBxdWlja2x5IGFuZCBsZWF2ZXMgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgb25Nb3VzZURvd246IHRoaXMub25Nb3VzZURvd24sXG4gICAgICAgIG9uTW91c2VVcDogdGhpcy5vbk1vdXNlVXAsXG4gICAgICAgIC8vIG9uVG91Y2hTdGFydCBpcyBhZGRlZCBvbiBgY29tcG9uZW50RGlkTW91bnRgIHNvIHRoZXkgY2FuIGJlIGFkZGVkIHdpdGhcbiAgICAgICAgLy8ge3Bhc3NpdmU6IGZhbHNlfSwgd2hpY2ggYWxsb3dzIGl0IHRvIGNhbmNlbC4gU2VlXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTcvMDEvc2Nyb2xsaW5nLWludGVydmVudGlvblxuICAgICAgICBvblRvdWNoRW5kOiB0aGlzLm9uVG91Y2hFbmRcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmFnZ2FibGVDb3JlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEcmFnZ2FibGVDb3JlO1xuXG5fZGVmaW5lUHJvcGVydHkoRHJhZ2dhYmxlQ29yZSwgXCJkaXNwbGF5TmFtZVwiLCAnRHJhZ2dhYmxlQ29yZScpO1xuXG5fZGVmaW5lUHJvcGVydHkoRHJhZ2dhYmxlQ29yZSwgXCJwcm9wVHlwZXNcIiwge1xuICAvKipcbiAgICogYGFsbG93QW55Q2xpY2tgIGFsbG93cyBkcmFnZ2luZyB1c2luZyBhbnkgbW91c2UgYnV0dG9uLlxuICAgKiBCeSBkZWZhdWx0LCB3ZSBvbmx5IGFjY2VwdCB0aGUgbGVmdCBidXR0b24uXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAqL1xuICBhbGxvd0FueUNsaWNrOiBfcHJvcFR5cGVzLmRlZmF1bHQuYm9vbCxcblxuICAvKipcbiAgICogYGRpc2FibGVkYCwgaWYgdHJ1ZSwgc3RvcHMgdGhlIDxEcmFnZ2FibGU+IGZyb20gZHJhZ2dpbmcuIEFsbCBoYW5kbGVycyxcbiAgICogd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGBvbk1vdXNlRG93bmAsIHdpbGwgbm90IGZpcmUuXG4gICAqL1xuICBkaXNhYmxlZDogX3Byb3BUeXBlcy5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIHdlIGFkZCAndXNlci1zZWxlY3Q6bm9uZScgYXR0cmlidXRlcyB0byB0aGUgZG9jdW1lbnQgYm9keVxuICAgKiB0byBwcmV2ZW50IHVnbHkgdGV4dCBzZWxlY3Rpb24gZHVyaW5nIGRyYWcuIElmIHRoaXMgaXMgY2F1c2luZyBwcm9ibGVtc1xuICAgKiBmb3IgeW91ciBhcHAsIHNldCB0aGlzIHRvIGBmYWxzZWAuXG4gICAqL1xuICBlbmFibGVVc2VyU2VsZWN0SGFjazogX3Byb3BUeXBlcy5kZWZhdWx0LmJvb2wsXG5cbiAgLyoqXG4gICAqIGBvZmZzZXRQYXJlbnRgLCBpZiBzZXQsIHVzZXMgdGhlIHBhc3NlZCBET00gbm9kZSB0byBjb21wdXRlIGRyYWcgb2Zmc2V0c1xuICAgKiBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBwYXJlbnQgbm9kZS5cbiAgICovXG4gIG9mZnNldFBhcmVudDogZnVuY3Rpb24gb2Zmc2V0UGFyZW50KHByb3BzXG4gIC8qOiBEcmFnZ2FibGVDb3JlUHJvcHMqL1xuICAsIHByb3BOYW1lXG4gIC8qOiAkS2V5czxEcmFnZ2FibGVDb3JlUHJvcHM+Ki9cbiAgKSB7XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSAmJiBwcm9wc1twcm9wTmFtZV0ubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ2dhYmxlXFwncyBvZmZzZXRQYXJlbnQgbXVzdCBiZSBhIERPTSBOb2RlLicpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogYGdyaWRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IGRyYWdnaW5nIHNob3VsZCBzbmFwIHRvLlxuICAgKi9cbiAgZ3JpZDogX3Byb3BUeXBlcy5kZWZhdWx0LmFycmF5T2YoX3Byb3BUeXBlcy5kZWZhdWx0Lm51bWJlciksXG5cbiAgLyoqXG4gICAqIGBoYW5kbGVgIHNwZWNpZmllcyBhIHNlbGVjdG9yIHRvIGJlIHVzZWQgYXMgdGhlIGhhbmRsZSB0aGF0IGluaXRpYXRlcyBkcmFnLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiBgYGBqc3hcbiAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICogICAgICAgICByZXR1cm4gKFxuICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgaGFuZGxlPVwiLmhhbmRsZVwiPlxuICAgKiAgICAgICAgICAgICAgPGRpdj5cbiAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICogICAgICAgICAgICAgICAgICA8ZGl2PlRoaXMgaXMgc29tZSBvdGhlciBjb250ZW50PC9kaXY+XG4gICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgKiAgICAgICAgICk7XG4gICAqICAgICAgIH1cbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqL1xuICBoYW5kbGU6IF9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIGBjYW5jZWxgIHNwZWNpZmllcyBhIHNlbGVjdG9yIHRvIGJlIHVzZWQgdG8gcHJldmVudCBkcmFnIGluaXRpYWxpemF0aW9uLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKlxuICAgKiBgYGBqc3hcbiAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICogICAgICAgICAgIHJldHVybihcbiAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGNhbmNlbD1cIi5jYW5jZWxcIj5cbiAgICogICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgKiAgICAgICAgICAgICAgICAgICAgIDxkaXY+RHJhZ2dpbmcgaGVyZSB3b3JrcyBmaW5lPC9kaXY+XG4gICAqICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgKiAgICAgICAgICAgKTtcbiAgICogICAgICAgfVxuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNhbmNlbDogX3Byb3BUeXBlcy5kZWZhdWx0LnN0cmluZyxcblxuICAvKiBJZiBydW5uaW5nIGluIFJlYWN0IFN0cmljdCBtb2RlLCBSZWFjdERPTS5maW5kRE9NTm9kZSgpIGlzIGRlcHJlY2F0ZWQuXG4gICAqIFVuZm9ydHVuYXRlbHksIGluIG9yZGVyIGZvciA8RHJhZ2dhYmxlPiB0byB3b3JrIHByb3Blcmx5LCB3ZSBuZWVkIHJhdyBhY2Nlc3NcbiAgICogdG8gdGhlIHVuZGVybHlpbmcgRE9NIG5vZGUuIElmIHlvdSB3YW50IHRvIGF2b2lkIHRoZSB3YXJuaW5nLCBwYXNzIGEgYG5vZGVSZWZgXG4gICAqIGFzIGluIHRoaXMgZXhhbXBsZTpcbiAgICpcbiAgICogZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAqICAgY29uc3Qgbm9kZVJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICogICByZXR1cm4gKFxuICAgKiAgICAgPERyYWdnYWJsZSBub2RlUmVmPXtub2RlUmVmfT5cbiAgICogICAgICAgPGRpdiByZWY9e25vZGVSZWZ9PkV4YW1wbGUgVGFyZ2V0PC9kaXY+XG4gICAqICAgICA8L0RyYWdnYWJsZT5cbiAgICogICApO1xuICAgKiB9XG4gICAqXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGFyYml0cmFyaWx5IG5lc3RlZCBjb21wb25lbnRzLCBzbyBsb25nIGFzIHRoZSByZWYgZW5kcyB1cFxuICAgKiBwb2ludGluZyB0byB0aGUgYWN0dWFsIGNoaWxkIERPTSBub2RlIGFuZCBub3QgYSBjdXN0b20gY29tcG9uZW50LlxuICAgKi9cbiAgbm9kZVJlZjogX3Byb3BUeXBlcy5kZWZhdWx0Lm9iamVjdCxcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RhcnRzLlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAqL1xuICBvblN0YXJ0OiBfcHJvcFR5cGVzLmRlZmF1bHQuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGVkIHdoaWxlIGRyYWdnaW5nLlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAqL1xuICBvbkRyYWc6IF9wcm9wVHlwZXMuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCB0aGUgZHJhZyB3aWxsIHJlbWFpbiBhY3RpdmUuXG4gICAqL1xuICBvblN0b3A6IF9wcm9wVHlwZXMuZGVmYXVsdC5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIHdvcmthcm91bmQgb3B0aW9uIHdoaWNoIGNhbiBiZSBwYXNzZWQgaWYgb25Nb3VzZURvd24gbmVlZHMgdG8gYmUgYWNjZXNzZWQsXG4gICAqIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChhcyB0aGVyZSBpcyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAqL1xuICBvbk1vdXNlRG93bjogX3Byb3BUeXBlcy5kZWZhdWx0LmZ1bmMsXG5cbiAgLyoqXG4gICAqIGBzY2FsZWAsIGlmIHNldCwgYXBwbGllcyBzY2FsaW5nIHdoaWxlIGRyYWdnaW5nIGFuIGVsZW1lbnRcbiAgICovXG4gIHNjYWxlOiBfcHJvcFR5cGVzLmRlZmF1bHQubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAqL1xuICBjbGFzc05hbWU6IF9zaGltcy5kb250U2V0TWUsXG4gIHN0eWxlOiBfc2hpbXMuZG9udFNldE1lLFxuICB0cmFuc2Zvcm06IF9zaGltcy5kb250U2V0TWVcbn0pO1xuXG5fZGVmaW5lUHJvcGVydHkoRHJhZ2dhYmxlQ29yZSwgXCJkZWZhdWx0UHJvcHNcIiwge1xuICBhbGxvd0FueUNsaWNrOiBmYWxzZSxcbiAgLy8gYnkgZGVmYXVsdCBvbmx5IGFjY2VwdCBsZWZ0IGNsaWNrXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IHRydWUsXG4gIG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoKSB7fSxcbiAgb25EcmFnOiBmdW5jdGlvbiBvbkRyYWcoKSB7fSxcbiAgb25TdG9wOiBmdW5jdGlvbiBvblN0b3AoKSB7fSxcbiAgb25Nb3VzZURvd246IGZ1bmN0aW9uIG9uTW91c2VEb3duKCkge30sXG4gIHNjYWxlOiAxXG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9EcmFnZ2FibGUnKSxcbiAgICBEcmFnZ2FibGUgPSBfcmVxdWlyZS5kZWZhdWx0LFxuICAgIERyYWdnYWJsZUNvcmUgPSBfcmVxdWlyZS5EcmFnZ2FibGVDb3JlOyAvLyBQcmV2aW91cyB2ZXJzaW9ucyBvZiB0aGlzIGxpYiBleHBvcnRlZCA8RHJhZ2dhYmxlPiBhcyB0aGUgcm9vdCBleHBvcnQuIEFzIHRvIG5vLS8vIHRoZW0sIG9yIFR5cGVTY3JpcHQsIHdlIGV4cG9ydCAqYm90aCogYXMgdGhlIHJvb3QgYW5kIGFzICdkZWZhdWx0Jy5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvcHVsbC8yNTRcbi8vIGFuZCBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvaXNzdWVzLzI2NlxuXG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUNvcmUgPSBEcmFnZ2FibGVDb3JlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENsYXNzTmFtZSA9IGFkZENsYXNzTmFtZTtcbmV4cG9ydHMuYWRkRXZlbnQgPSBhZGRFdmVudDtcbmV4cG9ydHMuYWRkVXNlclNlbGVjdFN0eWxlcyA9IGFkZFVzZXJTZWxlY3RTdHlsZXM7XG5leHBvcnRzLmNyZWF0ZUNTU1RyYW5zZm9ybSA9IGNyZWF0ZUNTU1RyYW5zZm9ybTtcbmV4cG9ydHMuY3JlYXRlU1ZHVHJhbnNmb3JtID0gY3JlYXRlU1ZHVHJhbnNmb3JtO1xuZXhwb3J0cy5nZXRUb3VjaCA9IGdldFRvdWNoO1xuZXhwb3J0cy5nZXRUb3VjaElkZW50aWZpZXIgPSBnZXRUb3VjaElkZW50aWZpZXI7XG5leHBvcnRzLmdldFRyYW5zbGF0aW9uID0gZ2V0VHJhbnNsYXRpb247XG5leHBvcnRzLmlubmVySGVpZ2h0ID0gaW5uZXJIZWlnaHQ7XG5leHBvcnRzLmlubmVyV2lkdGggPSBpbm5lcldpZHRoO1xuZXhwb3J0cy5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG5leHBvcnRzLm1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyA9IG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbztcbmV4cG9ydHMub2Zmc2V0WFlGcm9tUGFyZW50ID0gb2Zmc2V0WFlGcm9tUGFyZW50O1xuZXhwb3J0cy5vdXRlckhlaWdodCA9IG91dGVySGVpZ2h0O1xuZXhwb3J0cy5vdXRlcldpZHRoID0gb3V0ZXJXaWR0aDtcbmV4cG9ydHMucmVtb3ZlQ2xhc3NOYW1lID0gcmVtb3ZlQ2xhc3NOYW1lO1xuZXhwb3J0cy5yZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50O1xuZXhwb3J0cy5yZW1vdmVVc2VyU2VsZWN0U3R5bGVzID0gcmVtb3ZlVXNlclNlbGVjdFN0eWxlcztcblxudmFyIF9zaGltcyA9IHJlcXVpcmUoXCIuL3NoaW1zXCIpO1xuXG52YXIgX2dldFByZWZpeCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2dldFByZWZpeFwiKSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBkZWZhdWx0OiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChrZXkgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IG51bGwgIT0gYXJndW1lbnRzW2ldID8gYXJndW1lbnRzW2ldIDoge307IGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsXG4vKjogTm9kZSovXG4sIHNlbGVjdG9yXG4vKjogc3RyaW5nKi9cbilcbi8qOiBib29sZWFuKi9cbntcbiAgaWYgKCFtYXRjaGVzU2VsZWN0b3JGdW5jKSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9ICgwLCBfc2hpbXMuZmluZEluQXJyYXkpKFsnbWF0Y2hlcycsICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbW96TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ29NYXRjaGVzU2VsZWN0b3InXSwgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgICAgcmV0dXJuICgwLCBfc2hpbXMuaXNGdW5jdGlvbikoZWxbbWV0aG9kXSk7XG4gICAgfSk7XG4gIH0gLy8gTWlnaHQgbm90IGJlIGZvdW5kIGVudGlyZWx5IChub3QgYW4gRWxlbWVudD8pIC0gaW4gdGhhdCBjYXNlLCBiYWlsXG4gIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcblxuXG4gIGlmICghKDAsIF9zaGltcy5pc0Z1bmN0aW9uKShlbFttYXRjaGVzU2VsZWN0b3JGdW5jXSkpIHJldHVybiBmYWxzZTsgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuXG4gIHJldHVybiBlbFttYXRjaGVzU2VsZWN0b3JGdW5jXShzZWxlY3Rvcik7XG59IC8vIFdvcmtzIHVwIHRoZSB0cmVlIHRvIHRoZSBkcmFnZ2FibGUgaXRzZWxmIGF0dGVtcHRpbmcgdG8gbWF0Y2ggc2VsZWN0b3IuXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGVsXG4vKjogTm9kZSovXG4sIHNlbGVjdG9yXG4vKjogc3RyaW5nKi9cbiwgYmFzZU5vZGVcbi8qOiBOb2RlKi9cbilcbi8qOiBib29sZWFuKi9cbntcbiAgdmFyIG5vZGUgPSBlbDtcblxuICBkbyB7XG4gICAgaWYgKG1hdGNoZXNTZWxlY3Rvcihub2RlLCBzZWxlY3RvcikpIHJldHVybiB0cnVlO1xuICAgIGlmIChub2RlID09PSBiYXNlTm9kZSkgcmV0dXJuIGZhbHNlO1xuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH0gd2hpbGUgKG5vZGUpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnQoZWxcbi8qOiA/Tm9kZSovXG4sIGV2ZW50XG4vKjogc3RyaW5nKi9cbiwgaGFuZGxlclxuLyo6IEZ1bmN0aW9uKi9cbiwgaW5wdXRPcHRpb25zXG4vKjogT2JqZWN0Ki9cbilcbi8qOiB2b2lkKi9cbntcbiAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gIHZhciBvcHRpb25zID0gX29iamVjdFNwcmVhZCh7XG4gICAgY2FwdHVyZTogdHJ1ZVxuICB9LCBpbnB1dE9wdGlvbnMpOyAvLyAkRmxvd0lnbm9yZVttZXRob2QtdW5iaW5kaW5nXVxuXG5cbiAgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgfSBlbHNlIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgIGVsWydvbicgKyBldmVudF0gPSBoYW5kbGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsXG4vKjogP05vZGUqL1xuLCBldmVudFxuLyo6IHN0cmluZyovXG4sIGhhbmRsZXJcbi8qOiBGdW5jdGlvbiovXG4sIGlucHV0T3B0aW9uc1xuLyo6IE9iamVjdCovXG4pXG4vKjogdm9pZCovXG57XG4gIGlmICghZWwpIHJldHVybjtcblxuICB2YXIgb3B0aW9ucyA9IF9vYmplY3RTcHJlYWQoe1xuICAgIGNhcHR1cmU6IHRydWVcbiAgfSwgaW5wdXRPcHRpb25zKTsgLy8gJEZsb3dJZ25vcmVbbWV0aG9kLXVuYmluZGluZ11cblxuXG4gIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH0gZWxzZSBpZiAoZWwuZGV0YWNoRXZlbnQpIHtcbiAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBvdXRlckhlaWdodChub2RlXG4vKjogSFRNTEVsZW1lbnQqL1xuKVxuLyo6IG51bWJlciovXG57XG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGluZyBtYXJnaW4gZm9yIG91ciBjYWxjdWxhdGlvbnMsIHNpbmNlIHdlIGFyZSB1c2luZ1xuICAvLyBvZmZzZXRUb3Agd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgdmFyIGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBoZWlnaHQgKz0gKDAsIF9zaGltcy5pbnQpKGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xuICBoZWlnaHQgKz0gKDAsIF9zaGltcy5pbnQpKGNvbXB1dGVkU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBvdXRlcldpZHRoKG5vZGVcbi8qOiBIVE1MRWxlbWVudCovXG4pXG4vKjogbnVtYmVyKi9cbntcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldExlZnQgd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgdmFyIHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggKz0gKDAsIF9zaGltcy5pbnQpKGNvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoKTtcbiAgd2lkdGggKz0gKDAsIF9zaGltcy5pbnQpKGNvbXB1dGVkU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuZnVuY3Rpb24gaW5uZXJIZWlnaHQobm9kZVxuLyo6IEhUTUxFbGVtZW50Ki9cbilcbi8qOiBudW1iZXIqL1xue1xuICB2YXIgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIHZhciBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCAtPSAoMCwgX3NoaW1zLmludCkoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKTtcbiAgaGVpZ2h0IC09ICgwLCBfc2hpbXMuaW50KShjb21wdXRlZFN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBpbm5lcldpZHRoKG5vZGVcbi8qOiBIVE1MRWxlbWVudCovXG4pXG4vKjogbnVtYmVyKi9cbntcbiAgdmFyIHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggLT0gKDAsIF9zaGltcy5pbnQpKGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQpO1xuICB3aWR0aCAtPSAoMCwgX3NoaW1zLmludCkoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQpO1xuICByZXR1cm4gd2lkdGg7XG59XG4vKjo6IGludGVyZmFjZSBFdmVudFdpdGhPZmZzZXQge1xuICBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlclxufSovXG5cblxuLy8gR2V0IGZyb20gb2Zmc2V0UGFyZW50XG5mdW5jdGlvbiBvZmZzZXRYWUZyb21QYXJlbnQoZXZ0XG4vKjogRXZlbnRXaXRoT2Zmc2V0Ki9cbiwgb2Zmc2V0UGFyZW50XG4vKjogSFRNTEVsZW1lbnQqL1xuLCBzY2FsZVxuLyo6IG51bWJlciovXG4pXG4vKjogQ29udHJvbFBvc2l0aW9uKi9cbntcbiAgdmFyIGlzQm9keSA9IG9mZnNldFBhcmVudCA9PT0gb2Zmc2V0UGFyZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgdmFyIG9mZnNldFBhcmVudFJlY3QgPSBpc0JvZHkgPyB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IDBcbiAgfSA6IG9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHggPSAoZXZ0LmNsaWVudFggKyBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdCAtIG9mZnNldFBhcmVudFJlY3QubGVmdCkgLyBzY2FsZTtcbiAgdmFyIHkgPSAoZXZ0LmNsaWVudFkgKyBvZmZzZXRQYXJlbnQuc2Nyb2xsVG9wIC0gb2Zmc2V0UGFyZW50UmVjdC50b3ApIC8gc2NhbGU7XG4gIHJldHVybiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNTU1RyYW5zZm9ybShjb250cm9sUG9zXG4vKjogQ29udHJvbFBvc2l0aW9uKi9cbiwgcG9zaXRpb25PZmZzZXRcbi8qOiBQb3NpdGlvbk9mZnNldENvbnRyb2xQb3NpdGlvbiovXG4pXG4vKjogT2JqZWN0Ki9cbntcbiAgdmFyIHRyYW5zbGF0aW9uID0gZ2V0VHJhbnNsYXRpb24oY29udHJvbFBvcywgcG9zaXRpb25PZmZzZXQsICdweCcpO1xuICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCAoMCwgX2dldFByZWZpeC5icm93c2VyUHJlZml4VG9LZXkpKCd0cmFuc2Zvcm0nLCBfZ2V0UHJlZml4LmRlZmF1bHQpLCB0cmFuc2xhdGlvbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNWR1RyYW5zZm9ybShjb250cm9sUG9zXG4vKjogQ29udHJvbFBvc2l0aW9uKi9cbiwgcG9zaXRpb25PZmZzZXRcbi8qOiBQb3NpdGlvbk9mZnNldENvbnRyb2xQb3NpdGlvbiovXG4pXG4vKjogc3RyaW5nKi9cbntcbiAgdmFyIHRyYW5zbGF0aW9uID0gZ2V0VHJhbnNsYXRpb24oY29udHJvbFBvcywgcG9zaXRpb25PZmZzZXQsICcnKTtcbiAgcmV0dXJuIHRyYW5zbGF0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGlvbihfcmVmMiwgcG9zaXRpb25PZmZzZXRcbi8qOiBQb3NpdGlvbk9mZnNldENvbnRyb2xQb3NpdGlvbiovXG4sIHVuaXRTdWZmaXhcbi8qOiBzdHJpbmcqL1xuKVxuLyo6IHN0cmluZyovXG57XG4gIHZhciB4ID0gX3JlZjIueCxcbiAgICAgIHkgPSBfcmVmMi55O1xuICB2YXIgdHJhbnNsYXRpb24gPSBcInRyYW5zbGF0ZShcIi5jb25jYXQoeCkuY29uY2F0KHVuaXRTdWZmaXgsIFwiLFwiKS5jb25jYXQoeSkuY29uY2F0KHVuaXRTdWZmaXgsIFwiKVwiKTtcblxuICBpZiAocG9zaXRpb25PZmZzZXQpIHtcbiAgICB2YXIgZGVmYXVsdFggPSBcIlwiLmNvbmNhdCh0eXBlb2YgcG9zaXRpb25PZmZzZXQueCA9PT0gJ3N0cmluZycgPyBwb3NpdGlvbk9mZnNldC54IDogcG9zaXRpb25PZmZzZXQueCArIHVuaXRTdWZmaXgpO1xuICAgIHZhciBkZWZhdWx0WSA9IFwiXCIuY29uY2F0KHR5cGVvZiBwb3NpdGlvbk9mZnNldC55ID09PSAnc3RyaW5nJyA/IHBvc2l0aW9uT2Zmc2V0LnkgOiBwb3NpdGlvbk9mZnNldC55ICsgdW5pdFN1ZmZpeCk7XG4gICAgdHJhbnNsYXRpb24gPSBcInRyYW5zbGF0ZShcIi5jb25jYXQoZGVmYXVsdFgsIFwiLCBcIikuY29uY2F0KGRlZmF1bHRZLCBcIilcIikgKyB0cmFuc2xhdGlvbjtcbiAgfVxuXG4gIHJldHVybiB0cmFuc2xhdGlvbjtcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2goZVxuLyo6IE1vdXNlVG91Y2hFdmVudCovXG4sIGlkZW50aWZpZXJcbi8qOiBudW1iZXIqL1xuKVxuLyo6ID97Y2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXJ9Ki9cbntcbiAgcmV0dXJuIGUudGFyZ2V0VG91Y2hlcyAmJiAoMCwgX3NoaW1zLmZpbmRJbkFycmF5KShlLnRhcmdldFRvdWNoZXMsIGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIGlkZW50aWZpZXIgPT09IHQuaWRlbnRpZmllcjtcbiAgfSkgfHwgZS5jaGFuZ2VkVG91Y2hlcyAmJiAoMCwgX3NoaW1zLmZpbmRJbkFycmF5KShlLmNoYW5nZWRUb3VjaGVzLCBmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaElkZW50aWZpZXIoZVxuLyo6IE1vdXNlVG91Y2hFdmVudCovXG4pXG4vKjogP251bWJlciovXG57XG4gIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHJldHVybiBlLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG59IC8vIFVzZXItc2VsZWN0IEhhY2tzOlxuLy9cbi8vIFVzZWZ1bCBmb3IgcHJldmVudGluZyBibHVlIGhpZ2hsaWdodHMgYWxsIG92ZXIgZXZlcnl0aGluZyB3aGVuIGRyYWdnaW5nLlxuLy8gTm90ZSB3ZSdyZSBwYXNzaW5nIGBkb2N1bWVudGAgYi9jIHdlIGNvdWxkIGJlIGlmcmFtZWRcblxuXG5mdW5jdGlvbiBhZGRVc2VyU2VsZWN0U3R5bGVzKGRvY1xuLyo6ID9Eb2N1bWVudCovXG4pIHtcbiAgaWYgKCFkb2MpIHJldHVybjtcbiAgdmFyIHN0eWxlRWwgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0LWRyYWdnYWJsZS1zdHlsZS1lbCcpO1xuXG4gIGlmICghc3R5bGVFbCkge1xuICAgIHN0eWxlRWwgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlRWwuaWQgPSAncmVhY3QtZHJhZ2dhYmxlLXN0eWxlLWVsJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCA9ICcucmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbiAqOjotbW96LXNlbGVjdGlvbiB7YWxsOiBpbmhlcml0O31cXG4nO1xuICAgIHN0eWxlRWwuaW5uZXJIVE1MICs9ICcucmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbiAqOjpzZWxlY3Rpb24ge2FsbDogaW5oZXJpdDt9XFxuJztcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgfVxuXG4gIGlmIChkb2MuYm9keSkgYWRkQ2xhc3NOYW1lKGRvYy5ib2R5LCAncmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbicpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKGRvY1xuLyo6ID9Eb2N1bWVudCovXG4pIHtcbiAgaWYgKCFkb2MpIHJldHVybjtcblxuICB0cnkge1xuICAgIGlmIChkb2MuYm9keSkgcmVtb3ZlQ2xhc3NOYW1lKGRvYy5ib2R5LCAncmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbicpOyAvLyAkRmxvd0lnbm9yZTogSUVcblxuICAgIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICAvLyAkRmxvd0lnbm9yZTogSUVcbiAgICAgIGRvYy5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVtb3ZlIHNlbGVjdGlvbiBjYXVzZWQgYnkgc2Nyb2xsLCB1bmxlc3MgaXQncyBhIGZvY3VzZWQgaW5wdXRcbiAgICAgIC8vICh3ZSB1c2UgZG9jLmRlZmF1bHRWaWV3IGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lKVxuICAgICAgdmFyIHNlbGVjdGlvbiA9IChkb2MuZGVmYXVsdFZpZXcgfHwgd2luZG93KS5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24udHlwZSAhPT0gJ0NhcmV0Jykge1xuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7Ly8gcHJvYmFibHkgSUVcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRDbGFzc05hbWUoZWxcbi8qOiBIVE1MRWxlbWVudCovXG4sIGNsYXNzTmFtZVxuLyo6IHN0cmluZyovXG4pIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKFwiKD86XnxcXFxccylcIi5jb25jYXQoY2xhc3NOYW1lLCBcIig/IVxcXFxTKVwiKSkpKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gXCIgXCIuY29uY2F0KGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzTmFtZShlbFxuLyo6IEhUTUxFbGVtZW50Ki9cbiwgY2xhc3NOYW1lXG4vKjogc3RyaW5nKi9cbikge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzpefFxcXFxzKVwiLmNvbmNhdChjbGFzc05hbWUsIFwiKD8hXFxcXFMpXCIpLCAnZycpLCAnJyk7XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYnJvd3NlclByZWZpeFRvS2V5ID0gYnJvd3NlclByZWZpeFRvS2V5O1xuZXhwb3J0cy5icm93c2VyUHJlZml4VG9TdHlsZSA9IGJyb3dzZXJQcmVmaXhUb1N0eWxlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy5nZXRQcmVmaXggPSBnZXRQcmVmaXg7XG52YXIgcHJlZml4ZXMgPSBbJ01veicsICdXZWJraXQnLCAnTycsICdtcyddO1xuXG5mdW5jdGlvbiBnZXRQcmVmaXgoKVxuLyo6IHN0cmluZyovXG57XG4gIHZhciBfd2luZG93JGRvY3VtZW50LCBfd2luZG93JGRvY3VtZW50JGRvY3U7XG5cbiAgdmFyIHByb3BcbiAgLyo6IHN0cmluZyovXG4gID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAndHJhbnNmb3JtJztcbiAgLy8gRW5zdXJlIHdlJ3JlIHJ1bm5pbmcgaW4gYW4gZW52aXJvbm1lbnQgd2hlcmUgdGhlcmUgaXMgYWN0dWFsbHkgYSBnbG9iYWxcbiAgLy8gYHdpbmRvd2Agb2JqXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnOyAvLyBJZiB3ZSdyZSBpbiBhIHBzZXVkby1icm93c2VyIHNlcnZlci1zaWRlIGVudmlyb25tZW50LCB0aGlzIGFjY2Vzc1xuICAvLyBwYXRoIG1heSBub3QgZXhpc3QsIHNvIGJhaWwgb3V0IGlmIGl0IGRvZXNuJ3QuXG5cbiAgdmFyIHN0eWxlID0gKF93aW5kb3ckZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQpID09PSBudWxsIHx8IF93aW5kb3ckZG9jdW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfd2luZG93JGRvY3VtZW50JGRvY3UgPSBfd2luZG93JGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgPT09IG51bGwgfHwgX3dpbmRvdyRkb2N1bWVudCRkb2N1ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfd2luZG93JGRvY3VtZW50JGRvY3Uuc3R5bGU7XG4gIGlmICghc3R5bGUpIHJldHVybiAnJztcbiAgaWYgKHByb3AgaW4gc3R5bGUpIHJldHVybiAnJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGJyb3dzZXJQcmVmaXhUb0tleShwcm9wLCBwcmVmaXhlc1tpXSkgaW4gc3R5bGUpIHJldHVybiBwcmVmaXhlc1tpXTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gYnJvd3NlclByZWZpeFRvS2V5KHByb3Bcbi8qOiBzdHJpbmcqL1xuLCBwcmVmaXhcbi8qOiBzdHJpbmcqL1xuKVxuLyo6IHN0cmluZyovXG57XG4gIHJldHVybiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgpLmNvbmNhdChrZWJhYlRvVGl0bGVDYXNlKHByb3ApKSA6IHByb3A7XG59XG5cbmZ1bmN0aW9uIGJyb3dzZXJQcmVmaXhUb1N0eWxlKHByb3Bcbi8qOiBzdHJpbmcqL1xuLCBwcmVmaXhcbi8qOiBzdHJpbmcqL1xuKVxuLyo6IHN0cmluZyovXG57XG4gIHJldHVybiBwcmVmaXggPyBcIi1cIi5jb25jYXQocHJlZml4LnRvTG93ZXJDYXNlKCksIFwiLVwiKS5jb25jYXQocHJvcCkgOiBwcm9wO1xufVxuXG5mdW5jdGlvbiBrZWJhYlRvVGl0bGVDYXNlKHN0clxuLyo6IHN0cmluZyovXG4pXG4vKjogc3RyaW5nKi9cbntcbiAgdmFyIG91dCA9ICcnO1xuICB2YXIgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc2hvdWxkQ2FwaXRhbGl6ZSkge1xuICAgICAgb3V0ICs9IHN0cltpXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgc2hvdWxkQ2FwaXRhbGl6ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc3RyW2ldID09PSAnLScpIHtcbiAgICAgIHNob3VsZENhcGl0YWxpemUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgKz0gc3RyW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59IC8vIERlZmF1bHQgZXhwb3J0IGlzIHRoZSBwcmVmaXggaXRzZWxmLCBsaWtlICdNb3onLCAnV2Via2l0JywgZXRjXG4vLyBOb3RlIHRoYXQgeW91IG1heSBoYXZlIHRvIHJlLXRlc3QgZm9yIGNlcnRhaW4gdGhpbmdzOyBmb3IgaW5zdGFuY2UsIENocm9tZSA1MFxuLy8gY2FuIGhhbmRsZSB1bnByZWZpeGVkIGB0cmFuc2Zvcm1gLCBidXQgbm90IHVucHJlZml4ZWQgYHVzZXItc2VsZWN0YFxuXG5cbnZhciBfZGVmYXVsdCA9IChnZXRQcmVmaXgoKVxuLyo6IHN0cmluZyovXG4pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxvZztcblxuLyplc2xpbnQgbm8tY29uc29sZTowKi9cbmZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIGlmICh1bmRlZmluZWQpIChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FuRHJhZ1ggPSBjYW5EcmFnWDtcbmV4cG9ydHMuY2FuRHJhZ1kgPSBjYW5EcmFnWTtcbmV4cG9ydHMuY3JlYXRlQ29yZURhdGEgPSBjcmVhdGVDb3JlRGF0YTtcbmV4cG9ydHMuY3JlYXRlRHJhZ2dhYmxlRGF0YSA9IGNyZWF0ZURyYWdnYWJsZURhdGE7XG5leHBvcnRzLmdldEJvdW5kUG9zaXRpb24gPSBnZXRCb3VuZFBvc2l0aW9uO1xuZXhwb3J0cy5nZXRDb250cm9sUG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb247XG5leHBvcnRzLnNuYXBUb0dyaWQgPSBzbmFwVG9HcmlkO1xuXG52YXIgX3NoaW1zID0gcmVxdWlyZShcIi4vc2hpbXNcIik7XG5cbnZhciBfZG9tRm5zID0gcmVxdWlyZShcIi4vZG9tRm5zXCIpO1xuXG5mdW5jdGlvbiBnZXRCb3VuZFBvc2l0aW9uKGRyYWdnYWJsZVxuLyo6IERyYWdnYWJsZSovXG4sIHhcbi8qOiBudW1iZXIqL1xuLCB5XG4vKjogbnVtYmVyKi9cbilcbi8qOiBbbnVtYmVyLCBudW1iZXJdKi9cbntcbiAgLy8gSWYgbm8gYm91bmRzLCBzaG9ydC1jaXJjdWl0IGFuZCBtb3ZlIG9uXG4gIGlmICghZHJhZ2dhYmxlLnByb3BzLmJvdW5kcykgcmV0dXJuIFt4LCB5XTsgLy8gQ2xvbmUgbmV3IGJvdW5kc1xuXG4gIHZhciBib3VuZHMgPSBkcmFnZ2FibGUucHJvcHMuYm91bmRzO1xuICBib3VuZHMgPSB0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJyA/IGJvdW5kcyA6IGNsb25lQm91bmRzKGJvdW5kcyk7XG4gIHZhciBub2RlID0gZmluZERPTU5vZGUoZHJhZ2dhYmxlKTtcblxuICBpZiAodHlwZW9mIGJvdW5kcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgb3duZXJXaW5kb3cgPSBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIHZhciBib3VuZE5vZGU7XG5cbiAgICBpZiAoYm91bmRzID09PSAncGFyZW50Jykge1xuICAgICAgYm91bmROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZE5vZGUgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm91bmRzKTtcbiAgICB9XG5cbiAgICBpZiAoIShib3VuZE5vZGUgaW5zdGFuY2VvZiBvd25lcldpbmRvdy5IVE1MRWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmRzIHNlbGVjdG9yIFwiJyArIGJvdW5kcyArICdcIiBjb3VsZCBub3QgZmluZCBhbiBlbGVtZW50LicpO1xuICAgIH1cblxuICAgIHZhciBib3VuZE5vZGVFbFxuICAgIC8qOiBIVE1MRWxlbWVudCovXG4gICAgPSBib3VuZE5vZGU7IC8vIGZvciBGbG93LCBjYW4ndCBzZWVtIHRvIHJlZmluZSBjb3JyZWN0bHlcblxuICAgIHZhciBub2RlU3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHZhciBib3VuZE5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYm91bmROb2RlRWwpOyAvLyBDb21wdXRlIGJvdW5kcy4gVGhpcyBpcyBhIHBhaW4gd2l0aCBwYWRkaW5nIGFuZCBvZmZzZXRzIGJ1dCB0aGlzIGdldHMgaXQgZXhhY3RseSByaWdodC5cblxuICAgIGJvdW5kcyA9IHtcbiAgICAgIGxlZnQ6IC1ub2RlLm9mZnNldExlZnQgKyAoMCwgX3NoaW1zLmludCkoYm91bmROb2RlU3R5bGUucGFkZGluZ0xlZnQpICsgKDAsIF9zaGltcy5pbnQpKG5vZGVTdHlsZS5tYXJnaW5MZWZ0KSxcbiAgICAgIHRvcDogLW5vZGUub2Zmc2V0VG9wICsgKDAsIF9zaGltcy5pbnQpKGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdUb3ApICsgKDAsIF9zaGltcy5pbnQpKG5vZGVTdHlsZS5tYXJnaW5Ub3ApLFxuICAgICAgcmlnaHQ6ICgwLCBfZG9tRm5zLmlubmVyV2lkdGgpKGJvdW5kTm9kZUVsKSAtICgwLCBfZG9tRm5zLm91dGVyV2lkdGgpKG5vZGUpIC0gbm9kZS5vZmZzZXRMZWZ0ICsgKDAsIF9zaGltcy5pbnQpKGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdSaWdodCkgLSAoMCwgX3NoaW1zLmludCkobm9kZVN0eWxlLm1hcmdpblJpZ2h0KSxcbiAgICAgIGJvdHRvbTogKDAsIF9kb21GbnMuaW5uZXJIZWlnaHQpKGJvdW5kTm9kZUVsKSAtICgwLCBfZG9tRm5zLm91dGVySGVpZ2h0KShub2RlKSAtIG5vZGUub2Zmc2V0VG9wICsgKDAsIF9zaGltcy5pbnQpKGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdCb3R0b20pIC0gKDAsIF9zaGltcy5pbnQpKG5vZGVTdHlsZS5tYXJnaW5Cb3R0b20pXG4gICAgfTtcbiAgfSAvLyBLZWVwIHggYW5kIHkgYmVsb3cgcmlnaHQgYW5kIGJvdHRvbSBsaW1pdHMuLi5cblxuXG4gIGlmICgoMCwgX3NoaW1zLmlzTnVtKShib3VuZHMucmlnaHQpKSB4ID0gTWF0aC5taW4oeCwgYm91bmRzLnJpZ2h0KTtcbiAgaWYgKCgwLCBfc2hpbXMuaXNOdW0pKGJvdW5kcy5ib3R0b20pKSB5ID0gTWF0aC5taW4oeSwgYm91bmRzLmJvdHRvbSk7IC8vIEJ1dCBhYm92ZSBsZWZ0IGFuZCB0b3AgbGltaXRzLlxuXG4gIGlmICgoMCwgX3NoaW1zLmlzTnVtKShib3VuZHMubGVmdCkpIHggPSBNYXRoLm1heCh4LCBib3VuZHMubGVmdCk7XG4gIGlmICgoMCwgX3NoaW1zLmlzTnVtKShib3VuZHMudG9wKSkgeSA9IE1hdGgubWF4KHksIGJvdW5kcy50b3ApO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5mdW5jdGlvbiBzbmFwVG9HcmlkKGdyaWRcbi8qOiBbbnVtYmVyLCBudW1iZXJdKi9cbiwgcGVuZGluZ1hcbi8qOiBudW1iZXIqL1xuLCBwZW5kaW5nWVxuLyo6IG51bWJlciovXG4pXG4vKjogW251bWJlciwgbnVtYmVyXSovXG57XG4gIHZhciB4ID0gTWF0aC5yb3VuZChwZW5kaW5nWCAvIGdyaWRbMF0pICogZ3JpZFswXTtcbiAgdmFyIHkgPSBNYXRoLnJvdW5kKHBlbmRpbmdZIC8gZ3JpZFsxXSkgKiBncmlkWzFdO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWChkcmFnZ2FibGVcbi8qOiBEcmFnZ2FibGUqL1xuKVxuLyo6IGJvb2xlYW4qL1xue1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3gnO1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGVcbi8qOiBEcmFnZ2FibGUqL1xuKVxuLyo6IGJvb2xlYW4qL1xue1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3knO1xufSAvLyBHZXQge3gsIHl9IHBvc2l0aW9ucyBmcm9tIGV2ZW50LlxuXG5cbmZ1bmN0aW9uIGdldENvbnRyb2xQb3NpdGlvbihlXG4vKjogTW91c2VUb3VjaEV2ZW50Ki9cbiwgdG91Y2hJZGVudGlmaWVyXG4vKjogP251bWJlciovXG4sIGRyYWdnYWJsZUNvcmVcbi8qOiBEcmFnZ2FibGVDb3JlKi9cbilcbi8qOiA/Q29udHJvbFBvc2l0aW9uKi9cbntcbiAgdmFyIHRvdWNoT2JqID0gdHlwZW9mIHRvdWNoSWRlbnRpZmllciA9PT0gJ251bWJlcicgPyAoMCwgX2RvbUZucy5nZXRUb3VjaCkoZSwgdG91Y2hJZGVudGlmaWVyKSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdG91Y2hJZGVudGlmaWVyID09PSAnbnVtYmVyJyAmJiAhdG91Y2hPYmopIHJldHVybiBudWxsOyAvLyBub3QgdGhlIHJpZ2h0IHRvdWNoXG5cbiAgdmFyIG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGVDb3JlKTsgLy8gVXNlciBjYW4gcHJvdmlkZSBhbiBvZmZzZXRQYXJlbnQgaWYgZGVzaXJlZC5cblxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZHJhZ2dhYmxlQ29yZS5wcm9wcy5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vd25lckRvY3VtZW50LmJvZHk7XG4gIHJldHVybiAoMCwgX2RvbUZucy5vZmZzZXRYWUZyb21QYXJlbnQpKHRvdWNoT2JqIHx8IGUsIG9mZnNldFBhcmVudCwgZHJhZ2dhYmxlQ29yZS5wcm9wcy5zY2FsZSk7XG59IC8vIENyZWF0ZSBhbiBkYXRhIG9iamVjdCBleHBvc2VkIGJ5IDxEcmFnZ2FibGVDb3JlPidzIGV2ZW50c1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUNvcmVEYXRhKGRyYWdnYWJsZVxuLyo6IERyYWdnYWJsZUNvcmUqL1xuLCB4XG4vKjogbnVtYmVyKi9cbiwgeVxuLyo6IG51bWJlciovXG4pXG4vKjogRHJhZ2dhYmxlRGF0YSovXG57XG4gIHZhciBzdGF0ZSA9IGRyYWdnYWJsZS5zdGF0ZTtcbiAgdmFyIGlzU3RhcnQgPSAhKDAsIF9zaGltcy5pc051bSkoc3RhdGUubGFzdFgpO1xuICB2YXIgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG5cbiAgaWYgKGlzU3RhcnQpIHtcbiAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBtb3ZlLCB1c2UgdGhlIHggYW5kIHkgYXMgbGFzdCBjb29yZHMuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IG5vZGUsXG4gICAgICBkZWx0YVg6IDAsXG4gICAgICBkZWx0YVk6IDAsXG4gICAgICBsYXN0WDogeCxcbiAgICAgIGxhc3RZOiB5LFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSBjYWxjdWxhdGUgcHJvcGVyIHZhbHVlcy5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZTogbm9kZSxcbiAgICAgIGRlbHRhWDogeCAtIHN0YXRlLmxhc3RYLFxuICAgICAgZGVsdGFZOiB5IC0gc3RhdGUubGFzdFksXG4gICAgICBsYXN0WDogc3RhdGUubGFzdFgsXG4gICAgICBsYXN0WTogc3RhdGUubGFzdFksXG4gICAgICB4OiB4LFxuICAgICAgeTogeVxuICAgIH07XG4gIH1cbn0gLy8gQ3JlYXRlIGFuIGRhdGEgZXhwb3NlZCBieSA8RHJhZ2dhYmxlPidzIGV2ZW50c1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZURyYWdnYWJsZURhdGEoZHJhZ2dhYmxlXG4vKjogRHJhZ2dhYmxlKi9cbiwgY29yZURhdGFcbi8qOiBEcmFnZ2FibGVEYXRhKi9cbilcbi8qOiBEcmFnZ2FibGVEYXRhKi9cbntcbiAgdmFyIHNjYWxlID0gZHJhZ2dhYmxlLnByb3BzLnNjYWxlO1xuICByZXR1cm4ge1xuICAgIG5vZGU6IGNvcmVEYXRhLm5vZGUsXG4gICAgeDogZHJhZ2dhYmxlLnN0YXRlLnggKyBjb3JlRGF0YS5kZWx0YVggLyBzY2FsZSxcbiAgICB5OiBkcmFnZ2FibGUuc3RhdGUueSArIGNvcmVEYXRhLmRlbHRhWSAvIHNjYWxlLFxuICAgIGRlbHRhWDogY29yZURhdGEuZGVsdGFYIC8gc2NhbGUsXG4gICAgZGVsdGFZOiBjb3JlRGF0YS5kZWx0YVkgLyBzY2FsZSxcbiAgICBsYXN0WDogZHJhZ2dhYmxlLnN0YXRlLngsXG4gICAgbGFzdFk6IGRyYWdnYWJsZS5zdGF0ZS55XG4gIH07XG59IC8vIEEgbG90IGZhc3RlciB0aGFuIHN0cmluZ2lmeS9wYXJzZVxuXG5cbmZ1bmN0aW9uIGNsb25lQm91bmRzKGJvdW5kc1xuLyo6IEJvdW5kcyovXG4pXG4vKjogQm91bmRzKi9cbntcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBib3VuZHMubGVmdCxcbiAgICB0b3A6IGJvdW5kcy50b3AsXG4gICAgcmlnaHQ6IGJvdW5kcy5yaWdodCxcbiAgICBib3R0b206IGJvdW5kcy5ib3R0b21cbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZERPTU5vZGUoZHJhZ2dhYmxlXG4vKjogRHJhZ2dhYmxlIHwgRHJhZ2dhYmxlQ29yZSovXG4pXG4vKjogSFRNTEVsZW1lbnQqL1xue1xuICB2YXIgbm9kZSA9IGRyYWdnYWJsZS5maW5kRE9NTm9kZSgpO1xuXG4gIGlmICghbm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+OiBVbm1vdW50ZWQgZHVyaW5nIGV2ZW50IScpO1xuICB9IC8vICRGbG93SWdub3JlIHdlIGNhbid0IGFzc2VydCBvbiBIVE1MRWxlbWVudCBkdWUgdG8gdGVzdHMuLi4gRklYTUVcblxuXG4gIHJldHVybiBub2RlO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kb250U2V0TWUgPSBkb250U2V0TWU7XG5leHBvcnRzLmZpbmRJbkFycmF5ID0gZmluZEluQXJyYXk7XG5leHBvcnRzLmludCA9IGludDtcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5leHBvcnRzLmlzTnVtID0gaXNOdW07XG5cbi8vIEBjcmVkaXRzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JvZ296aG5pa29mZi9hNDNjZmVkMjdjNDFlNGU2OGNkY1xuZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXlcbi8qOiBBcnJheTxhbnk+IHwgVG91Y2hMaXN0Ki9cbiwgY2FsbGJhY2tcbi8qOiBGdW5jdGlvbiovXG4pXG4vKjogYW55Ki9cbntcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBbYXJyYXlbaV0sIGksIGFycmF5XSkpIHJldHVybiBhcnJheVtpXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmNcbi8qOiBhbnkqL1xuKVxuLyo6IGJvb2xlYW4gJWNoZWNrcyovXG57XG4gIC8vICRGbG93SWdub3JlW21ldGhvZC11bmJpbmRpbmddXG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmZ1bmN0aW9uIGlzTnVtKG51bVxuLyo6IGFueSovXG4pXG4vKjogYm9vbGVhbiAlY2hlY2tzKi9cbntcbiAgcmV0dXJuIHR5cGVvZiBudW0gPT09ICdudW1iZXInICYmICFpc05hTihudW0pO1xufVxuXG5mdW5jdGlvbiBpbnQoYVxuLyo6IHN0cmluZyovXG4pXG4vKjogbnVtYmVyKi9cbntcbiAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbn1cblxuZnVuY3Rpb24gZG9udFNldE1lKHByb3BzXG4vKjogT2JqZWN0Ki9cbiwgcHJvcE5hbWVcbi8qOiBzdHJpbmcqL1xuLCBjb21wb25lbnROYW1lXG4vKjogc3RyaW5nKi9cbilcbi8qOiA/RXJyb3IqL1xue1xuICBpZiAocHJvcHNbcHJvcE5hbWVdKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgcHJvcCBcIi5jb25jYXQocHJvcE5hbWUsIFwiIHBhc3NlZCB0byBcIikuY29uY2F0KGNvbXBvbmVudE5hbWUsIFwiIC0gZG8gbm90IHNldCB0aGlzLCBzZXQgaXQgb24gdGhlIGNoaWxkLlwiKSk7XG4gIH1cbn0iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEzLjFcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cblxudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7IC8vIFVzaW5nIGNvbnNvbGVbJ3dhcm4nXSB0byBldmFkZSBCYWJlbCBhbmQgRVNMaW50XG5cbiAgICAgIGNvbnNvbGVbJ3dhcm4nXSgnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEcmFnZ2FibGVSb290IGZyb20gJ3JlYWN0LWRyYWdnYWJsZSc7XG5pbXBvcnQgeyBSZXNpemFibGUgfSBmcm9tICdyZS1yZXNpemFibGUnO1xuXG4vKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XG5cbnZhciBEcmFnZ2FibGUgPSBEcmFnZ2FibGVSb290O1xyXG52YXIgcmVzaXphYmxlU3R5bGUgPSB7XHJcbiAgICB3aWR0aDogXCJhdXRvXCIsXHJcbiAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwLFxyXG59O1xyXG52YXIgZ2V0RW5hYmxlUmVzaXppbmdCeUZsYWcgPSBmdW5jdGlvbiAoZmxhZykgeyByZXR1cm4gKHtcclxuICAgIGJvdHRvbTogZmxhZyxcclxuICAgIGJvdHRvbUxlZnQ6IGZsYWcsXHJcbiAgICBib3R0b21SaWdodDogZmxhZyxcclxuICAgIGxlZnQ6IGZsYWcsXHJcbiAgICByaWdodDogZmxhZyxcclxuICAgIHRvcDogZmxhZyxcclxuICAgIHRvcExlZnQ6IGZsYWcsXHJcbiAgICB0b3BSaWdodDogZmxhZyxcclxufSk7IH07XHJcbnZhciBSbmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUm5kLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUm5kKHByb3BzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMucmVzaXppbmdQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICAgIF90aGlzLm9mZnNldEZyb21QYXJlbnQgPSB7IGxlZnQ6IDAsIHRvcDogMCB9O1xyXG4gICAgICAgIF90aGlzLnJlc2l6YWJsZUVsZW1lbnQgPSB7IGN1cnJlbnQ6IG51bGwgfTtcclxuICAgICAgICBfdGhpcy5vcmlnaW5hbFBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgX3RoaXMucmVmRHJhZ2dhYmxlID0gZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAgaWYgKCFjKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfdGhpcy5kcmFnZ2FibGUgPSBjO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMucmVmUmVzaXphYmxlID0gZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAgaWYgKCFjKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBfdGhpcy5yZXNpemFibGUgPSBjO1xyXG4gICAgICAgICAgICBfdGhpcy5yZXNpemFibGVFbGVtZW50LmN1cnJlbnQgPSBjLnJlc2l6YWJsZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICByZXNpemluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGJvdW5kczoge1xyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogcHJvcHMubWF4V2lkdGgsXHJcbiAgICAgICAgICAgIG1heEhlaWdodDogcHJvcHMubWF4SGVpZ2h0LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMub25SZXNpemVTdGFydCA9IF90aGlzLm9uUmVzaXplU3RhcnQuYmluZChfdGhpcyk7XHJcbiAgICAgICAgX3RoaXMub25SZXNpemUgPSBfdGhpcy5vblJlc2l6ZS5iaW5kKF90aGlzKTtcclxuICAgICAgICBfdGhpcy5vblJlc2l6ZVN0b3AgPSBfdGhpcy5vblJlc2l6ZVN0b3AuYmluZChfdGhpcyk7XHJcbiAgICAgICAgX3RoaXMub25EcmFnU3RhcnQgPSBfdGhpcy5vbkRyYWdTdGFydC5iaW5kKF90aGlzKTtcclxuICAgICAgICBfdGhpcy5vbkRyYWcgPSBfdGhpcy5vbkRyYWcuYmluZChfdGhpcyk7XHJcbiAgICAgICAgX3RoaXMub25EcmFnU3RvcCA9IF90aGlzLm9uRHJhZ1N0b3AuYmluZChfdGhpcyk7XHJcbiAgICAgICAgX3RoaXMuZ2V0TWF4U2l6ZXNGcm9tUHJvcHMgPSBfdGhpcy5nZXRNYXhTaXplc0Zyb21Qcm9wcy5iaW5kKF90aGlzKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBSbmQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlT2Zmc2V0RnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMub2Zmc2V0RnJvbVBhcmVudCwgbGVmdCA9IF9hLmxlZnQsIHRvcCA9IF9hLnRvcDtcclxuICAgICAgICB2YXIgX2IgPSB0aGlzLmdldERyYWdnYWJsZVBvc2l0aW9uKCksIHggPSBfYi54LCB5ID0gX2IueTtcclxuICAgICAgICB0aGlzLmRyYWdnYWJsZS5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHg6IHggLSBsZWZ0LFxyXG4gICAgICAgICAgICB5OiB5IC0gdG9wLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEhBQ0s6IEFwcGx5IHBvc2l0aW9uIGFkanVzdG1lbnRcclxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgLy8gSEFDSzogVG8gZ2V0IGByZWFjdC1kcmFnZ2FibGVgIHN0YXRlIHggYW5kIHkuXHJcbiAgICBSbmQucHJvdG90eXBlLmdldERyYWdnYWJsZVBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMuZHJhZ2dhYmxlLnN0YXRlLCB4ID0gX2EueCwgeSA9IF9hLnk7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUuZ2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc2l6YWJsZSAmJiB0aGlzLnJlc2l6YWJsZS5wYXJlbnROb2RlO1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUuZ2V0UGFyZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNpemFibGUuZ2V0UGFyZW50U2l6ZSgpO1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUuZ2V0TWF4U2l6ZXNGcm9tUHJvcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG1heFdpZHRoID0gdHlwZW9mIHRoaXMucHJvcHMubWF4V2lkdGggPT09IFwidW5kZWZpbmVkXCIgPyBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiA6IHRoaXMucHJvcHMubWF4V2lkdGg7XHJcbiAgICAgICAgdmFyIG1heEhlaWdodCA9IHR5cGVvZiB0aGlzLnByb3BzLm1heEhlaWdodCA9PT0gXCJ1bmRlZmluZWRcIiA/IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIDogdGhpcy5wcm9wcy5tYXhIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHsgbWF4V2lkdGg6IG1heFdpZHRoLCBtYXhIZWlnaHQ6IG1heEhlaWdodCB9O1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUuZ2V0U2VsZkVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzaXphYmxlICYmIHRoaXMucmVzaXphYmxlLnJlc2l6YWJsZTtcclxuICAgIH07XHJcbiAgICBSbmQucHJvdG90eXBlLmdldE9mZnNldEhlaWdodCA9IGZ1bmN0aW9uIChib3VuZGFyeSkge1xyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMucHJvcHMuc2NhbGU7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BzLmJvdW5kcykge1xyXG4gICAgICAgICAgICBjYXNlIFwid2luZG93XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IC8gc2NhbGU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJib2R5XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLyBzY2FsZTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBib3VuZGFyeS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUuZ2V0T2Zmc2V0V2lkdGggPSBmdW5jdGlvbiAoYm91bmRhcnkpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLnByb3BzLnNjYWxlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5ib3VuZHMpIHtcclxuICAgICAgICAgICAgY2FzZSBcIndpbmRvd1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIGNhc2UgXCJib2R5XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIHNjYWxlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvdW5kYXJ5Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSbmQucHJvdG90eXBlLm9uRHJhZ1N0YXJ0ID0gZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkRyYWdTdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRHJhZ1N0YXJ0KGUsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXREcmFnZ2FibGVQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxQb3NpdGlvbiA9IHBvcztcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuYm91bmRzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5wcm9wcy5zY2FsZTtcclxuICAgICAgICB2YXIgYm91bmRhcnk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYm91bmRzID09PSBcInBhcmVudFwiKSB7XHJcbiAgICAgICAgICAgIGJvdW5kYXJ5ID0gcGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLmJvdW5kcyA9PT0gXCJib2R5XCIpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudFJlY3RfMSA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudExlZnRfMSA9IHBhcmVudFJlY3RfMS5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50VG9wXzEgPSBwYXJlbnRSZWN0XzEudG9wO1xyXG4gICAgICAgICAgICB2YXIgYm9keVJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgbGVmdF8xID0gLShwYXJlbnRMZWZ0XzEgLSBwYXJlbnQub2Zmc2V0TGVmdCAqIHNjYWxlIC0gYm9keVJlY3QubGVmdCkgLyBzY2FsZTtcclxuICAgICAgICAgICAgdmFyIHRvcF8xID0gLShwYXJlbnRUb3BfMSAtIHBhcmVudC5vZmZzZXRUb3AgKiBzY2FsZSAtIGJvZHlSZWN0LnRvcCkgLyBzY2FsZTtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSB0aGlzLnJlc2l6YWJsZS5zaXplLndpZHRoICogc2NhbGUpIC8gc2NhbGUgKyBsZWZ0XzE7XHJcbiAgICAgICAgICAgIHZhciBib3R0b20gPSAoZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSB0aGlzLnJlc2l6YWJsZS5zaXplLmhlaWdodCAqIHNjYWxlKSAvIHNjYWxlICsgdG9wXzE7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgYm91bmRzOiB7IHRvcDogdG9wXzEsIHJpZ2h0OiByaWdodCwgYm90dG9tOiBib3R0b20sIGxlZnQ6IGxlZnRfMSB9IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb3BzLmJvdW5kcyA9PT0gXCJ3aW5kb3dcIikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzaXphYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50UmVjdF8yID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50TGVmdF8yID0gcGFyZW50UmVjdF8yLmxlZnQ7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRUb3BfMiA9IHBhcmVudFJlY3RfMi50b3A7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0XzIgPSAtKHBhcmVudExlZnRfMiAtIHBhcmVudC5vZmZzZXRMZWZ0ICogc2NhbGUpIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHZhciB0b3BfMiA9IC0ocGFyZW50VG9wXzIgLSBwYXJlbnQub2Zmc2V0VG9wICogc2NhbGUpIC8gc2NhbGU7XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMucmVzaXphYmxlLnNpemUud2lkdGggKiBzY2FsZSkgLyBzY2FsZSArIGxlZnRfMjtcclxuICAgICAgICAgICAgdmFyIGJvdHRvbSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnJlc2l6YWJsZS5zaXplLmhlaWdodCAqIHNjYWxlKSAvIHNjYWxlICsgdG9wXzI7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgYm91bmRzOiB7IHRvcDogdG9wXzIsIHJpZ2h0OiByaWdodCwgYm90dG9tOiBib3R0b20sIGxlZnQ6IGxlZnRfMiB9IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5ib3VuZHMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgYm91bmRhcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJvcHMuYm91bmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5ib3VuZHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBib3VuZGFyeSA9IHRoaXMucHJvcHMuYm91bmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIShib3VuZGFyeSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCAhKHBhcmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBib3VuZGFyeVJlY3QgPSBib3VuZGFyeS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgYm91bmRhcnlMZWZ0ID0gYm91bmRhcnlSZWN0LmxlZnQ7XHJcbiAgICAgICAgdmFyIGJvdW5kYXJ5VG9wID0gYm91bmRhcnlSZWN0LnRvcDtcclxuICAgICAgICB2YXIgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgcGFyZW50TGVmdCA9IHBhcmVudFJlY3QubGVmdDtcclxuICAgICAgICB2YXIgcGFyZW50VG9wID0gcGFyZW50UmVjdC50b3A7XHJcbiAgICAgICAgdmFyIGxlZnQgPSAoYm91bmRhcnlMZWZ0IC0gcGFyZW50TGVmdCkgLyBzY2FsZTtcclxuICAgICAgICB2YXIgdG9wID0gYm91bmRhcnlUb3AgLSBwYXJlbnRUb3A7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlT2Zmc2V0RnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldEZyb21QYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGJvdW5kczoge1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0b3AgLSBvZmZzZXQudG9wLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IGxlZnQgKyAoYm91bmRhcnkub2Zmc2V0V2lkdGggLSB0aGlzLnJlc2l6YWJsZS5zaXplLndpZHRoKSAtIG9mZnNldC5sZWZ0IC8gc2NhbGUsXHJcbiAgICAgICAgICAgICAgICBib3R0b206IHRvcCArIChib3VuZGFyeS5vZmZzZXRIZWlnaHQgLSB0aGlzLnJlc2l6YWJsZS5zaXplLmhlaWdodCkgLSBvZmZzZXQudG9wLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdCAtIG9mZnNldC5sZWZ0IC8gc2NhbGUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUm5kLnByb3RvdHlwZS5vbkRyYWcgPSBmdW5jdGlvbiAoZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5vbkRyYWcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLm9mZnNldEZyb21QYXJlbnQsIGxlZnQgPSBfYS5sZWZ0LCB0b3AgPSBfYS50b3A7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRyYWdBeGlzIHx8IHRoaXMucHJvcHMuZHJhZ0F4aXMgPT09IFwiYm90aFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uRHJhZyhlLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgeDogZGF0YS54IC0gbGVmdCwgeTogZGF0YS55IC0gdG9wIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5kcmFnQXhpcyA9PT0gXCJ4XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25EcmFnKGUsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyB4OiBkYXRhLnggKyBsZWZ0LCB5OiB0aGlzLm9yaWdpbmFsUG9zaXRpb24ueSArIHRvcCwgZGVsdGFZOiAwIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5kcmFnQXhpcyA9PT0gXCJ5XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25EcmFnKGUsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyB4OiB0aGlzLm9yaWdpbmFsUG9zaXRpb24ueCArIGxlZnQsIHk6IGRhdGEueSArIHRvcCwgZGVsdGFYOiAwIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUm5kLnByb3RvdHlwZS5vbkRyYWdTdG9wID0gZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMub25EcmFnU3RvcClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMub2Zmc2V0RnJvbVBhcmVudCwgbGVmdCA9IF9hLmxlZnQsIHRvcCA9IF9hLnRvcDtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZHJhZ0F4aXMgfHwgdGhpcy5wcm9wcy5kcmFnQXhpcyA9PT0gXCJib3RoXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25EcmFnU3RvcChlLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgeDogZGF0YS54ICsgbGVmdCwgeTogZGF0YS55ICsgdG9wIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5kcmFnQXhpcyA9PT0gXCJ4XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25EcmFnU3RvcChlLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgeDogZGF0YS54ICsgbGVmdCwgeTogdGhpcy5vcmlnaW5hbFBvc2l0aW9uLnkgKyB0b3AsIGRlbHRhWTogMCB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuZHJhZ0F4aXMgPT09IFwieVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uRHJhZ1N0b3AoZSwgX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IHg6IHRoaXMub3JpZ2luYWxQb3NpdGlvbi54ICsgbGVmdCwgeTogZGF0YS55ICsgdG9wLCBkZWx0YVg6IDAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBSbmQucHJvdG90eXBlLm9uUmVzaXplU3RhcnQgPSBmdW5jdGlvbiAoZSwgZGlyLCBlbGVtZW50UmVmKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcmVzaXppbmc6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5wcm9wcy5zY2FsZTtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXRGcm9tUGFyZW50O1xyXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmdldERyYWdnYWJsZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemluZ1Bvc2l0aW9uID0geyB4OiBwb3MueCArIG9mZnNldC5sZWZ0LCB5OiBwb3MueSArIG9mZnNldC50b3AgfTtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsUG9zaXRpb24gPSBwb3M7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYm91bmRzKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IHRoaXMuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYm91bmRzID09PSBcInBhcmVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IHBhcmVudF8xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuYm91bmRzID09PSBcImJvZHlcIikge1xyXG4gICAgICAgICAgICAgICAgYm91bmRhcnkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuYm91bmRzID09PSBcIndpbmRvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IHdpbmRvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5ib3VuZHMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnByb3BzLmJvdW5kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5ib3VuZHMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgYm91bmRhcnkgPSB0aGlzLnByb3BzLmJvdW5kcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2VsZl8xID0gdGhpcy5nZXRTZWxmRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZl8xIGluc3RhbmNlb2YgRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGJvdW5kYXJ5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgYm91bmRhcnkgPT09IHdpbmRvdykgJiZcclxuICAgICAgICAgICAgICAgIHBhcmVudF8xIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuZ2V0TWF4U2l6ZXNGcm9tUHJvcHMoKSwgbWF4V2lkdGggPSBfYS5tYXhXaWR0aCwgbWF4SGVpZ2h0ID0gX2EubWF4SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSB0aGlzLmdldFBhcmVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXhXaWR0aCAmJiB0eXBlb2YgbWF4V2lkdGggPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4V2lkdGguZW5kc1dpdGgoXCIlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IE51bWJlcihtYXhXaWR0aC5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoID0gcGFyZW50U2l6ZS53aWR0aCAqIHJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXhXaWR0aC5lbmRzV2l0aChcInB4XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoID0gTnVtYmVyKG1heFdpZHRoLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heEhlaWdodCAmJiB0eXBlb2YgbWF4SGVpZ2h0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heEhlaWdodC5lbmRzV2l0aChcIiVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGlvID0gTnVtYmVyKG1heEhlaWdodC5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IHBhcmVudFNpemUud2lkdGggKiByYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWF4SGVpZ2h0LmVuZHNXaXRoKFwicHhcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gTnVtYmVyKG1heEhlaWdodC5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBzZWxmUmVjdCA9IHNlbGZfMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmTGVmdCA9IHNlbGZSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZlRvcCA9IHNlbGZSZWN0LnRvcDtcclxuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeVJlY3QgPSB0aGlzLnByb3BzLmJvdW5kcyA9PT0gXCJ3aW5kb3dcIiA/IHsgbGVmdDogMCwgdG9wOiAwIH0gOiBib3VuZGFyeS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeUxlZnQgPSBib3VuZGFyeVJlY3QubGVmdDtcclxuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeVRvcCA9IGJvdW5kYXJ5UmVjdC50b3A7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0V2lkdGggPSB0aGlzLmdldE9mZnNldFdpZHRoKGJvdW5kYXJ5KTtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRIZWlnaHQgPSB0aGlzLmdldE9mZnNldEhlaWdodChib3VuZGFyeSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzTGVmdCA9IGRpci50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBoYXNSaWdodCA9IGRpci50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwicmlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzVG9wID0gZGlyLnN0YXJ0c1dpdGgoXCJ0b3BcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzQm90dG9tID0gZGlyLnN0YXJ0c1dpdGgoXCJib3R0b21cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGhhc0xlZnQgfHwgaGFzVG9wKSAmJiB0aGlzLnJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXggPSAoc2VsZkxlZnQgLSBib3VuZGFyeUxlZnQpIC8gc2NhbGUgKyB0aGlzLnJlc2l6YWJsZS5zaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtYXhXaWR0aDogbWF4ID4gTnVtYmVyKG1heFdpZHRoKSA/IG1heFdpZHRoIDogbWF4IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSU5GTzogVG8gc2V0IGJvdW5kcyBpbiBgbG9jayBhc3BlY3QgcmF0aW8gd2l0aCBib3VuZHNgIGNhc2UuIFNlZSBhbHNvIHRoYXQgc3RvcnkuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzUmlnaHQgfHwgKHRoaXMucHJvcHMubG9ja0FzcGVjdFJhdGlvICYmICFoYXNMZWZ0ICYmICFoYXNUb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IG9mZnNldFdpZHRoICsgKGJvdW5kYXJ5TGVmdCAtIHNlbGZMZWZ0KSAvIHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtYXhXaWR0aDogbWF4ID4gTnVtYmVyKG1heFdpZHRoKSA/IG1heFdpZHRoIDogbWF4IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChoYXNUb3AgfHwgaGFzTGVmdCkgJiYgdGhpcy5yZXNpemFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ID0gKHNlbGZUb3AgLSBib3VuZGFyeVRvcCkgLyBzY2FsZSArIHRoaXMucmVzaXphYmxlLnNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IG1heCA+IE51bWJlcihtYXhIZWlnaHQpID8gbWF4SGVpZ2h0IDogbWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSU5GTzogVG8gc2V0IGJvdW5kcyBpbiBgbG9jayBhc3BlY3QgcmF0aW8gd2l0aCBib3VuZHNgIGNhc2UuIFNlZSBhbHNvIHRoYXQgc3RvcnkuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzQm90dG9tIHx8ICh0aGlzLnByb3BzLmxvY2tBc3BlY3RSYXRpbyAmJiAhaGFzVG9wICYmICFoYXNMZWZ0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXggPSBvZmZzZXRIZWlnaHQgKyAoYm91bmRhcnlUb3AgLSBzZWxmVG9wKSAvIHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IG1heCA+IE51bWJlcihtYXhIZWlnaHQpID8gbWF4SGVpZ2h0IDogbWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiB0aGlzLnByb3BzLm1heFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLnByb3BzLm1heEhlaWdodCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUmVzaXplU3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlc2l6ZVN0YXJ0KGUsIGRpciwgZWxlbWVudFJlZik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUub25SZXNpemUgPSBmdW5jdGlvbiAoZSwgZGlyZWN0aW9uLCBlbGVtZW50UmVmLCBkZWx0YSkge1xyXG4gICAgICAgIC8vIElORk86IEFwcGx5IHggYW5kIHkgcG9zaXRpb24gYWRqdXN0bWVudHMgY2F1c2VkIGJ5IHJlc2l6aW5nIHRvIGRyYWdnYWJsZVxyXG4gICAgICAgIHZhciBuZXdQb3MgPSB7IHg6IHRoaXMub3JpZ2luYWxQb3NpdGlvbi54LCB5OiB0aGlzLm9yaWdpbmFsUG9zaXRpb24ueSB9O1xyXG4gICAgICAgIHZhciBsZWZ0ID0gLWRlbHRhLndpZHRoO1xyXG4gICAgICAgIHZhciB0b3AgPSAtZGVsdGEuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBkaXJlY3Rpb25zID0gW1widG9wXCIsIFwibGVmdFwiLCBcInRvcExlZnRcIiwgXCJib3R0b21MZWZ0XCIsIFwidG9wUmlnaHRcIl07XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5kZXhPZihkaXJlY3Rpb24pICE9PSAtMSkge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImJvdHRvbUxlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zLnggKz0gbGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidG9wUmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zLnkgKz0gdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zLnggKz0gbGVmdDtcclxuICAgICAgICAgICAgICAgIG5ld1Bvcy55ICs9IHRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3UG9zLnggIT09IHRoaXMuZHJhZ2dhYmxlLnN0YXRlLnggfHwgbmV3UG9zLnkgIT09IHRoaXMuZHJhZ2dhYmxlLnN0YXRlLnkpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGUuc2V0U3RhdGUobmV3UG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVPZmZzZXRGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0RnJvbVBhcmVudDtcclxuICAgICAgICB2YXIgeCA9IHRoaXMuZ2V0RHJhZ2dhYmxlUG9zaXRpb24oKS54ICsgb2Zmc2V0LmxlZnQ7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLmdldERyYWdnYWJsZVBvc2l0aW9uKCkueSArIG9mZnNldC50b3A7XHJcbiAgICAgICAgdGhpcy5yZXNpemluZ1Bvc2l0aW9uID0geyB4OiB4LCB5OiB5IH07XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLm9uUmVzaXplKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlc2l6ZShlLCBkaXJlY3Rpb24sIGVsZW1lbnRSZWYsIGRlbHRhLCB7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUm5kLnByb3RvdHlwZS5vblJlc2l6ZVN0b3AgPSBmdW5jdGlvbiAoZSwgZGlyZWN0aW9uLCBlbGVtZW50UmVmLCBkZWx0YSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICByZXNpemluZzogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRNYXhTaXplc0Zyb21Qcm9wcygpLCBtYXhXaWR0aCA9IF9hLm1heFdpZHRoLCBtYXhIZWlnaHQgPSBfYS5tYXhIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1heFdpZHRoOiBtYXhXaWR0aCwgbWF4SGVpZ2h0OiBtYXhIZWlnaHQgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25SZXNpemVTdG9wKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25SZXNpemVTdG9wKGUsIGRpcmVjdGlvbiwgZWxlbWVudFJlZiwgZGVsdGEsIHRoaXMucmVzaXppbmdQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUudXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6YWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVzaXphYmxlLnVwZGF0ZVNpemUoeyB3aWR0aDogc2l6ZS53aWR0aCwgaGVpZ2h0OiBzaXplLmhlaWdodCB9KTtcclxuICAgIH07XHJcbiAgICBSbmQucHJvdG90eXBlLnVwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUuc2V0U3RhdGUocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUudXBkYXRlT2Zmc2V0RnJvbVBhcmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLnByb3BzLnNjYWxlO1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5nZXRTZWxmRWxlbWVudCgpO1xyXG4gICAgICAgIGlmICghcGFyZW50IHx8IHNlbGYgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBwYXJlbnRMZWZ0ID0gcGFyZW50UmVjdC5sZWZ0O1xyXG4gICAgICAgIHZhciBwYXJlbnRUb3AgPSBwYXJlbnRSZWN0LnRvcDtcclxuICAgICAgICB2YXIgc2VsZlJlY3QgPSBzZWxmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0RHJhZ2dhYmxlUG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IHBhcmVudC5zY3JvbGxMZWZ0O1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSBwYXJlbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0RnJvbVBhcmVudCA9IHtcclxuICAgICAgICAgICAgbGVmdDogc2VsZlJlY3QubGVmdCAtIHBhcmVudExlZnQgKyBzY3JvbGxMZWZ0IC0gcG9zaXRpb24ueCAqIHNjYWxlLFxyXG4gICAgICAgICAgICB0b3A6IHNlbGZSZWN0LnRvcCAtIHBhcmVudFRvcCArIHNjcm9sbFRvcCAtIHBvc2l0aW9uLnkgKiBzY2FsZSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFJuZC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcHMsIGRpc2FibGVEcmFnZ2luZyA9IF9hLmRpc2FibGVEcmFnZ2luZywgc3R5bGUgPSBfYS5zdHlsZSwgZHJhZ0hhbmRsZUNsYXNzTmFtZSA9IF9hLmRyYWdIYW5kbGVDbGFzc05hbWUsIHBvc2l0aW9uID0gX2EucG9zaXRpb24sIG9uTW91c2VEb3duID0gX2Eub25Nb3VzZURvd24sIG9uTW91c2VVcCA9IF9hLm9uTW91c2VVcCwgZHJhZ0F4aXMgPSBfYS5kcmFnQXhpcywgZHJhZ0dyaWQgPSBfYS5kcmFnR3JpZCwgYm91bmRzID0gX2EuYm91bmRzLCBlbmFibGVVc2VyU2VsZWN0SGFjayA9IF9hLmVuYWJsZVVzZXJTZWxlY3RIYWNrLCBjYW5jZWwgPSBfYS5jYW5jZWwsIGNoaWxkcmVuID0gX2EuY2hpbGRyZW4sIG9uUmVzaXplU3RhcnQgPSBfYS5vblJlc2l6ZVN0YXJ0LCBvblJlc2l6ZSA9IF9hLm9uUmVzaXplLCBvblJlc2l6ZVN0b3AgPSBfYS5vblJlc2l6ZVN0b3AsIG9uRHJhZ1N0YXJ0ID0gX2Eub25EcmFnU3RhcnQsIG9uRHJhZyA9IF9hLm9uRHJhZywgb25EcmFnU3RvcCA9IF9hLm9uRHJhZ1N0b3AsIHJlc2l6ZUhhbmRsZVN0eWxlcyA9IF9hLnJlc2l6ZUhhbmRsZVN0eWxlcywgcmVzaXplSGFuZGxlQ2xhc3NlcyA9IF9hLnJlc2l6ZUhhbmRsZUNsYXNzZXMsIHJlc2l6ZUhhbmRsZUNvbXBvbmVudCA9IF9hLnJlc2l6ZUhhbmRsZUNvbXBvbmVudCwgZW5hYmxlUmVzaXppbmcgPSBfYS5lbmFibGVSZXNpemluZywgcmVzaXplR3JpZCA9IF9hLnJlc2l6ZUdyaWQsIHJlc2l6ZUhhbmRsZVdyYXBwZXJDbGFzcyA9IF9hLnJlc2l6ZUhhbmRsZVdyYXBwZXJDbGFzcywgcmVzaXplSGFuZGxlV3JhcHBlclN0eWxlID0gX2EucmVzaXplSGFuZGxlV3JhcHBlclN0eWxlLCBzY2FsZSA9IF9hLnNjYWxlLCBhbGxvd0FueUNsaWNrID0gX2EuYWxsb3dBbnlDbGljaywgcmVzaXphYmxlUHJvcHMgPSBfX3Jlc3QoX2EsIFtcImRpc2FibGVEcmFnZ2luZ1wiLCBcInN0eWxlXCIsIFwiZHJhZ0hhbmRsZUNsYXNzTmFtZVwiLCBcInBvc2l0aW9uXCIsIFwib25Nb3VzZURvd25cIiwgXCJvbk1vdXNlVXBcIiwgXCJkcmFnQXhpc1wiLCBcImRyYWdHcmlkXCIsIFwiYm91bmRzXCIsIFwiZW5hYmxlVXNlclNlbGVjdEhhY2tcIiwgXCJjYW5jZWxcIiwgXCJjaGlsZHJlblwiLCBcIm9uUmVzaXplU3RhcnRcIiwgXCJvblJlc2l6ZVwiLCBcIm9uUmVzaXplU3RvcFwiLCBcIm9uRHJhZ1N0YXJ0XCIsIFwib25EcmFnXCIsIFwib25EcmFnU3RvcFwiLCBcInJlc2l6ZUhhbmRsZVN0eWxlc1wiLCBcInJlc2l6ZUhhbmRsZUNsYXNzZXNcIiwgXCJyZXNpemVIYW5kbGVDb21wb25lbnRcIiwgXCJlbmFibGVSZXNpemluZ1wiLCBcInJlc2l6ZUdyaWRcIiwgXCJyZXNpemVIYW5kbGVXcmFwcGVyQ2xhc3NcIiwgXCJyZXNpemVIYW5kbGVXcmFwcGVyU3R5bGVcIiwgXCJzY2FsZVwiLCBcImFsbG93QW55Q2xpY2tcIl0pO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHQgPyBfX2Fzc2lnbih7fSwgdGhpcy5wcm9wcy5kZWZhdWx0KSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyBSZW1vdmUgdW5rbm93biBwcm9wcywgc2VlIGFsc28gaHR0cHM6Ly9yZWFjdGpzLm9yZy93YXJuaW5ncy91bmtub3duLXByb3AuaHRtbFxyXG4gICAgICAgIGRlbGV0ZSByZXNpemFibGVQcm9wcy5kZWZhdWx0O1xyXG4gICAgICAgIHZhciBjdXJzb3JTdHlsZSA9IGRpc2FibGVEcmFnZ2luZyB8fCBkcmFnSGFuZGxlQ2xhc3NOYW1lID8geyBjdXJzb3I6IFwiYXV0b1wiIH0gOiB7IGN1cnNvcjogXCJtb3ZlXCIgfTtcclxuICAgICAgICB2YXIgaW5uZXJTdHlsZSA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNpemFibGVTdHlsZSksIGN1cnNvclN0eWxlKSwgc3R5bGUpO1xyXG4gICAgICAgIHZhciBfYiA9IHRoaXMub2Zmc2V0RnJvbVBhcmVudCwgbGVmdCA9IF9iLmxlZnQsIHRvcCA9IF9iLnRvcDtcclxuICAgICAgICB2YXIgZHJhZ2dhYmxlUG9zaXRpb247XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGRyYWdnYWJsZVBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogcG9zaXRpb24ueCAtIGxlZnQsXHJcbiAgICAgICAgICAgICAgICB5OiBwb3NpdGlvbi55IC0gdG9wLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJTkZPOiBNYWtlIHVuY29udG9yb2xsZWQgY29tcG9uZW50IHdoZW4gcmVzaXppbmcgdG8gY29udHJvbCBwb3NpdGlvbiBieSBzZXRQb3N0aW9uLlxyXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLnN0YXRlLnJlc2l6aW5nID8gdW5kZWZpbmVkIDogZHJhZ2dhYmxlUG9zaXRpb247XHJcbiAgICAgICAgdmFyIGRyYWdBeGlzT3JVbmRlZmluZWQgPSB0aGlzLnN0YXRlLnJlc2l6aW5nID8gXCJib3RoXCIgOiBkcmFnQXhpcztcclxuICAgICAgICByZXR1cm4gKGNyZWF0ZUVsZW1lbnQoRHJhZ2dhYmxlLCB7IHJlZjogdGhpcy5yZWZEcmFnZ2FibGUsIGhhbmRsZTogZHJhZ0hhbmRsZUNsYXNzTmFtZSA/IFwiLlwiLmNvbmNhdChkcmFnSGFuZGxlQ2xhc3NOYW1lKSA6IHVuZGVmaW5lZCwgZGVmYXVsdFBvc2l0aW9uOiBkZWZhdWx0VmFsdWUsIG9uTW91c2VEb3duOiBvbk1vdXNlRG93biwgb25Nb3VzZVVwOiBvbk1vdXNlVXAsIG9uU3RhcnQ6IHRoaXMub25EcmFnU3RhcnQsIG9uRHJhZzogdGhpcy5vbkRyYWcsIG9uU3RvcDogdGhpcy5vbkRyYWdTdG9wLCBheGlzOiBkcmFnQXhpc09yVW5kZWZpbmVkLCBkaXNhYmxlZDogZGlzYWJsZURyYWdnaW5nLCBncmlkOiBkcmFnR3JpZCwgYm91bmRzOiBib3VuZHMgPyB0aGlzLnN0YXRlLmJvdW5kcyA6IHVuZGVmaW5lZCwgcG9zaXRpb246IHBvcywgZW5hYmxlVXNlclNlbGVjdEhhY2s6IGVuYWJsZVVzZXJTZWxlY3RIYWNrLCBjYW5jZWw6IGNhbmNlbCwgc2NhbGU6IHNjYWxlLCBhbGxvd0FueUNsaWNrOiBhbGxvd0FueUNsaWNrLCBub2RlUmVmOiB0aGlzLnJlc2l6YWJsZUVsZW1lbnQgfSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChSZXNpemFibGUsIF9fYXNzaWduKHt9LCByZXNpemFibGVQcm9wcywgeyByZWY6IHRoaXMucmVmUmVzaXphYmxlLCBkZWZhdWx0U2l6ZTogZGVmYXVsdFZhbHVlLCBzaXplOiB0aGlzLnByb3BzLnNpemUsIGVuYWJsZTogdHlwZW9mIGVuYWJsZVJlc2l6aW5nID09PSBcImJvb2xlYW5cIiA/IGdldEVuYWJsZVJlc2l6aW5nQnlGbGFnKGVuYWJsZVJlc2l6aW5nKSA6IGVuYWJsZVJlc2l6aW5nLCBvblJlc2l6ZVN0YXJ0OiB0aGlzLm9uUmVzaXplU3RhcnQsIG9uUmVzaXplOiB0aGlzLm9uUmVzaXplLCBvblJlc2l6ZVN0b3A6IHRoaXMub25SZXNpemVTdG9wLCBzdHlsZTogaW5uZXJTdHlsZSwgbWluV2lkdGg6IHRoaXMucHJvcHMubWluV2lkdGgsIG1pbkhlaWdodDogdGhpcy5wcm9wcy5taW5IZWlnaHQsIG1heFdpZHRoOiB0aGlzLnN0YXRlLnJlc2l6aW5nID8gdGhpcy5zdGF0ZS5tYXhXaWR0aCA6IHRoaXMucHJvcHMubWF4V2lkdGgsIG1heEhlaWdodDogdGhpcy5zdGF0ZS5yZXNpemluZyA/IHRoaXMuc3RhdGUubWF4SGVpZ2h0IDogdGhpcy5wcm9wcy5tYXhIZWlnaHQsIGdyaWQ6IHJlc2l6ZUdyaWQsIGhhbmRsZVdyYXBwZXJDbGFzczogcmVzaXplSGFuZGxlV3JhcHBlckNsYXNzLCBoYW5kbGVXcmFwcGVyU3R5bGU6IHJlc2l6ZUhhbmRsZVdyYXBwZXJTdHlsZSwgbG9ja0FzcGVjdFJhdGlvOiB0aGlzLnByb3BzLmxvY2tBc3BlY3RSYXRpbywgbG9ja0FzcGVjdFJhdGlvRXh0cmFXaWR0aDogdGhpcy5wcm9wcy5sb2NrQXNwZWN0UmF0aW9FeHRyYVdpZHRoLCBsb2NrQXNwZWN0UmF0aW9FeHRyYUhlaWdodDogdGhpcy5wcm9wcy5sb2NrQXNwZWN0UmF0aW9FeHRyYUhlaWdodCwgaGFuZGxlU3R5bGVzOiByZXNpemVIYW5kbGVTdHlsZXMsIGhhbmRsZUNsYXNzZXM6IHJlc2l6ZUhhbmRsZUNsYXNzZXMsIGhhbmRsZUNvbXBvbmVudDogcmVzaXplSGFuZGxlQ29tcG9uZW50LCBzY2FsZTogdGhpcy5wcm9wcy5zY2FsZSB9KSwgY2hpbGRyZW4pKSk7XHJcbiAgICB9O1xyXG4gICAgUm5kLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBtYXhXaWR0aDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcclxuICAgICAgICBzY2FsZTogMSxcclxuICAgICAgICBvblJlc2l6ZVN0YXJ0OiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgb25SZXNpemU6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICBvblJlc2l6ZVN0b3A6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICBvbkRyYWdTdGFydDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgIG9uRHJhZzogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgIG9uRHJhZ1N0b3A6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gUm5kO1xyXG59KFB1cmVDb21wb25lbnQpKTtcblxuZXhwb3J0IHsgUm5kIH07XG4iLCJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJuZCB9IGZyb20gXCJyZWFjdC1ybmRcIjtcclxuaW1wb3J0ICcuL0FwcGxpY2F0aW9uLnNjc3MnO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IE1pY3JvID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoJ21pY3JvZnIvQXBwbGljYXRpb24nKSlcclxuY29uc3QgTWljcm90d28gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnbWljcm9mcnR3by9BcHBsaWNhdGlvbnR3bycpKVxyXG5cclxuY29uc3QgQXBwbGljYXRpb246IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXJrVGhlbWUsIHNldERhcmtUaGVtZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgIGJvcmRlcjogXCJzb2xpZCAxcHggYmxhY2tcIixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmMGYwZjBcIixcclxuICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoZGFya1RoZW1lKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtkYXJrVGhlbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9J2Vyd3QnPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbi1oZWFkaW5nJz5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9J3RoZW1lZCc+T21yb24gLSBSb2JvdCBEYXNoYm9hcmQgUG9DPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFJuZFxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ9e3tcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3ZlcmZsb3c6ICdhdXRvJywgJ2FsaWduSXRlbXMnOiAnc3RyZXRjaCcsIGRpc3BsYXk6ICdmbGV4J319PlxyXG4gICAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNaWNybyBjbGFzc05hbWU9e3t9fS8+XHJcbiAgICAgICAgICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1JuZD5cclxuICAgICAgICA8Um5kXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cclxuICAgICAgICAgICAgZGVmYXVsdD17e1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDBcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tvdmVyZmxvdzogJ2F1dG8nLCAnYWxpZ25JdGVtcyc6ICdzdHJldGNoJywgZGlzcGxheTogJ2ZsZXgnfX0+XHJcbiAgICAgICAgICAgICAgICA8UmVhY3QuU3VzcGVuc2U+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1pY3JvdHdvIGNsYXNzTmFtZT17e319Lz5cclxuICAgICAgICAgICAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvUm5kPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI0MmZhZGZlMDEwOTBhODk1Mjc2YVwiKSIsInZhciBjaHVua01hcHBpbmcgPSB7XG5cdFwid2VicGFja19jb250YWluZXJfcmVtb3RlX21pY3JvZnJfQXBwbGljYXRpb25cIjogW1xuXHRcdFwid2VicGFjay9jb250YWluZXIvcmVtb3RlL21pY3JvZnIvQXBwbGljYXRpb25cIlxuXHRdLFxuXHRcIndlYnBhY2tfY29udGFpbmVyX3JlbW90ZV9taWNyb2ZydHdvX0FwcGxpY2F0aW9udHdvXCI6IFtcblx0XHRcIndlYnBhY2svY29udGFpbmVyL3JlbW90ZS9taWNyb2ZydHdvL0FwcGxpY2F0aW9udHdvXCJcblx0XVxufTtcbnZhciBpZFRvRXh0ZXJuYWxBbmROYW1lTWFwcGluZyA9IHtcblx0XCJ3ZWJwYWNrL2NvbnRhaW5lci9yZW1vdGUvbWljcm9mci9BcHBsaWNhdGlvblwiOiBbXG5cdFx0XCJkZWZhdWx0XCIsXG5cdFx0XCIuL0FwcGxpY2F0aW9uXCIsXG5cdFx0XCJ3ZWJwYWNrL2NvbnRhaW5lci9yZWZlcmVuY2UvbWljcm9mclwiXG5cdF0sXG5cdFwid2VicGFjay9jb250YWluZXIvcmVtb3RlL21pY3JvZnJ0d28vQXBwbGljYXRpb250d29cIjogW1xuXHRcdFwiZGVmYXVsdFwiLFxuXHRcdFwiLi9BcHBsaWNhdGlvbnR3b1wiLFxuXHRcdFwid2VicGFjay9jb250YWluZXIvcmVmZXJlbmNlL21pY3JvZnJ0d29cIlxuXHRdXG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLnJlbW90ZXMgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGNodW5rTWFwcGluZywgY2h1bmtJZCkpIHtcblx0XHRjaHVua01hcHBpbmdbY2h1bmtJZF0uZm9yRWFjaCgoaWQpID0+IHtcblx0XHRcdHZhciBnZXRTY29wZSA9IF9fd2VicGFja19yZXF1aXJlX18uUjtcblx0XHRcdGlmKCFnZXRTY29wZSkgZ2V0U2NvcGUgPSBbXTtcblx0XHRcdHZhciBkYXRhID0gaWRUb0V4dGVybmFsQW5kTmFtZU1hcHBpbmdbaWRdO1xuXHRcdFx0aWYoZ2V0U2NvcGUuaW5kZXhPZihkYXRhKSA+PSAwKSByZXR1cm47XG5cdFx0XHRnZXRTY29wZS5wdXNoKGRhdGEpO1xuXHRcdFx0aWYoZGF0YS5wKSByZXR1cm4gcHJvbWlzZXMucHVzaChkYXRhLnApO1xuXHRcdFx0dmFyIG9uRXJyb3IgPSAoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYoIWVycm9yKSBlcnJvciA9IG5ldyBFcnJvcihcIkNvbnRhaW5lciBtaXNzaW5nXCIpO1xuXHRcdFx0XHRpZih0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIilcblx0XHRcdFx0XHRlcnJvci5tZXNzYWdlICs9ICdcXG53aGlsZSBsb2FkaW5nIFwiJyArIGRhdGFbMV0gKyAnXCIgZnJvbSAnICsgZGF0YVsyXTtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW2lkXSA9ICgpID0+IHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhLnAgPSAwO1xuXHRcdFx0fTtcblx0XHRcdHZhciBoYW5kbGVGdW5jdGlvbiA9IChmbiwgYXJnMSwgYXJnMiwgZCwgbmV4dCwgZmlyc3QpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IGZuKGFyZzEsIGFyZzIpO1xuXHRcdFx0XHRcdGlmKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XG5cdFx0XHRcdFx0XHR2YXIgcCA9IHByb21pc2UudGhlbigocmVzdWx0KSA9PiAobmV4dChyZXN1bHQsIGQpKSwgb25FcnJvcik7XG5cdFx0XHRcdFx0XHRpZihmaXJzdCkgcHJvbWlzZXMucHVzaChkYXRhLnAgPSBwKTsgZWxzZSByZXR1cm4gcDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5leHQocHJvbWlzZSwgZCwgZmlyc3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaChlcnJvcikge1xuXHRcdFx0XHRcdG9uRXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR2YXIgb25FeHRlcm5hbCA9IChleHRlcm5hbCwgXywgZmlyc3QpID0+IChleHRlcm5hbCA/IGhhbmRsZUZ1bmN0aW9uKF9fd2VicGFja19yZXF1aXJlX18uSSwgZGF0YVswXSwgMCwgZXh0ZXJuYWwsIG9uSW5pdGlhbGl6ZWQsIGZpcnN0KSA6IG9uRXJyb3IoKSk7XG5cdFx0XHR2YXIgb25Jbml0aWFsaXplZCA9IChfLCBleHRlcm5hbCwgZmlyc3QpID0+IChoYW5kbGVGdW5jdGlvbihleHRlcm5hbC5nZXQsIGRhdGFbMV0sIGdldFNjb3BlLCAwLCBvbkZhY3RvcnksIGZpcnN0KSk7XG5cdFx0XHR2YXIgb25GYWN0b3J5ID0gKGZhY3RvcnkpID0+IHtcblx0XHRcdFx0ZGF0YS5wID0gMTtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW2lkXSA9IChtb2R1bGUpID0+IHtcblx0XHRcdFx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGhhbmRsZUZ1bmN0aW9uKF9fd2VicGFja19yZXF1aXJlX18sIGRhdGFbMl0sIDAsIDAsIG9uRXh0ZXJuYWwsIDEpO1xuXHRcdH0pO1xuXHR9XG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5TID0ge307XG52YXIgaW5pdFByb21pc2VzID0ge307XG52YXIgaW5pdFRva2VucyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5JID0gKG5hbWUsIGluaXRTY29wZSkgPT4ge1xuXHRpZighaW5pdFNjb3BlKSBpbml0U2NvcGUgPSBbXTtcblx0Ly8gaGFuZGxpbmcgY2lyY3VsYXIgaW5pdCBjYWxsc1xuXHR2YXIgaW5pdFRva2VuID0gaW5pdFRva2Vuc1tuYW1lXTtcblx0aWYoIWluaXRUb2tlbikgaW5pdFRva2VuID0gaW5pdFRva2Vuc1tuYW1lXSA9IHt9O1xuXHRpZihpbml0U2NvcGUuaW5kZXhPZihpbml0VG9rZW4pID49IDApIHJldHVybjtcblx0aW5pdFNjb3BlLnB1c2goaW5pdFRva2VuKTtcblx0Ly8gb25seSBydW5zIG9uY2Vcblx0aWYoaW5pdFByb21pc2VzW25hbWVdKSByZXR1cm4gaW5pdFByb21pc2VzW25hbWVdO1xuXHQvLyBjcmVhdGVzIGEgbmV3IHNoYXJlIHNjb3BlIGlmIG5lZWRlZFxuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKF9fd2VicGFja19yZXF1aXJlX18uUywgbmFtZSkpIF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXSA9IHt9O1xuXHQvLyBydW5zIGFsbCBpbml0IHNuaXBwZXRzIGZyb20gYWxsIG1vZHVsZXMgcmVhY2hhYmxlXG5cdHZhciBzY29wZSA9IF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXTtcblx0dmFyIHdhcm4gPSAobXNnKSA9PiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2Fybihtc2cpKTtcblx0dmFyIHVuaXF1ZU5hbWUgPSBcImVsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzXCI7XG5cdHZhciByZWdpc3RlciA9IChuYW1lLCB2ZXJzaW9uLCBmYWN0b3J5LCBlYWdlcikgPT4ge1xuXHRcdHZhciB2ZXJzaW9ucyA9IHNjb3BlW25hbWVdID0gc2NvcGVbbmFtZV0gfHwge307XG5cdFx0dmFyIGFjdGl2ZVZlcnNpb24gPSB2ZXJzaW9uc1t2ZXJzaW9uXTtcblx0XHRpZighYWN0aXZlVmVyc2lvbiB8fCAoIWFjdGl2ZVZlcnNpb24ubG9hZGVkICYmICghZWFnZXIgIT0gIWFjdGl2ZVZlcnNpb24uZWFnZXIgPyBlYWdlciA6IHVuaXF1ZU5hbWUgPiBhY3RpdmVWZXJzaW9uLmZyb20pKSkgdmVyc2lvbnNbdmVyc2lvbl0gPSB7IGdldDogZmFjdG9yeSwgZnJvbTogdW5pcXVlTmFtZSwgZWFnZXI6ICEhZWFnZXIgfTtcblx0fTtcblx0dmFyIGluaXRFeHRlcm5hbCA9IChpZCkgPT4ge1xuXHRcdHZhciBoYW5kbGVFcnJvciA9IChlcnIpID0+ICh3YXJuKFwiSW5pdGlhbGl6YXRpb24gb2Ygc2hhcmluZyBleHRlcm5hbCBmYWlsZWQ6IFwiICsgZXJyKSk7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcblx0XHRcdGlmKCFtb2R1bGUpIHJldHVybjtcblx0XHRcdHZhciBpbml0Rm4gPSAobW9kdWxlKSA9PiAobW9kdWxlICYmIG1vZHVsZS5pbml0ICYmIG1vZHVsZS5pbml0KF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXSwgaW5pdFNjb3BlKSlcblx0XHRcdGlmKG1vZHVsZS50aGVuKSByZXR1cm4gcHJvbWlzZXMucHVzaChtb2R1bGUudGhlbihpbml0Rm4sIGhhbmRsZUVycm9yKSk7XG5cdFx0XHR2YXIgaW5pdFJlc3VsdCA9IGluaXRGbihtb2R1bGUpO1xuXHRcdFx0aWYoaW5pdFJlc3VsdCAmJiBpbml0UmVzdWx0LnRoZW4pIHJldHVybiBwcm9taXNlcy5wdXNoKGluaXRSZXN1bHRbJ2NhdGNoJ10oaGFuZGxlRXJyb3IpKTtcblx0XHR9IGNhdGNoKGVycikgeyBoYW5kbGVFcnJvcihlcnIpOyB9XG5cdH1cblx0dmFyIHByb21pc2VzID0gW107XG5cdHN3aXRjaChuYW1lKSB7XG5cdFx0Y2FzZSBcImRlZmF1bHRcIjoge1xuXHRcdFx0aW5pdEV4dGVybmFsKFwid2VicGFjay9jb250YWluZXIvcmVmZXJlbmNlL21pY3JvZnJcIik7XG5cdFx0XHRpbml0RXh0ZXJuYWwoXCJ3ZWJwYWNrL2NvbnRhaW5lci9yZWZlcmVuY2UvbWljcm9mcnR3b1wiKTtcblx0XHR9XG5cdFx0YnJlYWs7XG5cdH1cblx0aWYoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IDE7XG5cdHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV0gPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiAoaW5pdFByb21pc2VzW25hbWVdID0gMSkpO1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=