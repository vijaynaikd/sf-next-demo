import { useEffect, useState } from 'react';
import axios from 'axios';
import './Accounts.css';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ Name: '', Phone: '', Website: '' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await axios.get('/api/accounts');
    setAccounts(res.data);
  };

  const handleCreate = async () => {
    await axios.post('/api/accounts', form);
    setForm({ Name: '', Phone: '', Website: '' });
    fetchAccounts();
  };

  const handleUpdate = async (id, updated) => {
    await axios.patch(`/api/accounts/${id}`, updated);
    fetchAccounts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/accounts/${id}`);
    fetchAccounts();
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Salesforce Accounts</h2>

        <div className="form-grid">
          <input
            className="input"
            placeholder="Name"
            value={form.Name}
            onChange={e => setForm({ ...form, Name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone"
            value={form.Phone}
            onChange={e => setForm({ ...form, Phone: e.target.value })}
          />
          <input
            className="input"
            placeholder="Website"
            value={form.Website}
            onChange={e => setForm({ ...form, Website: e.target.value })}
          />
        </div>
        <div className="button-container">
          <button className="create-button" onClick={handleCreate}>
            Create Account
          </button>
        </div>

        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.Id}>
                <td>
                  <input
                    className="table-input"
                    defaultValue={acc.Name}
                    onBlur={(e) => handleUpdate(acc.Id, { Name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="table-input"
                    defaultValue={acc.Phone}
                    onBlur={(e) => handleUpdate(acc.Id, { Phone: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="table-input"
                    defaultValue={acc.Website}
                    onBlur={(e) => handleUpdate(acc.Id, { Website: e.target.value })}
                  />
                </td>
                <td className="center">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(acc.Id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan="4" className="no-data">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
