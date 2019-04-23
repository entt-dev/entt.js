import { expect } from 'chai'
import 'mocha'
import SparseSet from '../entity/sparseSet'

describe('sparseSet', () => {
	describe('#construct(entity)', () => {
		const set = new SparseSet()
		set.construct(8)
		set.construct(2)
		set.construct(12)
		set.construct(99)
		it('size should increase', () => {
			expect(set.size).eq(4)
		})
		it('links are intact', () => {
			expect(set.data[set.get(8)]).eq(8)
			expect(set.data[set.get(2)]).eq(2)
			expect(set.data[set.get(12)]).eq(12)
			expect(set.data[set.get(99)]).eq(99)
		})
	})

	describe('#destroy(entity)', () => {
		const set = new SparseSet()
		set.construct(5)
		set.construct(2)
		set.construct(88)
		set.construct(401)

		set.destroy(2)
		set.destroy(401)
		it('size should decrease', () => {
			expect(set.size).eq(2)
		})
		it('entities before are intact', () => {
			expect(set.data[set.get(5)]).eq(5)
		})
		it('entities after are intact', () => {
			expect(set.data[set.get(88)]).eq(88)
		})
	})

	describe('#swap(lhs, rhs)', () => {
		const set = new SparseSet()
		set.construct(1)
		set.construct(44)
		set.construct(913)
		set.construct(50)

		set.swap(0, 2)
		it('should swap', () => {
			expect(set.get(1)).eq(2)
			expect(set.get(913)).eq(0)
		})

		it('other indexses are the same', () => {
			expect(set.get(44)).eq(1)
			expect(set.get(50)).eq(3)
		})
	})

})
