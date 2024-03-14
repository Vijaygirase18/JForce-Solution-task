const { Candidate } = require('../model/candidate');
const jwt = require('jsonwebtoken');

const getCandidates = async (req, res) => {
    try {
       
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
};

const voteCandidate = async (req, res) => {
    const { selectedCandidates } = req.body;

    if (!Array.isArray(selectedCandidates) || selectedCandidates.length === 0) {
        return res.status(400).json({ error: 'Invalid selectedCandidates array' });
    }

    try {
       
        for (const candidateId of selectedCandidates) {
            await Candidate.findByIdAndUpdate(candidateId, { $inc: { voteCount: 1 } });
        }
        res.json({ message: 'Votes recorded successfully' });
    } catch (error) {
        console.error('Error voting:', error);
        res.status(500).json({ error: 'Failed to record votes' });
    }
};

module.exports={ getCandidates,voteCandidate}