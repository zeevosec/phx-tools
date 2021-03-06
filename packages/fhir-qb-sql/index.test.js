const sqlQB = require('./index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

describe('SQL Query Builder Tests', () => {
	describe('buildEqualToQuery Tests', () => {
		test('Should return sequelize equals query given a key and a value', () => {
			const expectedResult = { name: 'foo', value: 'bar' };
			let observedResult = sqlQB.buildEqualToQuery({
				field: 'foo',
				value: 'bar',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize $ne query given a key, value, and invert = true', () => {
			const expectedResult = { name: 'foo', value: { [Op.ne]: 'bar' } };
			let observedResult = sqlQB.buildEqualToQuery({
				field: 'foo',
				value: 'bar',
				invert: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize equals date query given a key and a value with an isDate flag', () => {
			const expectedResult = {
				[Op.and]: [
					{
						name: 'foo',
					},
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'=',
						'2015',
					),
				],
			};
			let observedResult = sqlQB.buildEqualToQuery({
				field: 'foo',
				value: '2015',
				isDate: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize ne date query given a key and a value with isDate and invert flags', () => {
			const expectedResult = {
				[Op.and]: [
					{
						name: 'foo',
					},
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'!=',
						'2015',
					),
				],
			};
			let observedResult = sqlQB.buildEqualToQuery({
				field: 'foo',
				value: '2015',
				isDate: true,
				invert: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildComparatorQuery Tests', () => {
		test('Should return sequelize $gt query given a key, value, and gt', () => {
			const expectedResult = { name: 'foo', value: { [Op.gt]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'gt',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize greater than query given a key, value, and ge', () => {
			const expectedResult = { name: 'foo', value: { [Op.gte]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'ge',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize less than query given a key, value, and lt', () => {
			const expectedResult = { name: 'foo', value: { [Op.lt]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'lt',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize less than or equal to query given a key, value, and le', () => {
			const expectedResult = { name: 'foo', value: { [Op.lte]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'le',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize greater than query given a key, value, and sa', () => {
			const expectedResult = { name: 'foo', value: { [Op.gt]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'sa',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize less than query given a key, value, and eb', () => {
			const expectedResult = { name: 'foo', value: { [Op.lt]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'eb',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize not equal query given a key, value, and ne', () => {
			const expectedResult = { name: 'foo', value: { [Op.ne]: 'bar' } };
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: 'bar',
				comparator: 'ne',
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return sequelize comparator query given a key, value, comparator, and isDate flag', () => {
			const expectedResult = {
				[Op.and]: [
					{
						name: 'foo',
					},
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						Op.ne,
						'2016',
					),
				],
			};
			let observedResult = sqlQB.buildComparatorQuery({
				field: 'foo',
				value: '2016',
				comparator: 'ne',
				isDate: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildOrQuery Tests', () => {
		test('Should return $or of given queries', () => {
			const expectedResult = { [Op.or]: [{ foo: 'bar' }, { bar: 'foo' }] };
			let observedResult = sqlQB.buildOrQuery({
				queries: [{ foo: 'bar' }, { bar: 'foo' }],
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return $nor of given queries if invert option is true', () => {
			const expectedResult = {
				[Op.not]: { [Op.or]: [{ foo: 'bar' }, { bar: 'foo' }] },
			};
			let observedResult = sqlQB.buildOrQuery({
				queries: [{ foo: 'bar' }, { bar: 'foo' }],
				invert: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildContainsQuery Tests', () => {
		test('Should return case sensitive match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.like]: 'bar' } };
			let observedResult = sqlQB.buildContainsQuery({
				field: 'foo',
				value: 'bar',
				caseSensitive: true,
			});
			expect(observedResult).toEqual(expectedResult);
			console.log(observedResult);
		});
		test('Should return case insensitive match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.iLike]: 'bar' } };
			let observedResult = sqlQB.buildContainsQuery({
				field: 'foo',
				value: 'bar',
			});
			expect(observedResult).toEqual(expectedResult);
			console.log(observedResult);
		});
	});
	describe('buildStartsWithQuery Tests', () => {
		test('Should return case sensitive front of word match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.startsWith]: 'bar' } };
			let observedResult = sqlQB.buildStartsWithQuery({
				field: 'foo',
				value: 'bar',
				caseSensitive: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return case insensitive front of word match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.iRegexp]: '^bar' } };
			let observedResult = sqlQB.buildStartsWithQuery({
				field: 'foo',
				value: 'bar',
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildEndsWithQuery Tests', () => {
		test('Should return case sensitive front of word match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.endsWith]: 'bar' } };
			let observedResult = sqlQB.buildEndsWithQuery({
				field: 'foo',
				value: 'bar',
				caseSensitive: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return case insensitive front of word match regex query', () => {
			const expectedResult = { name: 'foo', value: { [Op.iRegexp]: 'bar$' } };
			let observedResult = sqlQB.buildEndsWithQuery({
				field: 'foo',
				value: 'bar',
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildExistsQuery Tests', () => {
		test('Should return a range query', () => {
			const expectedResult = 'NOT IMPLEMENTED';
			let observedResult = sqlQB.buildExistsQuery({
				field: 'foo',
				exists: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('buildInRangeQuery Tests', () => {
		test('Should return a range query', () => {
			const expectedResult = { name: 'foo', value: { [Op.between]: [1, 10] } };
			let observedResult = sqlQB.buildInRangeQuery({
				field: 'foo',
				lowerBound: 1,
				upperBound: 10,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return an exclusive range query if given an invert flag', () => {
			const expectedResult = {
				name: 'foo',
				value: { [Op.notBetween]: [1, 10] },
			};
			let observedResult = sqlQB.buildInRangeQuery({
				field: 'foo',
				lowerBound: 1,
				upperBound: 10,
				invert: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return a date range query if given an isDate flag', () => {
			const expectedResult = {
				[Op.and]: [
					{
						name: 'foo',
					},
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'>=',
						'2013',
					),
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'<=',
						'2014',
					),
				],
			};
			let observedResult = sqlQB.buildInRangeQuery({
				field: 'foo',
				lowerBound: '2013',
				upperBound: '2014',
				isDate: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should return an exclusive date range query if given an invert flag and an isDate flag', () => {
			const expectedResult = {
				[Op.and]: [
					{
						name: 'foo',
					},
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'<=',
						'2013',
					),
					Sequelize.where(
						Sequelize.fn('date', Sequelize.col('value')),
						'>=',
						'2014',
					),
				],
			};
			let observedResult = sqlQB.buildInRangeQuery({
				field: 'foo',
				lowerBound: '2013',
				upperBound: '2014',
				invert: true,
				isDate: true,
			});
			expect(observedResult).toEqual(expectedResult);
		});
	});
	describe('assembleSearchQuery Tests', () => {
		test('Should return empty pipeline (except for archival and paging) if no matches or joins to perform', () => {
			const expectedResult = [];
			let observedResult = sqlQB.assembleSearchQuery({
				joinsToPerform: [],
				matchesToPerform: [],
				searchResultTransformations: {},
				implementationParameters: { archivedParamPath: 'meta._isArchived' },
				includeArchived: false,
				pageNumber: 1,
				resultsPerPage: 10,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should push lookups to front of pipeline if they are there', () => {
			const expectedResult = [];
			let observedResult = sqlQB.assembleSearchQuery({
				joinsToPerform: [{ from: 'foo', localKey: 'bar', foreignKey: 'baz' }],
				matchesToPerform: [],
				searchResultTransformations: {},
				implementationParameters: { archivedParamPath: 'meta._isArchived' },
				includeArchived: false,
				pageNumber: 1,
				resultsPerPage: 10,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should fill in empty matches with empty objects to keep queries valid', () => {
			const expectedResult = [{ where: { [Op.and]: [{ [Op.or]: [{}] }] } }];
			let observedResult = sqlQB.assembleSearchQuery({
				joinsToPerform: [],
				matchesToPerform: [[]],
				searchResultTransformations: {},
				implementationParameters: { archivedParamPath: 'meta._isArchived' },
				includeArchived: false,
				pageNumber: 1,
				resultsPerPage: 10,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test('Should handle matches appropriately', () => {
			const expectedResult = [
				{
					where: {
						[Op.and]: [{ [Op.or]: [{ foo: { [Op.gte]: 1, [Op.lte]: 10 } }] }],
					},
				},
			];
			let observedResult = sqlQB.assembleSearchQuery({
				joinsToPerform: [],
				matchesToPerform: [[{ foo: { [Op.gte]: 1, [Op.lte]: 10 } }]],
				searchResultTransformations: {},
				implementationParameters: { archivedParamPath: 'meta._isArchived' },
				includeArchived: false,
				pageNumber: 1,
				resultsPerPage: 10,
			});
			expect(observedResult).toEqual(expectedResult);
		});
		test("Should throw an error if required implementation parameter 'archivedParamPath' is missing", () => {
			const expectedError = new Error(
				"Missing required implementation parameter 'archivedParamPath'",
			);
			let observedError;
			try {
				sqlQB.assembleSearchQuery({
					joinsToPerform: [],
					matchesToPerform: [],
					searchResultTransformations: {},
					implementationParameters: {},
					includeArchived: false,
					pageNumber: 1,
					resultsPerPage: 10,
				});
			} catch (err) {
				observedError = err;
			}
			expect(observedError).toEqual(expectedError);
		});
	});
});
