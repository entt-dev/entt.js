function assert(condition: boolean, message: string): void {
		if (!condition) {
				message = message || 'Assertion failed'
				if (typeof Error !== 'undefined') {
						throw new Error(message)
				}
				throw message // Fallback
		}
}

function swap(arr: any[], lhs: number, rhs: number) {
	const tmp = arr[lhs]
	arr[lhs] = arr[rhs]
	arr[rhs] = tmp
}

/**
 * Represents a sparse set
 */
export default class SparseSet {
	private direct: number[] = []
	private reverse: number[] = []

	/**
	 * Returns true if the set contains entity with given id
	 */
	public has(entity: number): boolean {
		return entity < this.reverse.length && this.reverse[entity] !== undefined
	}

	/**
	 * Adds an entity to the set
	 */
	public construct(entity: number): void {
		assert(!this.has(entity), 'Entity already exists')
		this.reverse[entity] = this.direct.length
		this.direct.push(entity)
	}

	/**
	 * Swaps two entities at given positions
	 */
	public swap(lhs: number, rhs: number): void {
		assert(lhs < this.direct.length, 'First entity out of range')
		assert(rhs < this.direct.length, 'Second entity out of range')

		swap(this.direct, lhs, rhs)
		swap(this.reverse, this.direct[lhs], this.direct[rhs])
	}

	/**
	 * Removes an entity from the set
	 */
	public destroy(entity: number): void {
		if (this.has(entity)) {
			const candidate = this.reverse[entity]
			this.direct[candidate] = this.direct[this.direct.length - 1]
			this.reverse[this.direct[this.direct.length - 1]] = candidate
			this.direct.pop()
			delete this.reverse[entity]
		}
	}

	/**
	 * Returns the position of the entity in a dense array
	 */
	public get(entity: number) {
		return this.reverse[entity]
	}

	public get empty() {
		return this.direct.length === 0
	}

	public get size() {
		return this.direct.length
	}

	/**
	 * Returns a dense array of all entities in this set
	 */
	public get data() {
		return this.direct
	}

	/**
	 * Sorts a set with respect to another one
	 */
	public respect(other: SparseSet) {
		let pos = this.size
		let otherPos = other.size

		while (pos && otherPos) {
			if (this.has(other.data[otherPos - 1])) {
				if (other.data[otherPos - 1] !== this.direct[pos - 1]) {
					this.swap(pos - 1, this.get(other.data[otherPos - 1]))
				}
				pos -= 1
			}
			otherPos -= 1
		}
	}
}
