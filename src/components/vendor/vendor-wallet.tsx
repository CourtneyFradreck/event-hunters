import { useState } from 'react';
import { Text, View } from 'react-native';

import { EscrowIcon } from '@/components/ui/escrow-icon';
import { ConfirmationSheet } from '@/components/ui/confirmation-sheet';
import { Button, EmptyState, SummaryRow, ui } from '@/components/ui/screen';
import { useBookingsStore } from '@/store/useBookingsStore';
import { walletTotals } from '@/utils/booking';
import { formatUSD } from '@/utils/money';
import { DashboardCard } from './dashboard-card';

export function VendorWallet() {
  const bookings = useBookingsStore(state => state.bookings);
  const payouts = useBookingsStore(state => state.payouts);
  const profile = useBookingsStore(state => state.vendorProfile);
  const withdraw = useBookingsStore(state => state.withdraw);
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const totals = walletTotals(bookings, payouts, profile.id);
  const history = payouts.filter(payout => payout.catererId === profile.id);
  const released = bookings.filter(booking => booking.catererId === profile.id && booking.status === 'completed');
  return <View style={ui.stack}>
    <DashboardCard><View style={ui.stack}>
      <Text style={ui.muted}>Available balance · USD</Text>
      <Text style={[ui.title, { fontSize: 36 }]}>{formatUSD(totals.available)}</Text>
      <Text style={ui.body}>Only deposits released after the organiser confirms delivery can be withdrawn.</Text>
      <Button label="Withdraw to EcoCash" variant="copper" disabled={totals.available <= 0}
        onPress={() => { setError(''); setMessage(''); setAmount(totals.available); }} />
    </View></DashboardCard>
    <DashboardCard><View style={ui.stack}>
      <View style={ui.row}><EscrowIcon /><Text style={ui.title}>Escrow held (pending)</Text></View>
      <Text style={ui.title}>{formatUSD(totals.escrowHeld)}</Text>
      <Text style={ui.muted}>Deposit paid or delivery marked. Funds remain locked until organiser confirmation.</Text>
      <SummaryRow label="Disputed deposits · frozen" value={formatUSD(totals.frozen)} />
      <SummaryRow label="Released deposits to date" value={formatUSD(totals.released)} />
      <SummaryRow label="Withdrawn to EcoCash" value={formatUSD(totals.withdrawn)} />
    </View></DashboardCard>
    <Text style={ui.muted}>Mock funds only. This wallet tracks deposits, not the remaining invoice balances. No money moves and no EcoCash account is contacted.</Text>
    {!!message && <Text accessibilityLiveRegion="polite" style={ui.success}>{message}</Text>}
    {!!error && <Text style={ui.error}>{error}</Text>}
    <Text style={ui.title}>Payout history</Text>
    {!history.length && <EmptyState title="No payouts yet" description="Confirmed mock withdrawals will appear here." />}
    {history.map(payout => <DashboardCard key={payout.id}>
      <SummaryRow label="Mock EcoCash withdrawal" value={formatUSD(payout.amount)} />
      <Text style={ui.muted}>{new Date(payout.at).toLocaleString()} · confirmed</Text>
    </DashboardCard>)}
    {!!released.length && <Text style={ui.title}>Released deposits</Text>}
    {released.map(booking => <DashboardCard key={booking.id}>
      <SummaryRow label={booking.organiserName} value={formatUSD(booking.quote?.deposit ?? 0)} />
      <Text style={ui.muted}>{booking.eventType} · {booking.date} · delivery confirmed</Text>
    </DashboardCard>)}
    <ConfirmationSheet visible={amount !== null} title="Mock EcoCash withdrawal"
      message={`Withdraw ${formatUSD(amount ?? 0)} from your available demo balance? This records a mock payout only.`}
      confirmLabel="Confirm mock withdrawal" onCancel={() => setAmount(null)} onConfirm={() => {
        if (amount === null) return;
        const success = withdraw(profile.id, amount);
        setAmount(null);
        if (success) { setMessage(`Mock payout of ${formatUSD(amount)} confirmed to EcoCash.`); setError(''); }
        else setError('Your available balance changed. Please review it before withdrawing.');
      }} />
  </View>;
}
