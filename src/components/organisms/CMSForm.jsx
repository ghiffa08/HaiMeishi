import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Save, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ImageUpload = ({ label, id, currentUrl, onChange, onRemove }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-mono text-ink-faded uppercase tracking-widest">{label}</label>
        <div className="flex items-center gap-4 p-4 bg-white border border-washi-border group hover:border-ink/20 transition-colors">
            <div className="w-14 h-14 flex items-center justify-center bg-washi-border/10 border border-washi-border/30 overflow-hidden shrink-0">
                {currentUrl ? (
                    <img src={currentUrl} alt={label} className="w-full h-full object-contain p-1" />
                ) : (
                    <div className="text-ink-faded italic text-[10px] opacity-40">None</div>
                )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <input 
                    type="text" 
                    value={currentUrl || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g. /assets/logo.png"
                    className="w-full p-2 bg-washi/50 border border-washi-border font-mono text-[11px] outline-none focus:border-ink transition-colors"
                    id={id} 
                />
                <div className="flex gap-2">
                    {currentUrl && (
                        <button 
                            type="button" 
                            onClick={onRemove}
                            className="px-3 py-1.5 border border-accent-error/30 text-accent-error text-[9px] uppercase tracking-widest hover:bg-accent-error/5 transition-colors"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const CMSForm = ({ section, initialData }) => {
    const { updateData, uploadImage } = usePortfolio();
    
    // Ensure initialData is at least an empty object for branding
    const defaultData = section === 'branding' ? (initialData || { favicon: '', logo: '', logoText: '' }) : initialData;

    const { register, control, handleSubmit, setValue, watch, formState: { isDirty, isSubmitting } } = useForm({
        defaultValues: { [section]: defaultData }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: section
    });

    const [showHanko, setShowHanko] = useState(false);
    const onPublish = async (data) => {
        try {
            await updateData(data);
            setShowHanko(true);
            setTimeout(() => setShowHanko(false), 2000);
        } catch (err) {
            alert('Failed to publish changes: ' + err.message);
        }
    };

    const sectionValues = watch(section);

    return (
        <form onSubmit={handleSubmit(onPublish)} className="space-y-8">
            <div className="flex justify-between items-center mb-10">
                <h2 className="font-mincho text-2xl text-ink capitalize tracking-wide">
                    {section.replace('_', ' ')}
                </h2>
                <button 
                    type="submit" 
                    disabled={!isDirty || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-accent-red text-washi font-mono text-[11px] uppercase tracking-wider transition-all disabled:bg-ink-faded/30 disabled:cursor-not-allowed hover:opacity-90 shadow-md"
                >
                    <Save size={16} /> {isSubmitting ? 'Publishing...' : 'Publish Changes'}
                </button>
            </div>

            <div className="space-y-6">
                {section === 'branding' ? (
                    <div className="bg-[#fcfaf7] border border-washi-border p-8 shadow-sm space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                            <ImageUpload 
                                label="Favicon (.ico/.png)" 
                                id="upload-favicon"
                                currentUrl={sectionValues?.favicon}
                                onChange={(val) => setValue(`${section}.favicon`, val, { shouldDirty: true })}
                                onRemove={() => setValue(`${section}.favicon`, '', { shouldDirty: true })}
                            />
                            <ImageUpload 
                                label="Main Logo" 
                                id="upload-logo"
                                currentUrl={sectionValues?.logo}
                                onChange={(val) => setValue(`${section}.logo`, val, { shouldDirty: true })}
                                onRemove={() => setValue(`${section}.logo`, '', { shouldDirty: true })}
                            />
                        </div>
                        <div className="pt-6 border-t border-washi-border">
                            <label className="text-[10px] font-mono text-ink-faded uppercase tracking-widest block mb-2">Logo Text Alternative</label>
                            <input {...register(`${section}.logoText`)} placeholder="e.g. HAI" className="cms-input" />
                            <p className="text-[10px] text-ink-faded mt-2 italic opacity-60">This text will be used if no logo image is uploaded.</p>
                        </div>
                    </div>
                ) : section !== 'profile' ? fields.map((item, index) => (
                    <div key={item.id} className="bg-[#fcfaf7] border border-washi-border p-6 shadow-sm animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="flex justify-between items-center mb-6 text-ink-faded">
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">ITEM #{index + 1}</span>
                            <button 
                                type="button" 
                                onClick={() => remove(index)} 
                                className="text-accent-error hover:bg-accent-error/10 p-1.5 transition-colors rounded"
                                title="Remove item"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section === 'experience' && (
                                <>
                                    <input {...register(`${section}.${index}.year`)} placeholder="Year (e.g. 2024 - 2025)" className="cms-input" />
                                    <input {...register(`${section}.${index}.role`)} placeholder="Role" className="cms-input" />
                                    <input {...register(`${section}.${index}.org`)} placeholder="Organization" className="cms-input col-span-2" />
                                    <textarea {...register(`${section}.${index}.desc`)} placeholder="Description" rows={3} className="cms-input col-span-2" />
                                </>
                            )}

                            {section === 'works' && (
                                <>
                                    <input {...register(`${section}.${index}.id`)} placeholder="ID (slug)" className="cms-input" />
                                    <input {...register(`${section}.${index}.year`)} placeholder="Year" className="cms-input" />
                                    <input {...register(`${section}.${index}.title`)} placeholder="Title" className="cms-input" />
                                    <input {...register(`${section}.${index}.titleJp`)} placeholder="Title JP" className="cms-input" />
                                    <textarea {...register(`${section}.${index}.shortDesc`)} placeholder="Short Description" className="cms-input col-span-2" />
                                    <textarea {...register(`${section}.${index}.fullDesc`)} placeholder="Full Description" rows={4} className="cms-input col-span-2" />
                                    <textarea {...register(`${section}.${index}.fullDescJp`)} placeholder="Full Description JP" rows={4} className="cms-input col-span-2" />
                                    <input {...register(`${section}.${index}.link`)} placeholder="Link" className="cms-input" />
                                    <input {...register(`${section}.${index}.repo`)} placeholder="Repo" className="cms-input" />
                                    <input {...register(`${section}.${index}.role`)} placeholder="Your Role" className="cms-input col-span-2" />
                                </>
                            )}

                            {(section === 'awards' || section === 'certifications' || section === 'education') && (
                                <>
                                    <input {...register(`${section}.${index}.year`)} placeholder="Year/Date" className="cms-input" />
                                    <input {...register(`${section}.${index}.title`)} placeholder="Title/Degree" className="cms-input" />
                                    <input {...register(`${section}.${index}.org`)} placeholder="Organization" className="cms-input col-span-2" />
                                    {section === 'education' && <input {...register(`${section}.${index}.note`)} placeholder="Note" className="cms-input col-span-2" />}
                                </>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="bg-[#fcfaf7] border border-washi-border p-8 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <input {...register(`${section}.brand`)} placeholder="Brand Name" className="cms-input" />
                            <input {...register(`${section}.brandKanji`)} placeholder="Brand Kanji" className="cms-input" />
                            <input {...register(`${section}.nameEn`)} placeholder="Full Name" className="cms-input" />
                            <input {...register(`${section}.mail`)} placeholder="Email" className="cms-input" />
                            <input {...register(`${section}.tel`)} placeholder="Phone" className="cms-input" />
                            <input {...register(`${section}.adr`)} placeholder="Address" className="cms-input" />
                            <input {...register(`${section}.est`)} placeholder="Establishment Year" className="cms-input" />
                        </div>
                    </div>
                )}
            </div>

            {section !== 'profile' && section !== 'branding' && (
                <button 
                    type="button" 
                    onClick={() => append({})} 
                    className="flex items-center gap-2 px-6 py-3 bg-ink text-washi font-mono text-[11px] uppercase tracking-widest mt-6 hover:bg-ink-dark transition-colors"
                >
                    <Plus size={16} /> Add New Entry
                </button>
            )}

            {/* Hanko Feedback Animation */}
            {showHanko && (
                <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-[2000] pointer-events-none animate-fade-in">
                    <div className="w-[120px] h-[120px] border-4 border-accent-red text-accent-red flex flex-col items-center justify-center -rotate-[15deg] animate-hanko-stamp">
                        <span className="text-4xl font-serif">印</span>
                        <div className="text-[10px] font-bold tracking-[0.2em] mt-1">PUBLISHED</div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default CMSForm;
