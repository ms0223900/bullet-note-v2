'use client';

import { getBulletRules } from '@/constants/bulletRules';

interface BulletRulesTableProps {
    version?: string;
}

export function BulletRulesTable({ version = 'current' }: BulletRulesTableProps) {
    const rules = getBulletRules(version);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">符號</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">意義</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map((rule, index) => (
                        <tr key={`${rule.symbol}-${index}`} className="odd:bg-white even:bg-gray-50">
                            <td className="px-4 py-2 text-gray-900 whitespace-nowrap text-base">{rule.symbol}</td>
                            <td className="px-4 py-2 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{rule.meaningZh}</span>
                                    {rule.meaningEn ? (
                                        <span className="text-xs text-gray-400">({rule.meaningEn})</span>
                                    ) : null}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


