'use client';

import React, { useState, useEffect } from 'react';

type Material = {
  id: string;
  course: string;
  level: '100L' | '200L' | '300L' | '400L';
  semester: 'Alpha' | 'Omega';
  title: string;
  filename: string;
  type: 'PDF' | 'PPTX' | 'Image';
};

type UserProfile = {
  fullName: string;
  email: string;
  level: '100L' | '200L' | '300L' | '400L';
};

const INITIAL_MATERIALS: Material[] = [
  // BCH 313 (300L Alpha)
  { id: '1', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Covenant Portal Compact Note', filename: 'BCH313 Covenant Portal compact.pdf', type: 'PDF' },
  { id: '2', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Week 1: One Carbon Metabolism', filename: 'WEEK 1 ONE CARBON METABOLISM.pdf', type: 'PDF' },
  { id: '3', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Week 2: Biosynthesis of Amino Acids & Proteins', filename: 'WEEK 2 Biosynthesis of amino acids.pdf', type: 'PDF' },
  { id: '4', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Week 3: Inborn Errors of Amino Acid Metabolism', filename: 'WEEK 3 INBORN ERRORS OF AMINO ACID METABOLISM.pdf', type: 'PDF' },
  { id: '5', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Week 4: Glucogenic & Ketogenic Amino Acids', filename: 'WEEK 4 Glucogenic and ketogenic amino.pdf', type: 'PDF' },
  { id: '6', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Week 5: Urea Cycle & Excretion of Nitrogen', filename: 'WEEK 5 Urea Cycle and Excretion of A.pdf', type: 'PDF' },
  { id: '7', course: 'BCH 313', level: '300L', semester: 'Alpha', title: 'Gluconeogenesis Pathway Diagram', filename: 'Gluconeogenesis PATHWAY.png', type: 'Image' },

  // BCH 315 (300L Alpha)
  { id: '8', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 1: Overview of Metabolic Pathways', filename: 'BCH315 Wk 1 Overview of the differen.pdf', type: 'PDF' },
  { id: '9', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 2: Review of Carbohydrate Structure & Functions', filename: 'BCH315 wk 2 Review of carbohydrates.pdf', type: 'PDF' },
  { id: '10', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 3: Degradation of Structural Carbohydrates', filename: 'BCH315 Wk 3 Degradation of structur.pdf', type: 'PDF' },
  { id: '11', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 4: Glycolytic Pathway & Gluconeogenesis', filename: 'BCH315 Wk 4 Glycolytic pathway and.pdf', type: 'PDF' },
  { id: '12', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 5: Electron Transport Chain', filename: 'BCH315 wk5 Electron Transport Chain.pdf', type: 'PDF' },
  { id: '13', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Wk 6: Secondary Pathways of Carbohydrate Metabolism', filename: 'BCH315 wk 6 Secondary pathways of.pdf', type: 'PDF' },
  { id: '14', course: 'BCH 315', level: '300L', semester: 'Alpha', title: 'Overview of Photosynthesis & Chloroplast', filename: 'Overview of photosynthesis, and chlor.pptx', type: 'PPTX' },

  // BCH 332 (300L Alpha)
  { id: '15', course: 'BCH 332', level: '300L', semester: 'Alpha', title: 'Enzymology Introduction', filename: 'BCH 216 (Enzymology-Introd).pdf', type: 'PDF' },
  { id: '16', course: 'BCH 332', level: '300L', semester: 'Alpha', title: 'Note 2: Enzyme Nomenclature & Classification', filename: 'note 2 Enzyme Nomenclature and clas.pdf', type: 'PDF' },
  { id: '17', course: 'BCH 332', level: '300L', semester: 'Alpha', title: 'Note 3: Cofactors and Coenzymes', filename: 'note 3 Cofactors and Coenzymes.pdf', type: 'PDF' },
  { id: '18', course: 'BCH 332', level: '300L', semester: 'Alpha', title: 'Note 4: Allosterism', filename: 'note 4 Allosterism.pdf', type: 'PDF' },
  { id: '19', course: 'BCH 332', level: '300L', semester: 'Alpha', title: 'Vitamins Lecture Slide', filename: 'BCH332_Note Vitamins.pptx', type: 'PPTX' }
];

export default function Home() {
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  
  // Local Database & Active Session
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Form Controls
  const [fullName, setFullName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedLevelInput, setSelectedLevelInput] = useState<'100L' | '200L' | '300L' | '400L'>('300L');
  const [formError, setFormError] = useState('');

  // Modals & Navigation
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Secret Admin State (?admin=true)
  const [isAdminUrl, setIsAdminUrl] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');

  // Admin New Material Inputs
  const [newCourse, setNewCourse] = useState('BCH 313');
  const [newLevel, setNewLevel] = useState<'100L' | '200L' | '300L' | '400L'>('300L');
  const [newSemester, setNewSemester] = useState<'Alpha' | 'Omega'>('Alpha');
  const [newTitle, setNewTitle] = useState('');
  const [newFilename, setNewFilename] = useState('');
  const [newType, setNewType] = useState<'PDF' | 'PPTX' | 'Image'>('PDF');

  // UI Filters
  const [activeCourseFilter, setActiveCourseFilter] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true') {
        setIsAdminUrl(true);
      }

      const savedUsers = localStorage.getItem('hebron_registered_users');
      if (savedUsers) {
        setRegisteredUsers(JSON.parse(savedUsers));
      }
    }
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setFormError('');
    setEmailInput('');
    setFullName('');
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!emailInput) return;

    const formattedEmail = emailInput.trim().toLowerCase();
    const existingUser = registeredUsers.find((u) => u.email === formattedEmail);

    if (authMode === 'signup') {
      if (existingUser) {
        setFormError('⚠️ An account with this email address already exists! Please click "Log In" below.');
        return;
      }

      const newUser: UserProfile = {
        fullName,
        email: formattedEmail,
        level: selectedLevelInput,
      };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('hebron_registered_users', JSON.stringify(updatedUsers));
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
    } else {
      if (!existingUser) {
        setFormError('⚠️ No account found with this email. Please click "Create Account" first.');
        return;
      }

      setCurrentUser(existingUser);
      setIsAuthModalOpen(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'hebron_super_admin_2026') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Access Denied: Incorrect Admin Password!');
    }
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newFilename) return;

    const newItem: Material = {
      id: Date.now().toString(),
      course: newCourse,
      level: newLevel,
      semester: newSemester,
      title: newTitle,
      filename: newFilename,
      type: newType,
    };

    setMaterials([newItem, ...materials]);
    setNewTitle('');
    setNewFilename('');
    alert(`Published "${newItem.title}" to ${newItem.course} (${newItem.level})!`);
  };

  const userVisibleMaterials = currentUser
    ? materials.filter((m) => m.level === currentUser.level)
    : [];

  const availableCourses = Array.from(new Set(userVisibleMaterials.map((m) => m.course)));

  const finalDisplayedMaterials = activeCourseFilter
    ? userVisibleMaterials.filter((m) => m.course === activeCourseFilter)
    : userVisibleMaterials;

  // SECRET ADMIN VIEW (?admin=true)
  if (isAdminUrl) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto my-24 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center">
            <div className="text-4xl mb-3">🗝️</div>
            <h2 className="text-2xl font-black text-white mb-2">Private Admin Portal</h2>
            <p className="text-xs text-slate-400 mb-6">Enter master security password to access content manager.</p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Admin Password..."
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-purple-600/30"
              >
                Authenticate & Unlock Dashboard →
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-slate-900 border border-purple-500/30 p-6 rounded-2xl flex justify-between items-center backdrop-blur-xl">
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800">
                  Webflow Control Center
                </span>
                <h2 className="text-2xl font-black text-white mt-2">HebronPrep Repository Manager</h2>
              </div>
              <a href="/" className="text-xs text-slate-400 hover:text-white underline font-semibold">
                Exit Admin Portal ↗
              </a>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-1">Upload & Link New Material</h3>
              <p className="text-xs text-slate-400 mb-6">Ensure the file is moved to your local <code className="text-purple-400">public/materials</code> folder.</p>

              <form onSubmit={handleAddMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Target Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="100L">100 Level</option>
                    <option value="200L">200 Level</option>
                    <option value="300L">300 Level</option>
                    <option value="400L">400 Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Semester</label>
                  <select
                    value={newSemester}
                    onChange={(e) => setNewSemester(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Alpha">Alpha Semester</option>
                    <option value="Omega">Omega Semester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. BCH 313"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Format</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPTX">PowerPoint Presentation</option>
                    <option value="Image">Image Diagram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Lecture Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Week 7: Photosynthesis"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">File Name in public/materials</label>
                  <input
                    type="text"
                    placeholder="e.g. BCH315_Week7.pdf"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-purple-600/25"
                  >
                    ✨ Publish Material to HebronPrep
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // STUDENT SITE VIEW
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
      <header className="bg-[#1A365D] text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-10">
        <div>
          <h1
            className="text-2xl font-bold tracking-wide cursor-pointer"
            onClick={() => setActiveCourseFilter(null)}
          >
            HebronPrep
          </h1>
          <p className="text-xs text-slate-300">CU Biochemistry Academic Vault</p>
        </div>

        <div>
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-xs font-bold block text-white">
                  👤 {currentUser.fullName || currentUser.email.split('@')[0]}
                </span>
                <span className="text-[10px] bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full border border-blue-600 inline-block font-mono">
                  Current Level: {currentUser.level}
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setActiveCourseFilter(null);
                }}
                className="text-xs text-slate-300 hover:text-white underline ml-2"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <button
                onClick={() => openAuth('login')}
                className="bg-slate-700 hover:bg-slate-600 transition px-3.5 py-1.5 rounded text-sm font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="bg-blue-600 hover:bg-blue-500 transition px-3.5 py-1.5 rounded text-sm font-medium"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!currentUser ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="text-4xl mb-3">🔒</div>
            <h2 className="text-2xl font-extrabold text-[#1A365D] mb-2">Student Portal Access</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              Create an account or log in with your level details to view your level's course repository.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => openAuth('signup')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-md"
              >
                Create Account →
              </button>
              <button
                onClick={() => openAuth('login')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition"
              >
                Log In
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-[#1A365D] to-blue-900 text-white p-6 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border border-blue-400/30">
                  Personalized Vault Access
                </span>
                <h2 className="text-2xl font-black mt-2">{currentUser.level} Course Repository</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Welcome <span className="text-amber-300 font-bold">{currentUser.fullName}</span>. Showing files specifically for your level.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/10">
                <p className="text-[10px] text-slate-300 uppercase font-bold">Your Available Files</p>
                <p className="text-xl font-extrabold text-amber-300">{userVisibleMaterials.length}</p>
              </div>
            </div>

            {availableCourses.length > 0 && (
              <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-xs font-bold text-slate-500 mr-2">Filter Course:</span>
                <button
                  onClick={() => setActiveCourseFilter(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeCourseFilter === null
                      ? 'bg-[#1A365D] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-500'
                  }`}
                >
                  All Courses ({userVisibleMaterials.length})
                </button>
                {availableCourses.map((code) => (
                  <button
                    key={code}
                    onClick={() => setActiveCourseFilter(code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeCourseFilter === code
                        ? 'bg-[#1A365D] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-500'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}

            {finalDisplayedMaterials.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                <p className="text-sm font-bold">No lecture materials uploaded for {currentUser.level} yet.</p>
                <p className="text-xs mt-1">Check back later as course representatives upload new documents.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {finalDisplayedMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-blue-300 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {mat.course}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded">
                          {mat.semester} Semester
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#1A365D] mt-1.5">{mat.title}</h4>
                      <p className="text-xs text-slate-500 truncate max-w-md">{mat.filename}</p>
                    </div>

                    <div className="flex space-x-2 w-full sm:w-auto">
                      {mat.type === 'PDF' && (
                        <button
                          onClick={() => setPreviewFile(`/materials/${mat.filename}`)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded transition"
                        >
                          👁️ Preview
                        </button>
                      )}
                      <a
                        href={`/materials/${mat.filename}`}
                        download
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded text-center transition"
                      >
                        📥 Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* PDF Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex flex-col z-50 p-4">
          <div className="flex justify-between items-center text-white pb-3">
            <h3 className="text-sm font-bold truncate max-w-md">{previewFile}</h3>
            <button
              onClick={() => setPreviewFile(null)}
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-xs font-bold"
            >
              Close Preview ✕
            </button>
          </div>
          <iframe
            src={previewFile}
            className="w-full h-full bg-white rounded-lg shadow-xl"
            title="PDF Preview"
          />
        </div>
      )}

      {/* AUTHENTICATION & REGISTRATION MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-extrabold text-[#1A365D] mb-1">
              {authMode === 'login' ? 'Student Log In' : 'Create Student Account'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {authMode === 'signup'
                ? 'Enter your profile details & current level.'
                : 'Enter your registered email to log in.'}
            </p>

            {formError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. David Oyedepo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Level</label>
                    <select
                      value={selectedLevelInput}
                      onChange={(e) => setSelectedLevelInput(e.target.value as any)}
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="100L">100 Level</option>
                      <option value="200L">200 Level</option>
                      <option value="300L">300 Level</option>
                      <option value="400L">400 Level</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setFormError('');
                  }}
                  placeholder="e.g. student@gmail.com"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A365D] hover:bg-slate-800 text-white font-bold py-3 rounded-lg text-sm transition shadow-md"
              >
                {authMode === 'signup' ? 'Register Account →' : 'Log In →'}
              </button>

              <div className="text-center pt-2">
                {authMode === 'signup' ? (
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => openAuth('login')}
                  className="text-blue-500">Log In</button>
