import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Package, LifeBuoy, LogOut, Loader2, Save, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import GoldButton from './GoldButton';
import { toast } from 'sonner';

const AccountModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { customer, logout, updateProfile, getOrders } = useAuth();
  const [tab, setTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '' });

  useEffect(() => {
    if (isOpen && customer) {
      setForm({ first_name: customer.first_name || '', last_name: customer.last_name || '' });
      if (tab === 'orders') loadOrders();
    }
  }, [isOpen, customer, tab]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch { setOrders([]); }
    finally { setLoadingOrders(false); }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({ first_name: form.first_name, last_name: form.last_name });
      toast.success(t('account.saved', 'Profile updated!'));
    } catch { toast.error(t('account.saveError', 'Failed to update profile.')); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    await logout();
    toast.success(t('account.loggedOut', 'Logged out successfully.'));
    onClose();
  };

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
    'on-hold': 'bg-orange-500/20 text-orange-400',
  };

  const tabs = [
    { id: 'profile', icon: User, label: t('account.profile', 'Profile') },
    { id: 'orders', icon: Package, label: t('account.orders', 'Orders') },
    { id: 'support', icon: LifeBuoy, label: t('account.support', 'Support') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed top-[5vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh]
              bg-forest-dark border border-gold/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            data-testid="account-modal">
            {/* Header */}
            <div className="p-5 border-b border-gold/20 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-cinzel font-bold text-gold" data-testid="account-title">
                {t('account.myAccount', 'My Account')}
              </h2>
              <button onClick={onClose} className="text-cream/60 hover:text-gold"><X className="w-6 h-6" /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gold/10 shrink-0">
              {tabs.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-montserrat transition-all
                    ${tab === id ? 'text-gold border-b-2 border-gold' : 'text-cream/50 hover:text-cream/80'}`}
                  data-testid={`account-tab-${id}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Profile Tab */}
              {tab === 'profile' && (
                <div className="space-y-4" data-testid="account-profile">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream font-cinzel font-bold">{customer?.first_name} {customer?.last_name}</p>
                      <p className="text-cream/50 font-montserrat text-sm">{customer?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('checkout.firstName', 'First Name')}</label>
                      <input data-testid="account-first-name" value={form.first_name}
                        onChange={(e) => setForm(prev => ({ ...prev, first_name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                          focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-cream/70 font-montserrat text-xs mb-1.5">{t('checkout.lastName', 'Last Name')}</label>
                      <input data-testid="account-last-name" value={form.last_name}
                        onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-forest/60 border border-gold/20 rounded-lg text-cream font-montserrat text-sm
                          focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                  <GoldButton onClick={handleSaveProfile} className="w-full" dataTestId="account-save" disabled={saving}>
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <span className="flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {t('account.save', 'Save')}</span>
                    )}
                  </GoldButton>
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-red-400 hover:text-red-300
                      font-montserrat text-sm border border-red-400/20 hover:border-red-400/40 rounded-lg transition-colors"
                    data-testid="account-logout">
                    <LogOut className="w-4 h-4" /> {t('account.logout', 'Log Out')}
                  </button>
                </div>
              )}

              {/* Orders Tab */}
              {tab === 'orders' && (
                <div data-testid="account-orders">
                  {loadingOrders ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-cream/20 mx-auto mb-3" />
                      <p className="text-cream/50 font-montserrat text-sm">{t('account.noOrders', 'No orders yet.')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-forest/40 border border-gold/15 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-cream font-cinzel font-bold text-sm">#{order.id}</p>
                              <p className="text-cream/40 font-montserrat text-xs">{new Date(order.date_created).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-montserrat font-bold uppercase
                                ${statusColors[order.status] || 'bg-gray-500/20 text-gray-400'}`}>
                                {order.status}
                              </span>
                              <span className="text-gold font-cinzel font-bold">&euro;{order.total}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {order.line_items?.map((item, i) => (
                              <p key={i} className="text-cream/60 font-montserrat text-xs">
                                {item.name} x{item.quantity} — &euro;{item.total}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Support Tab */}
              {tab === 'support' && (
                <div className="space-y-4" data-testid="account-support">
                  <p className="text-cream/70 font-montserrat text-sm mb-4">
                    {t('account.supportDesc', 'Need help with your terrarium? Choose an option below.')}
                  </p>
                  {[
                    { title: t('account.careGuide', 'Care Guide'), desc: t('account.careGuideDesc', 'Learn how to keep your florarium healthy and beautiful'), action: 'care' },
                    { title: t('account.reportIssue', 'Report an Issue'), desc: t('account.reportIssueDesc', 'Something wrong with your order? Let us know'), action: 'issue' },
                    { title: t('account.contactUs', 'Contact Us'), desc: t('account.contactUsDesc', 'Get in touch with our team directly'), action: 'contact' },
                  ].map((item) => (
                    <button key={item.action}
                      onClick={() => {
                        if (item.action === 'contact') {
                          document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' });
                          onClose();
                        } else if (item.action === 'care') {
                          document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                          onClose();
                        } else {
                          toast.info(t('account.comingSoon', 'Coming soon!'));
                        }
                      }}
                      className="w-full flex items-center justify-between p-4 bg-forest/40 border border-gold/15 rounded-xl
                        hover:border-gold/30 transition-all text-left"
                      data-testid={`support-${item.action}`}>
                      <div>
                        <p className="text-cream font-cinzel font-bold text-sm">{item.title}</p>
                        <p className="text-cream/50 font-montserrat text-xs">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gold/50" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountModal;
