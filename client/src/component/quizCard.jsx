import React from "react";
import { FiEdit, FiCheckCircle, FiTrash2 } from "react-icons/fi";

const QuizModal = ({
  courseQuiz,
  editedQuiz,
  setEditedQuiz,
  isEditing,
  setIsEditing,
  handleEditQuiz,
  handleDeleteQuiz,
  setShowPreview,
}) => {
  if (!courseQuiz) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              {isEditing ? "Editing Final Exam" : "Final Exam Preview"}
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {courseQuiz?.questions?.length || 0} Questions Total
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                isEditing
                  ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {isEditing ? (
                <>
                  <FiCheckCircle /> View Mode
                </>
              ) : (
                <>
                  <FiEdit /> Edit Quiz
                </>
              )}
            </button>
            <button
              onClick={handleDeleteQuiz}
              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {(isEditing ? editedQuiz?.questions : courseQuiz?.questions)?.map(
            (q, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-blue-200 transition-all"
              >
                <div className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>

                  <div className="flex-1 space-y-4">
                    {/* Question Text */}
                    {isEditing ? (
                      <input
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editedQuiz?.questions[index]?.question || ""}
                        onChange={(e) => {
                          const updated = { ...editedQuiz };
                          updated.questions[index].question = e.target.value;
                          setEditedQuiz(updated);
                        }}
                      />
                    ) : (
                      <p className="text-lg font-bold text-slate-800 leading-snug">
                        {q.question}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            isEditing
                              ? "bg-white border-slate-200"
                              : "bg-slate-100/50 border-transparent"
                          }`}
                        >
                          <span className="text-[10px] font-black text-slate-400 uppercase">
                            {i + 1}
                          </span>
                          {isEditing ? (
                            <input
                              className="flex-1 text-sm font-medium outline-none"
                              value={editedQuiz?.questions[index]?.options[i] || ""}
                              onChange={(e) => {
                                const updated = { ...editedQuiz };
                                updated.questions[index].options[i] = e.target.value;
                                setEditedQuiz(updated);
                              }}
                            />
                          ) : (
                            <span className="text-sm font-medium text-slate-600">
                              {opt}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Correct Answer */}
                    {isEditing ? (
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-sm font-bold text-slate-600">
                          Correct Answer: {q.answer}
                        </label>
                        <select
                          className="p-2 border rounded-lg outline-none"
                          value={editedQuiz.questions[index].answer || ""}
                          onChange={(e) => {
                            const updated = { ...editedQuiz };
                            updated.questions[index].answer = e.target.value;
                            setEditedQuiz(updated);
                          }}
                        >
                          {editedQuiz.questions[index].options.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-emerald-600 font-bold">
                        Correct Answer: {q.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-4 bg-white">
          {isEditing && (
            <button
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
              onClick={handleEditQuiz}
            >
              Save Changes
            </button>
          )}
          <button
            onClick={() => {
              setShowPreview(false);
              setIsEditing(false);
            }}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;