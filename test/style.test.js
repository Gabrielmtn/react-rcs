var Style = require('../style');

describe('The Style', function() {
	it('can transform an empty view selector', function () {
		var style = new Style('Test', {
			view: {

			}
		});

		expect(style.toString()).toBe('');
	});

	it('can transform a view selector', function () {
		var style = new Style('Test', {
			view: {
				opacity: 1
			}
		});

		expect(style.toString()).toBe('.react-view.react-test {opacity:1;}');
	});

	it('can transform a basic selector', function () {
		var style = new Style('Test', {
			'.item': {
				opacity: 1
			}
		});

		expect(style.toString()).toBe('.react-view.react-test .react-test-item {opacity:1;}');
	});

	it('can transform multiple selectors', function () {
		var style = new Style('Test', {
			'.item1, .item2, .item3': {
				opacity: 1
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item1 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item2 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item3 {opacity:1;}'
		);
	});

	it('can transform multiple selectors with multiple children', function () {
		var style = new Style('Test', {
			'.item1, .item2, .item3': {
				opacity: 1,

				'.first-child': {
					opacity: 1,

					'.second-child': {
						opacity: 1
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item1 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item1 .react-test-first-child {opacity:1;}\n' +
			'.react-view.react-test .react-test-item1 .react-test-first-child .react-test-second-child {opacity:1;}\n' +
			'.react-view.react-test .react-test-item2 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item2 .react-test-first-child {opacity:1;}\n' +
			'.react-view.react-test .react-test-item2 .react-test-first-child .react-test-second-child {opacity:1;}\n' +
			'.react-view.react-test .react-test-item3 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item3 .react-test-first-child {opacity:1;}\n' +
			'.react-view.react-test .react-test-item3 .react-test-first-child .react-test-second-child {opacity:1;}'
		);
	});

	it('can transform nested selectors', function () {
		var style = new Style('Test', {
			'.item': {
				opacity: 1,

				'.item1': {
					opacity: 1,

					'.item2': {
						opacity: 1
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item {opacity:1;}\n' +
			'.react-view.react-test .react-test-item .react-test-item1 {opacity:1;}\n' +
			'.react-view.react-test .react-test-item .react-test-item1 .react-test-item2 {opacity:1;}'
		);
	});

	it('can transform psuedo selectors', function () {
		var style = new Style('Test', {
			'view': {
				':hover': {
					opacity: 1
				}
			},

			'.item': {
				':hover': {
					opacity: 1
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test:hover {opacity:1;}\n'+
			'.react-view.react-test .react-test-item:hover {opacity:1;}'
		);
	});

	it('can transform multiple selectors with psuedo selectors', function () {
		var style = new Style('Test', {
			'view, .item': {
				':hover': {
					opacity: 1
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item:hover {opacity:1;}\n' +
			'.react-view.react-test:hover {opacity:1;}'
		);
	});

	it('can transform multiple selectors with multiple psuedo selectors', function () {
		var style = new Style('Test', {
			'view, .item': {
				':hover:active': {
					opacity: 1
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item:hover:active {opacity:1;}\n' +
			'.react-view.react-test:hover:active {opacity:1;}'
		);
	});	

	it('can transform a state selector on the view', function () {
		var style = new Style('Test', {
			'view': {
				':::active': {
					opacity: 1
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test.react-test-state-active {opacity:1;}'
		);
	});	

	it('can transform a state selector on the root', function () {
		var style = new Style('Test', {
			':::active': {
				opacity: 1
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test.react-test-state-active {opacity:1;}'
		);
	});

	it('can transform a nested state selector', function () {
		var style = new Style('Test', {
			'.level-one': {
				opacity: 0,

				'.level-two': {
					opacity: 0,

					':::active': {
						opacity: 1
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-level-one {opacity:0;}\n' +
			'.react-view.react-test .react-test-level-one .react-test-level-two {opacity:0;}\n' +
			'.react-view.react-test.react-test-state-active .react-test-level-one .react-test-level-two {opacity:1;}'
		);
	});	

	it('can transform multiple nested state selectors on the root', function () {
		var style = new Style('Test', {
			':::visible': {
				'.level-one': {
					opacity: 0,

					'.level-two': {
						opacity: 0,

						':::active': {
							opacity: 1
						}
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test.react-test-state-active.react-test-state-visible .react-test-level-one .react-test-level-two {opacity:1;}\n' +
			'.react-view.react-test.react-test-state-visible .react-test-level-one {opacity:0;}\n' +
			'.react-view.react-test.react-test-state-visible .react-test-level-one .react-test-level-two {opacity:0;}'
		);
	});	

	it('can transform multiple nested state selectors on the view', function () {
		var style = new Style('Test', {
			'view': {
				':::visible': {
					'.level-one': {
						opacity: 0,

						'.level-two': {
							opacity: 0,

							':::active': {
								opacity: 1
							}
						}
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test.react-test-state-active.react-test-state-visible .react-test-level-one .react-test-level-two {opacity:1;}\n' +
			'.react-view.react-test.react-test-state-visible .react-test-level-one {opacity:0;}\n' +
			'.react-view.react-test.react-test-state-visible .react-test-level-one .react-test-level-two {opacity:0;}'
		);
	});	

	it('can transform a multiple single selector', function () {
		var style = new Style('Test', {
			'.item1.item2.item3': {
				opacity: 0
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item1.react-test-item2.react-test-item3 {opacity:0;}'
		);
	});	

	it('can transform a multiple single selector with nested selectors', function () {
		var style = new Style('Test', {
			'.item1.item2.item3': {
				opacity: 0,

				'.level-one': {
					opacity: 0,

					'.level-two': {
						opacity: 0,

						':hover': {
							opacity: 1
						}
					}
				}
			}
		});

		expect(style.toString()).toBe(
			'.react-view.react-test .react-test-item1.react-test-item2.react-test-item3 {opacity:0;}\n' +
			'.react-view.react-test .react-test-item1.react-test-item2.react-test-item3 .react-test-level-one {opacity:0;}\n' +
			'.react-view.react-test .react-test-item1.react-test-item2.react-test-item3 .react-test-level-one .react-test-level-two {opacity:0;}\n' +
			'.react-view.react-test .react-test-item1.react-test-item2.react-test-item3 .react-test-level-one .react-test-level-two:hover {opacity:1;}'
		);
	});	
});