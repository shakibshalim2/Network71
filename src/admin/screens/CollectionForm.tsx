import type { FormEvent } from 'react'
import type { ContentRecord, Module } from '../api'
import { Icon } from '../Admin'
export default function CollectionForm({editing,module,busy,dirty,save,close,setEditing,markDirty}:{editing:Partial<ContentRecord>;module:Module;busy:boolean;dirty:boolean;save:(event:FormEvent)=>void;close:()=>void;setEditing:(record:Partial<ContentRecord>)=>void;markDirty:(value:boolean)=>void}) {
return (<form className="adm-panel adm-editor" onSubmit={save}>
          <div className="adm-panel-heading">
            <div>
              <span className="adm-eyebrow">
                {editing.id ? "EDIT DRAFT" : "CREATE CONTENT"}
              </span>
              <h2>
                {editing.id
                  ? String(editing.data?.title)
                  : `New ${module.label.toLowerCase()} item`}
              </h2>
            </div>
            <button
              className="adm-button secondary"
              type="button"
              disabled={busy}
              onClick={close}
            >
              Cancel
            </button>
          </div>
          <div className="adm-form-grid">
            <label>
              URL slug
              <input
                autoFocus
                required
                maxLength={160}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                value={editing.slug || ""}
                onChange={(event) => {
                  setEditing({ ...editing, slug: event.target.value })
                  markDirty(true)
                }}
              />
              <small>Lowercase words separated by hyphens.</small>
            </label>
            <label>
              Display order
              <input
                type="number"
                min={-100000}
                max={100000}
                value={editing.sort_order ?? 0}
                onChange={(event) => {
                  setEditing({
                    ...editing,
                    sort_order: Number(event.target.value),
                  })
                  markDirty(true)
                }}
              />
              <small>Lower numbers appear first.</small>
            </label>
            {module.fields.map((field) => {
              const value = editing.data?.[field.key] ?? ""
              const update = (value: string | boolean) => {
                setEditing({
                  ...editing,
                  data: { ...editing.data, [field.key]: value },
                })
                markDirty(true)
              }
              return (
                <label
                  key={field.key}
                  className={
                    field.type === "textarea" || field.type === "checkbox"
                      ? "adm-full"
                      : ""
                  }
                >
                  {field.type !== "checkbox" && (
                    <span>
                      {field.label}
                      {field.required ? " *" : ""}
                    </span>
                  )}
                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.key === "body" ? 9 : 4}
                      maxLength={20000}
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    >
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <span className="adm-check">
                      <input
                        type="checkbox"
                        checked={value === true}
                        onChange={(event) => update(event.target.checked)}
                      />
                      {field.label}
                    </span>
                  ) : (
                    <input
                      required={field.key === "title"}
                      type={
                        ["email", "url", "date"].includes(field.type)
                          ? field.type
                          : "text"
                      }
                      maxLength={1000}
                      value={String(value)}
                      onChange={(event) => update(event.target.value)}
                    />
                  )}
                  {field.type === "image" && (
                    <small>
                      Upload an image in Media library, then paste its image URL
                      here.
                    </small>
                  )}
                </label>
              )
            })}
          </div>
          <div className="adm-editor-actions">
            <span>
              {dirty
                ? "You have unsaved changes."
                : "Fields marked * are required to publish."}
            </span>
            <button className="adm-button" disabled={busy}>
              {busy ? "Saving…" : "Save draft"}
              <Icon name="check" size={18} />
            </button>
          </div>
        </form>)
}
