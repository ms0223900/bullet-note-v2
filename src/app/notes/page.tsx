import { NoteEditor } from '@/components/notes/note-editor';

export default function NotesPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* 頁面標題 */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">筆記編輯器</h1>
                        <p className="text-gray-600">這是個子彈筆記的文字編輯區塊，提供快速記錄想法、任務和筆記的專業環境</p>
                    </div>

                    {/* 筆記編輯器 */}
                    <NoteEditor
                        placeholder="在這裡輸入您的想法、筆記或任何內容..."
                    />
                </div>
            </div>
        </div>
    );
}
