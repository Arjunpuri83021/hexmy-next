"use client";
import { useEffect, useState } from "react";
import Protected from "../Protected";
import AdminNavbar from "../components/AdminNavbar";
import "../AdminStyles.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const emptyForm = {
  websiteTitle: "",
  websiteDesc: "",
  livePreviewUrl: "",
  websiteDemoUrl: "",
  telegramUrl: "",
  order: 0,
  imageFile: null,
  imagePreview: "",
};

export default function AdminDemosPage() {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDemo, setEditingDemo] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/demos`);
      if (res.ok) {
        const data = await res.json();
        setDemos(data);
      }
    } catch (err) {
      console.error("Error fetching demos:", err);
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("websiteTitle", formData.websiteTitle);
      fd.append("websiteDesc", formData.websiteDesc);
      fd.append("livePreviewUrl", formData.livePreviewUrl);
      fd.append("websiteDemoUrl", formData.websiteDemoUrl);
      fd.append("telegramUrl", formData.telegramUrl);
      fd.append("order", formData.order);
      if (formData.imageFile) {
        fd.append("image", formData.imageFile);
      }

      const url = editingDemo
        ? `${apiUrl}/demos/${editingDemo._id}`
        : `${apiUrl}/demos`;
      const method = editingDemo ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      if (res.ok) {
        await fetchDemos();
        closeModal();
        showMsg(editingDemo ? "Demo updated successfully!" : "Demo added successfully!");
      } else {
        const err = await res.json();
        showMsg(err.error || "Something went wrong.", "error");
      }
    } catch (err) {
      console.error(err);
      showMsg("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this demo?")) return;
    try {
      const res = await fetch(`${apiUrl}/demos/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchDemos();
        showMsg("Demo deleted successfully!");
      }
    } catch (err) {
      showMsg("Error deleting demo.", "error");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/demos/${id}/toggle`, { method: "PATCH" });
      if (res.ok) {
        await fetchDemos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingDemo(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (demo) => {
    setEditingDemo(demo);
    setFormData({
      websiteTitle: demo.websiteTitle || "",
      websiteDesc: demo.websiteDesc || "",
      livePreviewUrl: demo.livePreviewUrl || "",
      websiteDemoUrl: demo.websiteDemoUrl || "",
      telegramUrl: demo.telegramUrl || "",
      order: demo.order || 0,
      imageFile: null,
      imagePreview: demo.image ? `${apiUrl}/uploads/${demo.image}` : "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDemo(null);
    setFormData(emptyForm);
  };

  return (
    <Protected>
      <div className="admin-dashboard">
        <AdminNavbar />
        <div className="admin-content">
          <div className="container">
            <div className="admin-table-container">
              <div className="admin-table-header">
                <h2>Manage Website Demos</h2>
                <button className="admin-add-btn" onClick={openAddModal}>
                  <i className="bi bi-plus-circle me-2"></i>Add New Demo
                </button>
              </div>

              {message.text && (
                <div
                  className={`alert ${
                    message.type === "error" ? "alert-danger" : "alert-success"
                  } mb-3`}
                >
                  {message.text}
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading demos...</p>
                </div>
              ) : demos.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-collection" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
                  <p className="mt-3 text-muted">No demos found. Add your first demo!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demos.map((demo, idx) => (
                        <tr key={demo._id}>
                          <td>{idx + 1}</td>
                          <td>
                            {demo.image && (
                              <img
                                src={`${apiUrl}/uploads/${demo.image}`}
                                alt={demo.websiteTitle}
                                style={{
                                  width: "80px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #333",
                                }}
                              />
                            )}
                          </td>
                          <td style={{ fontWeight: "600" }}>{demo.websiteTitle}</td>
                          <td>
                            <div
                              className="text-truncate"
                              style={{ maxWidth: "180px" }}
                              title={demo.websiteDesc}
                            >
                              {demo.websiteDesc || "—"}
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{demo.order}</span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleActive(demo._id)}
                              className={`badge border-0 ${
                                demo.active ? "bg-success" : "bg-danger"
                              }`}
                              style={{ cursor: "pointer", padding: "6px 10px" }}
                              title="Click to toggle"
                            >
                              {demo.active ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td>
                            <div className="admin-action-btns" style={{ gap: "6px" }}>
                              {/* View Live Preview */}
                              {demo.livePreviewUrl && (
                                <a
                                  href={demo.livePreviewUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-edit-btn"
                                  title="Live Preview"
                                  style={{ background: "#0d6efd", color: "#fff", textDecoration: "none" }}
                                >
                                  <i className="bi bi-eye"></i>
                                </a>
                              )}
                              {/* View Admin Demo */}
                              {demo.websiteDemoUrl && (
                                <a
                                  href={demo.websiteDemoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="View Admin Demo"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    background: "#6f42c1",
                                    color: "#fff",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <i className="bi bi-play-circle-fill"></i>
                                  <span>View Demo</span>
                                </a>
                              )}
                              {/* Edit */}
                              <button
                                onClick={() => openEditModal(demo)}
                                className="admin-edit-btn"
                                title="Edit Demo"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(demo._id)}
                                className="admin-delete-btn"
                                title="Delete Demo"
                              >
                                <i className="bi bi-trash3"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="admin-modal">
            <div className="admin-modal-content" style={{ maxWidth: "600px" }}>
              <div className="admin-modal-header">
                <h3>{editingDemo ? "Edit Demo" : "Add New Demo"}</h3>
                <button className="admin-modal-close" onClick={closeModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="admin-modal-body">
                  {/* Image Upload */}
                  <div className="admin-form-group">
                    <label htmlFor="demoImage">
                      Demo Image {!editingDemo && <span className="text-danger">*</span>}
                    </label>
                    <input
                      type="file"
                      id="demoImage"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!editingDemo}
                    />
                    {formData.imagePreview && (
                      <div className="mt-2">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          style={{
                            width: "100%",
                            maxHeight: "180px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #333",
                          }}
                        />
                      </div>
                    )}
                    {editingDemo && (
                      <small className="text-muted">
                        Leave empty to keep the existing image.
                      </small>
                    )}
                  </div>

                  {/* Website Title */}
                  <div className="admin-form-group">
                    <label htmlFor="websiteTitle">
                      Website Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="websiteTitle"
                      className="form-control"
                      placeholder="e.g. Classic Adult (Default)"
                      value={formData.websiteTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteTitle: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Website Description */}
                  <div className="admin-form-group">
                    <label htmlFor="websiteDesc">Website Description</label>
                    <textarea
                      id="websiteDesc"
                      className="form-control"
                      rows="3"
                      placeholder="Short description of this demo niche..."
                      value={formData.websiteDesc}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteDesc: e.target.value })
                      }
                    />
                  </div>

                  {/* Live Preview URL */}
                  <div className="admin-form-group">
                    <label htmlFor="livePreviewUrl">Live Preview URL</label>
                    <input
                      type="url"
                      id="livePreviewUrl"
                      className="form-control"
                      placeholder="https://demo.example.com/?niche=default"
                      value={formData.livePreviewUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, livePreviewUrl: e.target.value })
                      }
                    />
                  </div>

                  {/* Website Demo URL */}
                  <div className="admin-form-group">
                    <label htmlFor="websiteDemoUrl">Website Demo URL</label>
                    <input
                      type="url"
                      id="websiteDemoUrl"
                      className="form-control"
                      placeholder="https://demo.example.com/"
                      value={formData.websiteDemoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteDemoUrl: e.target.value })
                      }
                    />
                    <small className="text-muted">Ye link "Live Preview" button pe lagegi</small>
                  </div>

                  {/* Telegram URL */}
                  <div className="admin-form-group">
                    <label htmlFor="telegramUrl">
                      <i className="bi bi-telegram me-1" style={{color:'#2CA5E0'}}></i>
                      Telegram URL (Get Layout Button)
                    </label>
                    <input
                      type="url"
                      id="telegramUrl"
                      className="form-control"
                      placeholder="https://t.me/hexTheme (khali chodo = auto theme name se banega)"
                      value={formData.telegramUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, telegramUrl: e.target.value })
                      }
                    />
                    <small className="text-muted">
                      Khali rehne par automatically banta hai: <code>t.me/hexTheme?text=Hi, I want [Title] theme</code>
                    </small>
                  </div>

                  {/* Order */}
                  <div className="admin-form-group">
                    <label htmlFor="demoOrder">Display Order</label>
                    <input
                      type="number"
                      id="demoOrder"
                      className="form-control"
                      min="0"
                      placeholder="0"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: e.target.value })
                      }
                    />
                    <small className="text-muted">Lower number = shown first</small>
                  </div>
                </div>

                <div className="admin-modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Saving..."
                      : editingDemo
                      ? "Update Demo"
                      : "Add Demo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Protected>
  );
}
