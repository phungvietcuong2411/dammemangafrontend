// src/components/edit-manga/DescriptionField.jsx
export default function DescriptionField({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả truyện</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={7}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
        placeholder="Viết gì đó thật hấp dẫn về bộ truyện..."
      />
    </div>
  );
}