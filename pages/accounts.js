import { useEffect, useState } from 'react';
import axios from 'axios';
import './Accounts.css';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ Name: '', Phone: '', Website: '' });
  const [accountDetails, setAccountDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const fetchAccountDetails = async (accountId) => {
    try {
      const res = await fetch(`/api/accountData/${accountId}`);
      const data = await res.json();
      setAccountDetails(data);
      setShowModal(true); // 👈 show the modal
    } catch (err) {
      console.error("Failed to fetch account details", err);
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
    setAccountDetails(null);
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
              <th>Delete</th>
              <th>View</th>
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
                <td>
                  <button className="view-button" onClick={() => fetchAccountDetails(acc.Id)}>
                    View Details
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

        {showModal && accountDetails && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={closeModal}>×</button>
              <h2>Account: {accountDetails.account.Name}</h2>
              <p>Industry: {accountDetails.account.Industry}</p>
              <p>Phone: {accountDetails.account.Phone}</p>

              <h3>Contacts</h3>
              <ul>
                {accountDetails.contacts.map(contact => (
                  <li key={contact.Id}>{contact.FirstName} {contact.LastName} - {contact.Email}</li>
                ))}
              </ul>

              <h3>Opportunities</h3>
              <ul>
                {accountDetails.opportunities.map(oppty => (
                  <li key={oppty.Id}>{oppty.Name} - {oppty.StageName} - ${oppty.Amount}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
