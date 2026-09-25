import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/user');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to connect to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    try {
      const res = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });
      if (res.ok) {
        setNewName('');
        setNewEmail('');
        fetchUsers();
      }
    } catch (err) {
      alert('Error creating user: ' + err.message);
    }
  };

  const handleStartEdit = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSaveUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, email: editEmail }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchUsers();
      }
    } catch (err) {
      alert('Error updating user: ' + err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm(`Are you sure you want to delete user #${id}?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  const handleMasterClear = async () => {
    if (!window.confirm('MASTER COMMAND: Are you sure you want to CLEAR ALL user entries?')) return;

    try {
      const res = await fetch('http://localhost:3000/clear', {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Error clearing users: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header bar */}
      <div style={styles.topHeader}>
        <div>
          <h2 style={styles.pageTitle}>User Management Dashboard</h2>
          <p style={styles.pageSub}>Manage backend users with CRUD operations and master controls</p>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.refreshBtn} onClick={fetchUsers}>
            Refresh
          </button>
          <button style={styles.masterClearBtn} onClick={handleMasterClear}>
            CLEAR ALL (MASTER)
          </button>
        </div>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Add User Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}><span style={{ color: '#0cbb52' }}>+</span> Add New User</h3>
        <form onSubmit={handleCreateUser} style={styles.addForm}>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.addBtn}>
            Add User
          </button>
        </form>
      </div>

      {/* Users Data Table */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Registered Users ({users.length})</h3>
        
        {loading ? (
          <div style={styles.loading}>Loading user records...</div>
        ) : users.length === 0 ? (
          <div style={styles.emptyState}>No user records found. Use the form above to add users.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>#{u.id}</td>
                  <td style={styles.td}>
                    {editingId === u.id ? (
                      <input
                        style={styles.tableInput}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingId === u.id ? (
                      <input
                        style={styles.tableInput}
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    {editingId === u.id ? (
                      <>
                        <button style={styles.saveBtn} onClick={() => handleSaveUpdate(u.id)}>
                          Save
                        </button>
                        <button style={styles.cancelBtn} onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button style={styles.updateBtn} onClick={() => handleStartEdit(u)}>
                          Update
                        </button>
                        <button style={styles.deleteBtn} onClick={() => handleDeleteUser(u.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#1e1e1e',
    minHeight: 'calc(100vh - 50px)',
    boxSizing: 'border-box',
    color: '#fff',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  topHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #333',
  },
  pageTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: '"Fira Code", "JetBrains Mono", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#61afef',
    letterSpacing: '0.5px',
  },
  pageSub: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#888',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  refreshBtn: {
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  masterClearBtn: {
    backgroundColor: '#eb2013',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(235, 32, 19, 0.4)',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #ef4444',
    color: '#f87171',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#252526',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  cardTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    color: '#ddd',
  },
  addForm: {
    display: 'flex',
    gap: '12px',
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '8px 12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  addBtn: {
    backgroundColor: '#0cbb52',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '30px',
    color: '#888',
  },
  emptyState: {
    textAlign: 'center',
    padding: '30px',
    color: '#666',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '12px',
    color: '#888',
    borderBottom: '1px solid #333',
    textTransform: 'uppercase',
  },
  tr: {
    borderBottom: '1px solid #2d2d2d',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#ddd',
  },
  tableInput: {
    backgroundColor: '#1e1e1e',
    border: '1px solid #097bed',
    borderRadius: '3px',
    color: '#fff',
    padding: '4px 8px',
    fontSize: '13px',
    width: '90%',
  },
  updateBtn: {
    backgroundColor: '#097bed',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '8px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#eb2013',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  saveBtn: {
    backgroundColor: '#0cbb52',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '8px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};
