import { cn } from '@/lib/utils'

describe('Utils', () => {
    describe('cn function', () => {
        it('should merge class names correctly', () => {
            const result = cn('class1', 'class2')
            expect(result).toBe('class1 class2')
        })

        it('should handle conditional classes', () => {
            const result = cn('base', { 'active': true, 'disabled': false })
            expect(result).toBe('base active')
        })

        it('should handle undefined and null values', () => {
            const result = cn('base', undefined, null, 'valid')
            expect(result).toBe('base valid')
        })

        it('should handle empty strings', () => {
            const result = cn('base', '', 'valid')
            expect(result).toBe('base valid')
        })

        it('should handle arrays of classes', () => {
            const result = cn(['class1', 'class2'], 'class3')
            expect(result).toBe('class1 class2 class3')
        })

        it('should handle complex combinations', () => {
            const result = cn(
                'base',
                ['array1', 'array2'],
                { 'conditional': true },
                'final'
            )
            expect(result).toBe('base array1 array2 conditional final')
        })
    })
})
